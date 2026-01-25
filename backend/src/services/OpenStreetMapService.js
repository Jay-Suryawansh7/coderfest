/**
 * Heritage Pulse - OpenStreetMap Service
 * ======================================
 * Service for geocoding and finding POIs using OSM (Nominatim & Overpass).
 */

const axios = require('axios');
const logger = require('../utils/logger');
const { retry } = require('../utils/helpers');

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

class OpenStreetMapService {
    /**
     * Get nearby monuments and attractions using Overpass API
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @param {number} radius - Search radius in meters (default: 5000)
     * @returns {Promise<Array>} List of POIs
     */
    async getNearbyMonuments(lat, lng, radius = 5000) {
        if (!lat || !lng) {
            throw new Error('Latitude and longitude are required');
        }

        // Overpass QL query: find tourism=attraction OR historic=monument OR historic=memorial
        const query = `
      [out:json][timeout:25];
      (
        node["historic"~"monument|memorial|ruins|castle|fort"](around:${radius},${lat},${lng});
        way["historic"~"monument|memorial|ruins|castle|fort"](around:${radius},${lat},${lng});
        relation["historic"~"monument|memorial|ruins|castle|fort"](around:${radius},${lat},${lng});
        node["tourism"="attraction"](around:${radius},${lat},${lng});
      );
      out body center qt;
      >;
      out skel qt;
    `;

        try {
            const response = await retry(async () => {
                return await axios.post(OVERPASS_API_URL, query, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': 'HeritagePulse/1.0',
                    },
                    timeout: 30000,
                });
            }, 3, 2000);

            return this._processOverpassResults(response.data);
        } catch (error) {
            logger.error('Overpass API error:', error.message);
            return [];
        }
    }

    /**
     * Geocode a place name to coordinates using Nominatim
     * @param {string} placeName - Name of place to geocode
     * @returns {Promise<Object|null>} Geocoding result
     */
    async geocodeLocation(placeName) {
        if (!placeName) {
            throw new Error('Place name is required');
        }

        try {
            const response = await retry(async () => {
                return await axios.get(NOMINATIM_API_URL, {
                    params: {
                        q: placeName,
                        format: 'json',
                        limit: 1,
                        addressdetails: 1,
                    },
                    headers: {
                        'User-Agent': 'HeritagePulse/1.0 (mailto:admin@heritagepulse.app)',
                    },
                    timeout: 10000,
                });
            }, 2, 1000);

            const results = response.data;
            if (results && results.length > 0) {
                const result = results[0];
                return {
                    lat: parseFloat(result.lat),
                    lng: parseFloat(result.lon),
                    displayName: result.display_name,
                    type: result.type,
                    class: result.class,
                    boundingBox: result.boundingbox,
                    address: result.address,
                };
            }
            return null;
        } catch (error) {
            logger.error('Nominatim geocoding error:', error.message);
            throw error;
        }
    }

    /**
     * Process Overpass API results
     * @private
     */
    _processOverpassResults(data) {
        if (!data || !data.elements) {
            return [];
        }

        // Filter relevant elements (nodes, ways, relations with tags)
        const pois = data.elements.filter(el => el.tags && (el.tags.name || el.tags['name:en']));

        return pois.map(poi => {
            // Use center for ways/relations if available (Overpass 'center' modifier)
            const lat = poi.lat || (poi.center && poi.center.lat) || 0;
            const lng = poi.lon || (poi.center && poi.center.lon) || 0;

            return {
                id: `osm_${poi.id}`,
                osmId: poi.id,
                type: poi.type,
                name: poi.tags['name:en'] || poi.tags.name,
                localName: poi.tags.name !== poi.tags['name:en'] ? poi.tags.name : undefined,
                category: poi.tags.historic || poi.tags.tourism || 'attraction',
                location: { lat, lng },
                tags: poi.tags,
                source: 'openstreetmap',
            };
        }).filter(poi => poi.location.lat !== 0 && poi.location.lng !== 0);
    }
}

module.exports = new OpenStreetMapService();
