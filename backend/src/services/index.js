/**
 * Heritage Pulse - Services Index
 * ================================
 * Centralized service exports.
 */

const openRouterService = require('./openrouter.service');
const heritageService = require('./heritage.service');
const chatService = require('./chat.service');
const wikidataService = require('./WikidataService');
const wikipediaService = require('./WikipediaService');
const openStreetMapService = require('./OpenStreetMapService');
const osrmService = require('./OSRMService');

module.exports = {
    openRouterService,
    heritageService,
    chatService,
    wikidataService,
    wikipediaService,
    openStreetMapService,
    osrmService,
};
