/**
 * Heritage Pulse - Global Error Handler
 * ======================================
 * Centralized error handling and detailed logging.
 */

const logger = require('../config/logger');

// Custom Error Classes
class ApiError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }

    static badRequest(message, code = 'BAD_REQUEST') {
        return new ApiError(message, 400, code);
    }

    static notFound(message, code = 'NOT_FOUND') {
        return new ApiError(message, 404, code);
    }

    static internal(message, code = 'INTERNAL_ERROR') {
        return new ApiError(message, 500, code);
    }
}

class ValidationError extends ApiError {
    constructor(message) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

class ExternalAPIError extends ApiError {
    constructor(service, message) {
        super(`${service} API failed: ${message}`, 502, 'EXTERNAL_API_ERROR');
    }
}

// Global Middleware
const errorHandler = (err, req, res, next) => {
    // Log full error details
    logger.error({
        message: err.message,
        stack: err.stack,
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        code: err.code || 'UNKNOWN_ERROR'
    });

    // Determine response format
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        success: false,
        error: {
            message: err.message || "Internal Server Error",
            code: err.code || "UNKNOWN_ERROR",
            // Include stack trace only in development
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    };

    res.status(statusCode).json(errorResponse);
};

module.exports = {
    errorHandler,
    ApiError,
    ValidationError,
    ExternalAPIError
};
