/**
 * Heritage Pulse - Heritage Controller
 * =====================================
 * Business logic for heritage site operations.
 */

const heritageService = require('../services/heritage.service');
const { openStreetMapService, wikidataService, wikipediaService } = require('../services');
const logger = require('../utils/logger');
const { ApiError } = require('../middleware/errorHandler');

/**
 * Get list of heritage sites with pagination
 */
const getHeritageSites = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, q: query } = req.query;

        const result = await heritageService.getHeritageSites({
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            query,
        });

        res.json({
            success: true,
            data: result.sites,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages,
            },
        });
    } catch (error) {
        logger.error('Error fetching heritage sites:', error);
        next(error);
    }
};

/**
 * Get a single heritage site by ID
 */
const getHeritageSiteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const site = await heritageService.getHeritageSiteById(id);

        if (!site) {
            throw ApiError.notFound(`Heritage site with ID ${id} not found`);
        }

        res.json({
            success: true,
            data: site,
        });
    } catch (error) {
        logger.error(`Error fetching heritage site ${req.params.id}:`, error);
        next(error);
    }
};

/**
 * Search heritage sites
 */
const searchHeritageSites = async (req, res, next) => {
    try {
        const { q: query, page = 1, limit = 20 } = req.query;

        if (!query) {
            throw ApiError.badRequest('Search query is required');
        }

        const result = await heritageService.searchHeritageSites({
            query,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        });

        res.json({
            success: true,
            data: result.sites,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages,
            },
        });
    } catch (error) {
        logger.error('Error searching heritage sites:', error);
        next(error);
    }
};

/**
 * Get nearby heritage sites based on location
 */
const getNearbyHeritageSites = async (req, res, next) => {
    try {
        const { lat, lng, radius = 50 } = req.query;

        if (!lat || !lng) {
            throw ApiError.badRequest('Latitude and longitude are required');
        }

        const result = await heritageService.getNearbyHeritageSites({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            radius: parseInt(radius, 10),
        });

        res.json({
            success: true,
            data: result.sites,
            location: {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
                radius: parseInt(radius, 10),
            },
        });
    } catch (error) {
        logger.error('Error fetching nearby heritage sites:', error);
        next(error);
    }
};

/**
 * Discover heritage sites (Aggregation Pipeline)
 */
const discoverHeritage = async (req, res, next) => {
    try {
        const { location: locationName, radius = 50, categories = [] } = req.body;

        if (!locationName) {
            throw ApiError.badRequest('Location name is required');
        }

        // 1. Geocode Location
        logger.info(`Discovering heritage for: ${locationName}`);
        const geocoded = await openStreetMapService.geocodeLocation(locationName);

        if (!geocoded) {
            throw ApiError.notFound(`Location "${locationName}" not found`);
        }

        const { lat, lng } = geocoded;
        logger.info(`Geocoded to: ${lat}, ${lng}`);

        // 2. Fetch Heritage Sites (Parallel)
        const [wikidataSites, osmSites] = await Promise.all([
            wikidataService.searchHeritageSites({ location: { lat, lng }, radius, limit: 50 }),
            openStreetMapService.getNearbyMonuments(lat, lng, radius * 1000) // OSM takes meters
        ]);

        logger.info(`Fetched ${wikidataSites.length} Wikidata sites and ${osmSites.length} OSM sites`);

        // 3. Merge & Deduplicate
        const allSites = [...wikidataSites, ...osmSites];
        const uniqueSites = [];
        const TOLERANCE = 0.001; // ~111 meters

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

        // 4. Enrich with Historical Context (for top 20 to avoid rate limits/timeouts)
        // Prioritize named sites
        const sitesToEnrich = uniqueSites
            .filter(s => s.name && s.name !== 'Unknown Site')
            .slice(0, 20);

        const enrichedSites = await Promise.all(
            sitesToEnrich.map(async (site) => {
                try {
                    // If we have a wikipedia URL from wikidata, use that title
                    let lookupTitle = site.name;
                    if (site.wikipediaUrl) {
                        const match = site.wikipediaUrl.match(/\/wiki\/(.+)$/);
                        if (match) lookupTitle = decodeURIComponent(match[1]);
                    }

                    const context = await wikipediaService.getHistoricalContext(lookupTitle);
                    return {
                        ...site,
                        summary: context.found ? context.summary : 'Summary unavailable',
                        images: context.imageUrl ? [context.imageUrl] : (site.imageUrl ? [site.imageUrl] : []),
                        verified: context.found,
                    };
                } catch (err) {
                    return { ...site, summary: 'Summary unavailable' };
                }
            })
        );

        // 5. Response
        res.json({
            success: true,
            data: {
                location: {
                    name: geocoded.displayName,
                    coordinates: { lat, lng },
                },
                sites: enrichedSites,
                count: enrichedSites.length,
                radius_km: radius,
            },
        });

    } catch (error) {
        logger.error('Error in heritage discovery:', error);
        next(error);
    }
};

module.exports = {
    getHeritageSites,
    getHeritageSiteById,
    searchHeritageSites,
    getNearbyHeritageSites,
    discoverHeritage,
};
