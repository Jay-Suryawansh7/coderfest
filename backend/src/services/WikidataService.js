/**
 * Heritage Pulse - Wikidata Service
 * ==================================
 * Service for querying cultural heritage data from Wikidata via SPARQL.
 */

const axios = require('axios');
const logger = require('../utils/logger');
const { retry } = require('../utils/helpers');

const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql';

class WikidataService {
    /**
     * Search for heritage sites using SPARQL
     * @param {Object} options - Search options
     * @param {Object} options.location - Location object { lat, lng }
     * @param {number} options.radius - Search radius in km
     * @param {number} options.limit - Max number of results
     * @returns {Promise<Array>} List of heritage sites
     */
    async searchHeritageSites({ location, radius = 10, limit = 50 }) {
        if (!location || !location.lat || !location.lng) {
            throw new Error('Valid location (lat, lng) is required');
        }

        // SPARQL query to find heritage sites, monuments, etc.
        // Q2065736 = cultural heritage site
        // Q4989906 = monument
        // Q811979 = architectural structure
        const sparqlQuery = `
      SELECT DISTINCT ?item ?itemLabel ?location ?category ?categoryLabel ?image ?article WHERE {
        # Find items within radius
        SERVICE wikibase:around {
          ?item wdt:P625 ?location .
          bd:serviceParam wikibase:center "Point(${location.lng} ${location.lat})"^^geo:wktLiteral .
          bd:serviceParam wikibase:radius "${radius}" .
        }

        # Filter for heritage sites, monuments, etc.
        VALUES ?classes { wd:Q2065736 wd:Q4989906 wd:Q811979 }
        ?item wdt:P31/wdt:P279* ?classes .
        
        # Get category
        ?item wdt:P31 ?category .

        # Optional: Get image
        OPTIONAL { ?item wdt:P18 ?image . }
        
        # Optional: Get Wikipedia article
        OPTIONAL {
          ?article schema:about ?item .
          ?article schema:isPartOf <https://en.wikipedia.org/> .
        }

        # Label service
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" . }
      }
      LIMIT ${limit}
    `;

        try {
            const response = await retry(async () => {
                return await axios.get(WIKIDATA_ENDPOINT, {
                    params: {
                        query: sparqlQuery,
                        format: 'json',
                    },
                    headers: {
                        'User-Agent': 'HeritagePulse/1.0 (mailto:admin@heritagepulse.app)',
                        'Accept': 'application/sparql-results+json',
                    },
                    timeout: 30000, // 30s timeout
                });
            }, 3, 2000); // 3 retries, 2s base delay

            return this._processResults(response.data);
        } catch (error) {
            logger.error('Wikidata SPARQL error:', error.message);
            if (error.response) {
                logger.error('Wikidata response:', error.response.data);
            }
            // Return empty array on error rather than crashing
            return [];
        }
    }

    /**
     * Process and normalize SPARQL results
     * @private
     */
    _processResults(data) {
        if (!data || !data.results || !data.results.bindings) {
            return [];
        }

        return data.results.bindings.map(result => {
            try {
                // Extract coordinates from Point(lng lat) string
                const locString = result.location?.value || '';
                const matches = locString.match(/Point\(([-\d.]+) ([-\d.]+)\)/);

                let lat = 0, lng = 0;
                if (matches && matches.length === 3) {
                    lng = parseFloat(matches[1]);
                    lat = parseFloat(matches[2]);
                }

                return {
                    id: result.item.value.split('/').pop(),
                    wikidataId: result.item.value,
                    name: result.itemLabel?.value || 'Unknown Site',
                    category: result.categoryLabel?.value || 'Heritage Site',
                    location: { lat, lng },
                    imageUrl: result.image?.value || null,
                    wikipediaUrl: result.article?.value || null,
                    source: 'wikidata',
                };
            } catch (err) {
                logger.warn('Error parsing single Wikidata result:', err);
                return null; // Skip malformed results
            }
        }).filter(item => item !== null); // Remove nulls
    }
}

module.exports = new WikidataService();
