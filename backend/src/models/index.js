/**
 * Heritage Pulse - Models Index
 * ==============================
 * Centralized model exports.
 */

const heritageModel = require('./heritage.model');
const chatModel = require('./chat.model');
const itineraryModel = require('./itinerary.model');

module.exports = {
    ...heritageModel,
    ...chatModel,
    ...itineraryModel,
};
