/**
 * Heritage Pulse - Controllers Index
 * ===================================
 * Centralized controller exports.
 */

const heritageController = require('./heritage.controller');
const chatController = require('./chat.controller');
const itineraryController = require('./itinerary.controller');

module.exports = {
    heritageController,
    chatController,
    itineraryController,
};
