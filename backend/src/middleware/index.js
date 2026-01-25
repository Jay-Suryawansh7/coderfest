/**
 * Heritage Pulse - Middleware Index
 * ==================================
 * Centralized middleware exports.
 */

const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFoundHandler');
const rateLimiter = require('./rateLimiter');
const validation = require('./validation');

module.exports = {
    errorHandler,
    ApiError: errorHandler.ApiError,
    notFoundHandler,
    rateLimiter,
    ...validation,
};
