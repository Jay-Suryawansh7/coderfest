/**
 * Heritage Pulse - Error Handler Middleware
 * ==========================================
 * Centralized error handling with structured error responses.
 */

const logger = require('../utils/logger');

/**
 * Custom API Error class
 */
class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, details = null) {
        return new ApiError(400, message, details);
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message);
    }

    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message);
    }

    static notFound(message = 'Resource not found') {
        return new ApiError(404, message);
    }

    static tooManyRequests(message = 'Too many requests') {
        return new ApiError(429, message);
    }

    static internal(message = 'Internal server error') {
        return new ApiError(500, message);
    }

    static serviceUnavailable(message = 'Service temporarily unavailable') {
        return new ApiError(503, message);
    }
}

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    // Default error values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let details = err.details || null;

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        details = err.errors || err.message;
    }

    if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
        statusCode = 400;
        message = 'Invalid JSON in request body';
    }

    if (err.type === 'entity.too.large') {
        statusCode = 413;
        message = 'Request payload too large';
    }

    // Log the error
    const logLevel = statusCode >= 500 ? 'error' : 'warn';
    logger[logLevel](`${statusCode} - ${message}`, {
        path: req.path,
        method: req.method,
        ip: req.ip,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    // Build error response
    const errorResponse = {
        success: false,
        error: {
            statusCode,
            message,
            ...(details && { details }),
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    };

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
module.exports.ApiError = ApiError;
