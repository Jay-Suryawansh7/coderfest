/**
 * Heritage Pulse - 404 Not Found Handler
 * =======================================
 * Handles requests to non-existent routes.
 */

const { ApiError } = require('./errorHandler');

const notFoundHandler = (req, res, next) => {
    const error = ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`);
    next(error);
};

module.exports = notFoundHandler;
