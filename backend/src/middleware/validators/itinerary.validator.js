/**
 * Heritage Pulse - Itinerary Validation Middleware
 * =================================================
 * Validation schema for itinerary generation requests.
 */

const { checkSchema } = require('express-validator');

const itineraryRequestSchema = {
    location: {
        in: ['body'],
        isString: {
            errorMessage: 'Location must be a string',
        },
        trim: true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'Location must be at least 2 characters long',
        },
        notEmpty: {
            errorMessage: 'Location is required',
        },
    },
    days: {
        in: ['body'],
        isInt: {
            options: { min: 1, max: 14 },
            errorMessage: 'Days must be an integer between 1 and 14',
        },
        toInt: true,
    },
    'preferences.categories': {
        in: ['body'],
        isArray: {
            errorMessage: 'Categories must be an array',
        },
        optional: true,
    },
    'preferences.categories.*': {
        in: ['body'],
        isString: {
            errorMessage: 'Each category must be a string',
        },
        isIn: {
            options: [['UNESCO', 'Temple', 'Fort', 'Museum', 'Palace', 'Monument', 'Nature', 'Other']],
            errorMessage: 'Invalid category',
        },
    },
    'preferences.pace': {
        in: ['body'],
        optional: true,
        isString: true,
        isIn: {
            options: [['relaxed', 'moderate', 'packed']],
            errorMessage: 'Pace must be one of: relaxed, moderate, packed',
        },
        default: { options: 'moderate' },
    },
    'preferences.startTime': {
        in: ['body'],
        optional: true,
        matches: {
            options: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/],
            errorMessage: 'Start time must be in HH:MM format',
        },
        default: { options: '09:00' },
    },
    'preferences.endTime': {
        in: ['body'],
        optional: true,
        matches: {
            options: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/],
            errorMessage: 'End time must be in HH:MM format',
        },
        default: { options: '18:00' },
    },
    radius: {
        in: ['body'],
        optional: true,
        isInt: {
            options: { min: 5, max: 100 },
            errorMessage: 'Radius must be between 5 and 100 km',
        },
        toInt: true,
        default: { options: 50 },
    },
};

const validateItineraryRequest = checkSchema(itineraryRequestSchema);

module.exports = {
    validateItineraryRequest,
    itineraryRequestSchema,
};
