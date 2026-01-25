/**
 * Heritage Pulse - Route Optimizer
 * =================================
 * Heuristic-based route optimization for daily itineraries.
 */

const { formatDuration } = require('./helpers');

/**
 * Get estimated visit duration based on site category
 * @param {string} category 
 * @returns {number} Duration in minutes
 */
const getVisitDuration = (category = '') => {
    const cat = category.toLowerCase();

    if (cat.includes('unesco') || cat.includes('palace') || cat.includes('fort')) return 90;
    if (cat.includes('museum') || cat.includes('gallery')) return 90;
    if (cat.includes('temple') || cat.includes('church') || cat.includes('mosque')) return 60;
    if (cat.includes('park') || cat.includes('nature')) return 60;

    return 60; // Default
};

/**
 * Calculate Haversine distance between two points
 * @returns {number} Distance in KM
 */
const calculateDistance = (p1, p2) => {
    const R = 6371; // Earth radius km
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLon = (p2.lng - p1.lng) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * Calculate travel time (heuristic: 30km/h average city speed)
 * @returns {number} Duration in minutes
 */
const estimateTravelTime = (distanceKm) => {
    const avgSpeedKmH = 30;
    const hours = distanceKm / avgSpeedKmH;
    return Math.ceil(hours * 60) + 5; // Add 5 min buffer
};

/**
 * Greedy Route Optimizer
 * Assumes 'startCoords' is the hotel or city center
 */
const optimizeRoute = (sites, dailyConstraints = {}) => {
    const {
        startTime = '09:00',
        endTime = '18:00',
        startCoords // { lat, lng }
    } = dailyConstraints;

    // Clone sites to avoid mutation
    let unvisited = [...sites];
    const schedule = [];

    // Parse time
    const parseTime = (t) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const startMinutes = parseTime(startTime);
    const endMinutes = parseTime(endTime);
    const maxDailyMinutes = endMinutes - startMinutes;

    let dayCount = 1;

    // While we have unvisited sites
    while (unvisited.length > 0) {
        let currentDayOps = [];
        let currentTime = startMinutes;
        // Start from city center/hotel each day usually
        let currentLocation = startCoords || unvisited[0].coordinates || { lat: 0, lng: 0 };

        // Find nearest neighbor loop for one day
        let dailyFeasible = true;

        while (dailyFeasible && unvisited.length > 0) {
            // Find closest site
            let nearest = null;
            let minDist = Infinity;
            let nearestIndex = -1;

            unvisited.forEach((site, index) => {
                const d = calculateDistance(currentLocation, site.coordinates || site.location);
                if (d < minDist) {
                    minDist = d;
                    nearest = site;
                    nearestIndex = index;
                }
            });

            if (!nearest) break; // Should not happen

            // Check feasibility
            const travelTime = estimateTravelTime(minDist);
            const visitTime = getVisitDuration(nearest.category);

            // If we add this site, does it fit?
            // time used so far (relative to 0) + travel + visit <= max
            // Actually simpler: if (currentTime + travel + visit <= endMinutes)

            if (currentTime + travelTime + visitTime <= endMinutes) {
                // Add to day
                currentDayOps.push({
                    site: nearest,
                    arrival_time: formatTime(currentTime + travelTime),
                    duration_minutes: visitTime,
                    travel_time_minutes: travelTime,
                    distance_km: parseFloat(minDist.toFixed(2)),
                });

                // Update state
                currentTime += travelTime + visitTime;
                currentLocation = nearest.coordinates || nearest.location;

                // Remove from unvisited
                unvisited.splice(nearestIndex, 1);
            } else {
                // Day full
                dailyFeasible = false;
            }
        }

        // Push the day's schedule if it has anything, otherwise force 1 site to ensure progress or end
        if (currentDayOps.length > 0) {
            schedule.push({
                day: dayCount,
                sites: currentDayOps,
            });
            dayCount++;
        } else {
            // Corner case: A single site fits nowhere (too far or duration > day)? 
            // Force assign to next day or warn. 
            // For now, if we can't fit next item in a fresh day, we just skip it to avoid infinite loop
            // But practically, new day resets currentTime, so it should fit unless site > daily hours.
            // If unvisited still has items but currentDayOps is empty, it means even the *closest* item doesn't fit in a full day.
            // We force push it or break.
            const forceSite = unvisited.shift();
            schedule.push({
                day: dayCount,
                sites: [{
                    site: forceSite,
                    arrival_time: startTime,
                    duration_minutes: getVisitDuration(forceSite.category), // Might exceed
                    forced: true
                }]
            });
            dayCount++;
        }
    }

    return schedule;
};

/**
 * Format minutes from midnight to HH:MM
 */
const formatTime = (totalMinutes) => {
    const h = Math.floor(totalMinutes / 60);
    const m = Math.round(totalMinutes % 60); // Use round to handle floats
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * Calculate statistics for a single day
 */
const calculateDayStats = (daySchedule) => {
    let totalDist = 0;
    let totalTravel = 0;
    let totalVisit = 0;

    daySchedule.forEach(item => {
        totalDist += item.distance_km || 0;
        totalTravel += item.travel_time_minutes || 0;
        totalVisit += item.duration_minutes || 0;
    });

    return {
        total_distance_km: parseFloat(totalDist.toFixed(2)),
        total_travel_time_min: totalTravel,
        total_visit_time_min: totalVisit,
        sites_count: daySchedule.length,
    };
};

module.exports = {
    optimizeRoute,
    calculateDayStats,
    getVisitDuration,
};
