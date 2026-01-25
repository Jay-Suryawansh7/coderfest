/**
 * Heritage Pulse - Configuration Module
 * =====================================
 * Centralized configuration management with environment variable validation.
 */

const path = require('path');

// Validate required environment variables
const requiredEnvVars = ['PORT'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'production') {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

const config = {
    // Server settings
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',

    // OpenRouter API settings
    openRouter: {
        apiKey: process.env.OPENROUTER_API_KEY || '',
        baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
        defaultModel: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001',
        timeout: parseInt(process.env.OPENROUTER_TIMEOUT, 10) || 30000,
    },

    // Frontend URL for CORS
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

    // CORS settings
    cors: {
        allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173')
            .split(',')
            .map(origin => origin.trim()),
    },

    // Rate limiting
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW, 10) * 60 * 1000 || 15 * 60 * 1000, // Default: 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    },

    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.LOG_FORMAT || 'combined',
    },

    // Paths
    paths: {
        root: path.resolve(__dirname, '..'),
        src: __dirname,
        logs: path.resolve(__dirname, '..', 'logs'),
    },
};

// Freeze config to prevent modifications
Object.freeze(config);
Object.freeze(config.openRouter);
Object.freeze(config.cors);
Object.freeze(config.rateLimit);
Object.freeze(config.logging);
Object.freeze(config.paths);

module.exports = config;
