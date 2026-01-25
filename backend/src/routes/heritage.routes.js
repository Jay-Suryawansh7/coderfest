/**
 * Heritage Pulse - Heritage Routes
 * =================================
 * Routes for heritage site exploration and data.
 */

const express = require('express');
const router = express.Router();
const heritageController = require('../controllers/heritage.controller');
const { validate, validationRules } = require('../middleware/validation');

/**
 * @route   GET /api/heritage
 * @desc    Get list of heritage sites
 * @access  Public
 */
router.get(
    '/',
    validationRules.pagination,
    validationRules.searchQuery,
    validate,
    heritageController.getHeritageSites
);

/**
 * @route   GET /api/heritage/:id
 * @desc    Get a single heritage site by ID
 * @access  Public
 */
router.get(
    '/:id',
    validationRules.idParam,
    validate,
    heritageController.getHeritageSiteById
);

/**
 * @route   GET /api/heritage/search
 * @desc    Search heritage sites
 * @access  Public
 */
router.get(
    '/search',
    validationRules.searchQuery,
    validate,
    heritageController.searchHeritageSites
);

/**
 * @route   GET /api/heritage/nearby
 * @desc    Get nearby heritage sites based on location
 * @access  Public
 */
router.get(
    '/nearby',
    heritageController.getNearbyHeritageSites
);

/**
 * @route   POST /api/heritage/discover
 * @desc    Discover heritage sites with multi-source aggregation
 * @access  Public
 */
router.post(
    '/discover',
    heritageController.discoverHeritage
);

module.exports = router;
