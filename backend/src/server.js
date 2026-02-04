/**
 * Heritage Pulse Backend - Main Server Entry Point
 * =================================================
 * Express server with comprehensive middleware setup,
 * health checks, and graceful shutdown handling.
 */

console.log('DEBUG: Starting server.js');
require('dotenv').config();
console.log('DEBUG: Dotenv loaded');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); // Added path for express.static

const config = require('./config');
const logger = require('./config/logger'); // Changed path for logger
const { errorHandler, ApiError } = require('./middleware/errorHandler'); // Changed import style
const { notFoundHandler } = require('./middleware/notFoundHandler'); // Changed import style
const rateLimiter = require('./middleware/rateLimiter');
const requestLogger = require('./middleware/requestLogger'); // New import

// Import routes
const healthRoutes = require('./routes/health.routes');
const apiRoutes = require('./routes/api.routes');

// Initialize Express app
console.log('DEBUG: Initializing app...');
const app = express();

console.log('DEBUG: Setting up middleware...');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// ===========================================
// CORS Configuration
// ===========================================
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        const allowedOrigins = config.cors.allowedOrigins;
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            logger.warn(`CORS blocked request from origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// ===========================================
// Body Parsing Middleware
// ===========================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public'))); // Added static files middleware
console.log('DEBUG: Middleware setup complete');

// ===========================================
// Request Logging Middleware
// ===========================================
console.log('DEBUG: Setting up request logger...');
app.use(requestLogger);

// ===========================================
// Rate Limiting (applied to API routes)
// ===========================================
console.log('DEBUG: Setting up rate limiter...');
app.use('/api', rateLimiter);

// ===========================================
// Routes
// ===========================================
console.log('DEBUG: Setting up /health routes...');
app.use('/health', healthRoutes);

console.log('DEBUG: Setting up /api routes...');
try {
    app.use('/api', apiRoutes);
} catch (e) {
    console.error('DEBUG: Crash mounting /api routes', e);
}
console.log('DEBUG: Routes setup complete');

// Root route
app.get('/', (req, res) => {
    res.json({
        name: 'Heritage Pulse API',
        version: '1.0.0',
        status: 'running',
        documentation: '/api/docs',
        health: '/health',
    });
});

// ===========================================
// Error Handling
// ===========================================
app.use(notFoundHandler);
app.use(errorHandler);

let server; // Declare variable outside scope

// ===========================================
// Server Startup
// ===========================================
console.log('DEBUG: Attempting to listen on port', config.port);
server = app.listen(config.port, () => {
    logger.info(`
╔════════════════════════════════════════════════════════╗
║           Heritage Pulse API Server                    ║
╠════════════════════════════════════════════════════════╣
║  🚀 Server running on port ${config.port.toString().padEnd(26)}║
║  🌍 Environment: ${config.nodeEnv.padEnd(35)}║
║  📡 Health check: http://localhost:${config.port}/health       ║
╚════════════════════════════════════════════════════════╝
  `);
});

// ===========================================
// Graceful Shutdown
// ===========================================
const gracefulShutdown = (signal) => {
    logger.info(`\n${signal} received. Starting graceful shutdown...`);

    if (!server) {
        logger.info('Server was not started yet. Exiting.');
        process.exit(0);
        return;
    }

    server.close((err) => {
        if (err) {
            logger.error('Error during server shutdown:', err);
            process.exit(1);
        }

        logger.info('HTTP server closed.');
        logger.info('Graceful shutdown completed.');
        process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
        logger.error('Forced shutdown due to timeout.');
        process.exit(1);
    }, 30000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('CRITICAL: Uncaught Exception:', error); // Direct console log
    logger.error('Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection:', reason); // Direct console log
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
