/**
 * Heritage Pulse - Itinerary Controller
 * ======================================
 * AI-powered itinerary generation controller.
 */

const {
    openStreetMapService,
    wikidataService,
    wikipediaService,
    osrmService,
    openRouterService,
    heritageService
} = require('../services');
const db = require('../config/database');
const logger = require('../utils/logger');
const { ApiError } = require('../middleware/errorHandler');
const { createItinerary } = require('../models/itinerary.model');
const { generateId } = require('../utils/helpers');

/**
 * Generate an optimized itinerary using AI
 */
const generateItinerary = async (req, res, next) => {
    try {
        const { location, days, preferences, radius = 50 } = req.body;

        logger.info(`Generating ${days}-day itinerary for ${location}`);

        // ==========================================
        // Step 1: Discover Heritage Sites
        // ==========================================
        const geocoded = await openStreetMapService.geocodeLocation(location);
        if (!geocoded) {
            throw ApiError.notFound(`Location "${location}" not found`);
        }
        const { lat, lng } = geocoded;

        // Fetch sites (Wikidata + OSM)
        // We fetch more candidates than needed to give AI choices
        const candidateLimit = Math.min(days * 10, 50); // e.g. 3 days -> 30 sites

        const [wikidataSites, osmSites] = await Promise.all([
            wikidataService.searchHeritageSites({ location: { lat, lng }, radius, limit: candidateLimit }),
            openStreetMapService.getNearbyMonuments(lat, lng, radius * 1000)
        ]);

        // Deduplicate sites
        const allSites = [...wikidataSites, ...osmSites];
        const uniqueSites = [];
        const TOLERANCE = 0.001;

        for (const site of allSites) {
            const isDuplicate = uniqueSites.some(existing => {
                const dLat = Math.abs(existing.location.lat - site.location.lat);
                const dLng = Math.abs(existing.location.lng - site.location.lng);
                return dLat < TOLERANCE && dLng < TOLERANCE;
            });

            if (!isDuplicate) {
                uniqueSites.push(site);
            }
        }

        // Filter mainly named sites and limit for Context
        // We want enough for AI to choose, but not explode token context
        // Enrich top candidates with Wikipedia
        const topCandidates = uniqueSites
            .filter(s => s.name && s.name !== 'Unknown Site' && !s.name.toLowerCase().includes('hotel'))
            .slice(0, Math.min(days * 8, 40));

        const enrichedSites = await Promise.all(
            topCandidates.map(async (site) => {
                try {
                    // Quick enrichment - optimize by checking cache or skip if too slow? 
                    // For integration, we do full enrichment but limit concurrency if needed.

                    let lookupTitle = site.name;
                    if (site.wikipediaUrl) {
                        const match = site.wikipediaUrl.match(/\/wiki\/(.+)$/);
                        if (match) lookupTitle = decodeURIComponent(match[1]);
                    }

                    const context = await wikipediaService.getHistoricalContext(lookupTitle);
                    return {
                        id: site.id || site.wikidataId || site.osmId || generateId('site'),
                        name: site.name,
                        category: site.category,
                        coordinates: site.location,
                        summary: context.found ? context.summary.substring(0, 300) + '...' : 'Available on request',
                        visiting_duration_estimate: '60-120 min', // Placeholder logic
                    };
                } catch (err) {
                    return {
                        id: site.id || site.wikidataId || site.osmId || generateId('site'),
                        name: site.name,
                        category: site.category,
                        coordinates: site.location,
                        summary: 'Summary unavailable',
                        visiting_duration_estimate: '60 min',
                    };
                }
            })
        );

        // ==========================================
        // Step 2 & 3: Build Context & Travel Matrix
        // ==========================================
        // Note: Full N*N matrix is expensive. We will provide coordinates to AI
        // and let its spatial reasoning handle clustering, or provide simplified distances.
        // DeepSeek R1 is smart enough to use coordinates for proximity.
        // We will ALSO calculate a reference center point distance for each site.

        const context = {
            task: "Generate optimized heritage itinerary",
            location: {
                name: geocoded.displayName,
                coordinates: { lat, lng }
            },
            duration_days: days,
            preferences,
            constraints: {
                daily_hours: 9, // Assumed 9am-6pm if not parsed
                pace: preferences?.pace || 'moderate',
            },
            heritage_sites: enrichedSites,
            rules: [
                "Use ONLY the provided heritage sites",
                "Optimize daily routes to minimize travel time (group nearby sites)",
                "Balance site count per day based on pace",
                "Include historical context explanations in 'why_visit'",
                "Output valid JSON matching the requested schema"
            ]
        };

        // ==========================================
        // Step 4: AI Reasoning Call
        // ==========================================
        logger.info('Sending context to AI...');
        const aiItinerary = await openRouterService.generateItinerary(context);

        // ==========================================
        // Step 5: Validate & Enrich
        // ==========================================
        // Check for hallucinations (site IDs must exist)
        const validSiteIds = new Set(enrichedSites.map(s => s.id));

        // Process schedule to ensure valid sites and add details back
        const processedSchedule = aiItinerary.days.map(day => {
            const validActivities = day.activities.filter(activity => {
                // AI might use site_id or just name. We try to match ID first.
                // If deepseek returns site_id in activity (as requested in prompt), we check it.
                // My prompt in service asked for "location" name, but let's see. 
                // The service prompt asked for: { "activities": [ { "location": "Name", ... } ] }
                // We need to map back to our enriched sites.

                // Find site by name (fuzzy match) or ID if present
                const site = enrichedSites.find(s =>
                    s.name === activity.location ||
                    (activity.site_id && s.id === activity.site_id)
                );

                if (site) {
                    activity.site_details = site; // Attach full details
                    return true;
                }
                return false; // Skip hallucinated/unmatched sites
            });

            return {
                ...day,
                sites: validActivities
            };
        });

        // Calculate totals
        const totalSites = processedSchedule.reduce((sum, day) => sum + day.sites.length, 0);

        // Save to Database
        let dbItineraryId = generateId('itin'); // Fallback if DB insert fails (shouldn't happen with catch)
        try {
            const insertQuery = `
        INSERT INTO itineraries (location_name, days, preferences, schedule, summary)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
            const result = await db.query(insertQuery, [
                geocoded.displayName,
                days,
                JSON.stringify(preferences),
                JSON.stringify(processedSchedule), // Store clean schedule
                aiItinerary.summary || `A ${days}-day trip to ${location}`
            ]);

            dbItineraryId = result.rows[0].id;
            logger.info(`Itinerary saved to database with ID: ${dbItineraryId}`);
        } catch (dbError) {
            logger.error('Failed to save itinerary to database:', dbError);
            // We continue to return the response even if DB save fails, just log it.
        }

        const responseData = {
            itinerary_id: dbItineraryId,
            location: geocoded.displayName,
            days,
            schedule: processedSchedule,
            summary: aiItinerary.summary || `A ${days}-day trip to ${location}`,
            total_sites: totalSites,
            preferences
        };

        res.json({
            success: true,
            data: responseData
        });

    } catch (error) {
        logger.error('Error generating itinerary:', error);
        next(error);
    }
};

module.exports = {
    generateItinerary,
};
