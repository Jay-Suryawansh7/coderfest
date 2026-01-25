/**
 * Heritage Pulse Backend - Main Server Entry Point
 * =================================================
 * Express server with comprehensive middleware setup,
 * health checks, and graceful shutdown handling.
 */

require('dotenv').config();

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
const app = express();

// ===========================================
// Security Middleware
// ===========================================
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

// ===========================================
// Request Logging Middleware
// ===========================================
app.use(requestLogger);

// ===========================================
// Rate Limiting (applied to API routes)
// ===========================================
app.use('/api', rateLimiter);

// ===========================================
// Routes
// ===========================================
app.use('/health', healthRoutes);
app.use('/api', apiRoutes);

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

// ===========================================
// Server Startup
// ===========================================
const server = app.listen(config.port, () => {
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
    logger.error('Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
