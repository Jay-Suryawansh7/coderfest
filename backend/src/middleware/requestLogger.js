/**
 * Request Logging Middleware
 * ===========================
 * Logs incoming requests details.
 */

const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
    logger.info({
        message: 'Incoming Request',
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        timestamp: new Date().toISOString()
    });
    next();
};

module.exports = requestLogger;
