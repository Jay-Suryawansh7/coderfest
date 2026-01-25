/**
 * Heritage Pulse - Itinerary Model
 * =================================
 * Data definitions and typing for Itineraries.
 */

/**
 * @typedef {Object} ItineraryPreferences
 * @property {string[]} [categories] - Preferred categories
 * @property {'relaxed'|'moderate'|'packed'} pace - Travel pace
 * @property {string} startTime - Start time (HH:MM)
 * @property {string} endTime - End time (HH:MM)
 */

/**
 * @typedef {Object} TravelInfo
 * @property {number} distance_km - Distance to next site
 * @property {number} duration_min - Travel duration
 */

/**
 * @typedef {Object} ScheduledSite
 * @property {string} site_id - ID of the heritage site
 * @property {string} name - Name of the site
 * @property {string} arrival_time - Planned arrival (HH:MM)
 * @property {number} duration_minutes - Time spent at site
 * @property {{lat: number, lng: number}} coordinates - Location
 * @property {string} [historical_context] - Brief context
 * @property {TravelInfo} [travel_to_next] - Travel details to next stop
 */

/**
 * @typedef {Object} DailyStats
 * @property {number} total_distance_km
 * @property {number} total_travel_time_hours
 * @property {number} sites_count
 */

/**
 * @typedef {Object} ItineraryDay
 * @property {number} day - Day number (1-indexed)
 * @property {string} [date] - ISO date string
 * @property {string} [theme] - Theme for the day
 * @property {ScheduledSite[]} sites - List of sites
 * @property {DailyStats} daily_stats - Daily statistics
 */

/**
 * @typedef {Object} Itinerary
 * @property {string} id - Unique ID
 * @property {string} location - Target location
 * @property {number} days - Number of days
 * @property {string} created_at - ISO timestamp
 * @property {ItineraryDay[]} schedule - Daily schedules
 * @property {string} summary - Itinerary summary
 * @property {string} [optimization_notes] - Notes on routing/logic
 */

const { generateId } = require('../utils/helpers');

/**
 * Create a new Itinerary object with defaults
 * @param {string} location 
 * @param {number} days 
 * @returns {Itinerary}
 */
const createItinerary = (location, days) => {
    return {
        id: generateId('itin'),
        location,
        days,
        created_at: new Date().toISOString(),
        schedule: [],
        summary: '',
        optimization_notes: '',
    };
};

module.exports = {
    createItinerary,
};
