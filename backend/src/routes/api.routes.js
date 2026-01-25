/**
 * Heritage Pulse - Main API Routes
 * =================================
 * Central router for all API endpoints.
 */

const express = require('express');
const router = express.Router();

// Import sub-routes
const heritageRoutes = require('./heritage.routes');
const chatRoutes = require('./chat.routes');
const itineraryRoutes = require('./itinerary.routes');

/**
 * @route   GET /api
 * @desc    API information endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Heritage Pulse API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            heritage: '/api/heritage',
            chat: '/api/chat',
            itinerary: '/api/itinerary',
        },
        documentation: '/api/docs',
        timestamp: new Date().toISOString(),
    });
});

// Mount sub-routes
router.use('/heritage', heritageRoutes);
router.use('/chat', chatRoutes);
router.use('/itinerary', itineraryRoutes);

module.exports = router;
