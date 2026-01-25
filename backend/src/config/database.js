/**
 * Heritage Pulse - Database Configuration
 * =======================================
 * PostgreSQL connection pool configuration.
 */

const { Pool } = require('pg');
const logger = require('../utils/logger');

// Check for DATABASE_URL
if (!process.env.DATABASE_URL) {
    logger.error('DATABASE_URL environment variable is missing');
}

// Create connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon
    },
    max: 20, // Max clients in pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

// Event listeners
pool.on('error', (err, client) => {
    logger.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
    // logger.debug('New database connection');
});

/**
 * Execute a query
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        if (duration > 1000) {
            logger.warn(`Slow query executed in ${duration}ms`, { text });
        }
        return res;
    } catch (error) {
        logger.error('Database query error', { text, error: error.message });
        throw error;
    }
};

/**
 * Check database health
 */
const healthCheck = async () => {
    try {
        const res = await query('SELECT NOW()');
        return {
            status: 'healthy',
            timestamp: res.rows[0].now,
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message,
        };
    }
};

module.exports = {
    query,
    pool,
    healthCheck,
};
