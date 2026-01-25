/**
 * Heritage Pulse - Wikipedia Service
 * ==================================
 * Service for fetching historical context and summaries from Wikipedia.
 */

const axios = require('axios');
const logger = require('../utils/logger');
const { retry } = require('../utils/helpers');

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

class WikipediaService {
    /**
     * Get historical context and summary for a topic
     * @param {string} title - Wikipedia article title
     * @param {string} lang - Language code (default: 'en')
     * @returns {Promise<Object>} Summary object with text and metadata
     */
    async getHistoricalContext(title, lang = 'en') {
        if (!title) {
            throw new Error('Wikipedia article title is required');
        }

        // Adjust API URL for language if needed
        const apiUrl = lang === 'en'
            ? WIKIPEDIA_API_URL
            : `https://${lang}.wikipedia.org/w/api.php`;

        try {
            const response = await retry(async () => {
                return await axios.get(apiUrl, {
                    params: {
                        action: 'query',
                        format: 'json',
                        prop: 'extracts|pageimages|info',
                        titles: title,
                        exintro: true,      // Return only the introduction
                        explaintext: true,  // Return plain text instead of HTML
                        exchars: 1000,       // Limit characters (increased to 1000 for better context)
                        pithumbsize: 500,   // Image thumbnail size
                        inprop: 'url',      // Get full URL
                        redirects: 1,       // Follow redirects
                    },
                    headers: {
                        'User-Agent': 'HeritagePulse/1.0 (mailto:admin@heritagepulse.app)',
                    },
                    timeout: 15000,
                });
            }, 3, 1000);

            return this._processResult(response.data);
        } catch (error) {
            logger.error(`Wikipedia API error for title "${title}":`, error.message);

            // Return a partial object indicating failure but allowing app to continue
            return {
                title: title,
                summary: 'Historical context currently unavailable.',
                source: 'wikipedia',
                error: true,
            };
        }
    }

    /**
     * Process Wikipedia API response
     * @private
     */
    _processResult(data) {
        if (!data || !data.query || !data.query.pages) {
            return null;
        }

        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];

        if (pageId === '-1') {
            logger.warn(`Wikipedia page not found: ${page.title}`);
            return {
                title: page.title,
                found: false,
                summary: 'No historical information found for this specific site.',
            };
        }

        return {
            title: page.title,
            summary: page.extract || 'No summary available.',
            url: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
            imageUrl: page.thumbnail ? page.thumbnail.source : null,
            pageId: page.pageid,
            lastModified: page.touched,
            source: 'wikipedia',
            found: true,
        };
    }
}

module.exports = new WikipediaService();
