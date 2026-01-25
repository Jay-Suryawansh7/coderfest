/**
 * Heritage Pulse - Application Logger
 * ====================================
 * Configures Winston logger with file and console transports.
 */

const winston = require('winston');
const path = require('path');

// Ensure logs directory exists (handled by mkdir in script, but good practice to check logic in real app)
// For now assuming directory exists

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'heritage-pulse-api' },
    transports: [
        // Write all logs with level `error` to `error.log`
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error'
        }),
        // Write all logs to `combined.log`
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/combined.log')
        }),
    ],
});

// If not in production, verify log to console with simple format
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

module.exports = logger;
