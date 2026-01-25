/**
 * Heritage Pulse - Heritage Service
 * ==================================
 * Service layer for heritage site operations.
 * This is a placeholder implementation - replace with actual data source.
 */

const logger = require('../utils/logger');

// Mock heritage data (replace with actual database or API integration)
const mockHeritageSites = [
    {
        id: '1',
        name: 'Taj Mahal',
        location: { city: 'Agra', country: 'India', lat: 27.1751, lng: 78.0421 },
        description: 'An ivory-white marble mausoleum, a UNESCO World Heritage Site.',
        category: 'Monument',
        era: '17th Century',
        significance: 'Symbol of eternal love, Mughal architecture masterpiece',
        imageUrl: '/images/taj-mahal.jpg',
    },
    {
        id: '2',
        name: 'Colosseum',
        location: { city: 'Rome', country: 'Italy', lat: 41.8902, lng: 12.4922 },
        description: 'Ancient Roman amphitheater, the largest ever built.',
        category: 'Archaeological Site',
        era: '1st Century AD',
        significance: 'Icon of Imperial Rome, engineering marvel',
        imageUrl: '/images/colosseum.jpg',
    },
    {
        id: '3',
        name: 'Great Wall of China',
        location: { city: 'Beijing', country: 'China', lat: 40.4319, lng: 116.5704 },
        description: 'Series of fortifications made of stone, brick, and other materials.',
        category: 'Fortification',
        era: '7th Century BC - 17th Century AD',
        significance: 'World\'s longest wall, symbol of Chinese civilization',
        imageUrl: '/images/great-wall.jpg',
    },
    {
        id: '4',
        name: 'Machu Picchu',
        location: { city: 'Cusco Region', country: 'Peru', lat: -13.1631, lng: -72.545 },
        description: '15th-century Inca citadel set high in the Andes Mountains.',
        category: 'Archaeological Site',
        era: '15th Century',
        significance: 'Best-preserved example of Inca civilization',
        imageUrl: '/images/machu-picchu.jpg',
    },
    {
        id: '5',
        name: 'Pyramids of Giza',
        location: { city: 'Giza', country: 'Egypt', lat: 29.9792, lng: 31.1342 },
        description: 'Ancient pyramid complex including the Great Pyramid.',
        category: 'Monument',
        era: '26th Century BC',
        significance: 'Only surviving wonder of the ancient world',
        imageUrl: '/images/pyramids.jpg',
    },
];

/**
 * Get heritage sites with pagination
 */
const getHeritageSites = async ({ page = 1, limit = 20, query = '' }) => {
    try {
        let sites = [...mockHeritageSites];

        // Filter by query if provided
        if (query) {
            const searchTerm = query.toLowerCase();
            sites = sites.filter(site =>
                site.name.toLowerCase().includes(searchTerm) ||
                site.location.country.toLowerCase().includes(searchTerm) ||
                site.description.toLowerCase().includes(searchTerm)
            );
        }

        // Calculate pagination
        const total = sites.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return {
            sites: sites.slice(startIndex, endIndex),
            page,
            limit,
            total,
            totalPages,
        };
    } catch (error) {
        logger.error('Error in getHeritageSites:', error);
        throw error;
    }
};

/**
 * Get a single heritage site by ID
 */
const getHeritageSiteById = async (id) => {
    try {
        const site = mockHeritageSites.find(s => s.id === id);
        return site || null;
    } catch (error) {
        logger.error(`Error in getHeritageSiteById(${id}):`, error);
        throw error;
    }
};

/**
 * Search heritage sites
 */
const searchHeritageSites = async ({ query, page = 1, limit = 20 }) => {
    return getHeritageSites({ page, limit, query });
};

/**
 * Get nearby heritage sites based on location
 */
const getNearbyHeritageSites = async ({ latitude, longitude, radius = 50 }) => {
    try {
        // Calculate distance using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Earth's radius in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        const sitesWithDistance = mockHeritageSites
            .map(site => ({
                ...site,
                distance: calculateDistance(
                    latitude, longitude,
                    site.location.lat, site.location.lng
                ),
            }))
            .filter(site => site.distance <= radius)
            .sort((a, b) => a.distance - b.distance);

        return {
            sites: sitesWithDistance,
        };
    } catch (error) {
        logger.error('Error in getNearbyHeritageSites:', error);
        throw error;
    }
};

module.exports = {
    getHeritageSites,
    getHeritageSiteById,
    searchHeritageSites,
    getNearbyHeritageSites,
};
