/**
 * Heritage Pulse - Chat Service
 * ==============================
 * Service layer for chat-related operations.
 */

const heritageService = require('./heritage.service');
const logger = require('../utils/logger');

/**
 * Extract heritage-related context from user message
 */
const getHeritageContext = async (message) => {
    try {
        // Simple keyword extraction (can be enhanced with NLP)
        const keywords = extractKeywords(message);

        if (keywords.length === 0) {
            return '';
        }

        // Search for relevant heritage sites
        const searchResult = await heritageService.searchHeritageSites({
            query: keywords.join(' '),
            limit: 3,
        });

        if (searchResult.sites.length === 0) {
            return '';
        }

        // Build context string from relevant sites
        const contextParts = searchResult.sites.map(site =>
            `${site.name} (${site.location.country}): ${site.description} Era: ${site.era}. Significance: ${site.significance}.`
        );

        return `Relevant heritage sites found:\n${contextParts.join('\n')}`;
    } catch (error) {
        logger.error('Error getting heritage context:', error);
        return '';
    }
};

/**
 * Extract relevant keywords from message
 */
const extractKeywords = (message) => {
    // Common heritage-related terms to look for
    const heritageTerms = [
        'temple', 'monument', 'palace', 'castle', 'fort', 'ruins',
        'heritage', 'historical', 'ancient', 'cultural', 'unesco',
        'pyramid', 'tomb', 'mosque', 'church', 'cathedral', 'shrine',
        'museum', 'artifact', 'archaeology', 'tradition', 'festival',
    ];

    // Country and city names (expand as needed)
    const locationTerms = [
        'india', 'china', 'egypt', 'italy', 'france', 'greece', 'peru',
        'japan', 'mexico', 'turkey', 'spain', 'uk', 'england',
        'agra', 'rome', 'paris', 'athens', 'cairo', 'beijing', 'kyoto',
        'taj mahal', 'colosseum', 'machu picchu', 'pyramids', 'great wall',
    ];

    const words = message.toLowerCase().split(/\s+/);
    const allTerms = [...heritageTerms, ...locationTerms];

    const foundKeywords = words.filter(word =>
        allTerms.some(term => word.includes(term) || term.includes(word))
    );

    // Also check for multi-word terms
    const lowerMessage = message.toLowerCase();
    const multiWordMatches = allTerms.filter(term =>
        term.includes(' ') && lowerMessage.includes(term)
    );

    return [...new Set([...foundKeywords, ...multiWordMatches])];
};

/**
 * Format AI response for display
 */
const formatResponse = (content) => {
    // Clean up the response if needed
    return content.trim();
};

module.exports = {
    getHeritageContext,
    extractKeywords,
    formatResponse,
};
