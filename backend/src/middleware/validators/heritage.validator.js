/**
 * Heritage Pulse - Heritage Validation Middleware
 * ===============================================
 * Validation schema for heritage search requests.
 */

const { checkSchema } = require('express-validator');

const heritageRequestSchema = {
    query: {
        in: ['query'],
        notEmpty: {
            errorMessage: 'Query is required',
        },
        isString: {
            errorMessage: 'Query must be a string',
        },
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'Query must be at least 3 characters long',
        },
    },
    'filters.category': {
        in: ['query'],
        optional: true,
        isString: true,
        // Add validation for category if we have a strict list
    },
    'filters.region': {
        in: ['query'],
        optional: true,
        isString: true,
    },
    'filters.verified': {
        in: ['query'],
        optional: true,
        isBoolean: {
            errorMessage: 'Verified must be a boolean',
        },
        toBoolean: true,
    },
    page: {
        in: ['query'],
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: 'Page must be a positive integer',
        },
        toInt: true,
        default: { options: 1 },
    },
    limit: {
        in: ['query'],
        optional: true,
        isInt: {
            options: { min: 1, max: 50 },
            errorMessage: 'Limit must be between 1 and 50',
        },
        toInt: true,
        default: { options: 12 },
    },
};

const validateHeritageRequest = checkSchema(heritageRequestSchema);

module.exports = {
    validateHeritageRequest,
    heritageRequestSchema,
};
