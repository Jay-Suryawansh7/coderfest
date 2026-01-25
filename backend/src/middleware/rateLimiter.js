/**
 * Heritage Pulse - Rate Limiter Middleware
 * =========================================
 * Flexible rate limiting with in-memory storage.
 */

const { RateLimiterMemory } = require('rate-limiter-flexible');
const logger = require('../utils/logger');
const config = require('../config');

// Configure rate limiter
const rateLimiter = new RateLimiterMemory({
    points: config.rateLimit.maxRequests, // Number of requests
    duration: config.rateLimit.windowMs / 1000, // Per duration in seconds
    blockDuration: 60, // Block for 1 minute if exceeded
});

/**
 * Rate limiting middleware
 */
const rateLimiterMiddleware = async (req, res, next) => {
    try {
        // Use IP address as the key for rate limiting
        const key = req.ip || req.connection.remoteAddress || 'unknown';

        const rateLimiterRes = await rateLimiter.consume(key);

        // Set rate limit headers
        res.set({
            'X-RateLimit-Limit': config.rateLimit.maxRequests,
            'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
            'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
        });

        next();
    } catch (rateLimiterRes) {
        // Rate limit exceeded
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);

        const retryAfter = Math.ceil(rateLimiterRes.msBeforeNext / 1000);

        res.set({
            'Retry-After': retryAfter,
            'X-RateLimit-Limit': config.rateLimit.maxRequests,
            'X-RateLimit-Remaining': 0,
            'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
        });

        res.status(429).json({
            success: false,
            error: {
                statusCode: 429,
                message: 'Too many requests, please try again later.',
                retryAfter,
            },
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = rateLimiterMiddleware;
