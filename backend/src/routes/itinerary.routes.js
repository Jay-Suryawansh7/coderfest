/**
 * Heritage Pulse - Itinerary Routes
 * =================================
 * Routes for AI itinerary generation.
 */

const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itinerary.controller');
const { validateItineraryRequest } = require('../middleware/validators/itinerary.validator');
const { validate } = require('../middleware/validation');

/**
 * @route   POST /api/itinerary/generate
 * @desc    Generate optimized itinerary
 * @access  Public
 */
router.post(
    '/generate',
    validateItineraryRequest,
    validate,
    itineraryController.generateItinerary
);

module.exports = router;
