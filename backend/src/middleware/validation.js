/**
 * Heritage Pulse - Validation Middleware
 * =======================================
 * Request validation using express-validator.
 */

const { validationResult, body, param, query } = require('express-validator');
const { ApiError } = require('./errorHandler');

/**
 * Process validation results and throw error if invalid
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value,
        }));

        throw ApiError.badRequest('Validation failed', formattedErrors);
    }

    next();
};

/**
 * Common validation rules
 */
const validationRules = {
    // Pagination validation
    pagination: [
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page must be a positive integer'),
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1 and 100'),
    ],

    // ID parameter validation
    idParam: [
        param('id')
            .notEmpty()
            .withMessage('ID is required')
            .isString()
            .withMessage('ID must be a string'),
    ],

    // Search query validation
    searchQuery: [
        query('q')
            .optional()
            .isString()
            .isLength({ min: 1, max: 200 })
            .withMessage('Search query must be between 1 and 200 characters'),
    ],

    // Chat message validation
    chatMessage: [
        body('message')
            .notEmpty()
            .withMessage('Message is required')
            .isString()
            .withMessage('Message must be a string')
            .isLength({ min: 1, max: 5000 })
            .withMessage('Message must be between 1 and 5000 characters'),
        body('conversationId')
            .optional()
            .isString()
            .withMessage('Conversation ID must be a string'),
    ],
};

module.exports = {
    validate,
    validationRules,
    body,
    param,
    query,
};
