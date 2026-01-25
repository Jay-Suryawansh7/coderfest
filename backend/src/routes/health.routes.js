/**
 * Heritage Pulse - Health Check Routes
 * =====================================
 * Server health and status endpoints.
 */

const express = require('express');
const router = express.Router();
const os = require('os');

/**
 * @route   GET /health
 * @desc    Basic health check
 * @access  Public
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

/**
 * @route   GET /health/detailed
 * @desc    Detailed health check with system info
 * @access  Public
 */
router.get('/detailed', (req, res) => {
    const memoryUsage = process.memoryUsage();

    res.status(200).json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        server: {
            uptime: process.uptime(),
            nodeVersion: process.version,
            platform: process.platform,
            pid: process.pid,
        },
        memory: {
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`,
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        },
        system: {
            loadAverage: os.loadavg(),
            freeMemory: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
            totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
            cpuCount: os.cpus().length,
        },
    });
});

/**
 * @route   GET /health/ready
 * @desc    Readiness check for load balancers
 * @access  Public
 */
router.get('/ready', (req, res) => {
    // Add checks for external dependencies here (database, cache, etc.)
    const isReady = true;

    if (isReady) {
        res.status(200).json({
            success: true,
            status: 'ready',
            timestamp: new Date().toISOString(),
        });
    } else {
        res.status(503).json({
            success: false,
            status: 'not ready',
            timestamp: new Date().toISOString(),
        });
    }
});

/**
 * @route   GET /health/live
 * @desc    Liveness check for container orchestration
 * @access  Public
 */
router.get('/live', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'alive',
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
