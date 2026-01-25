/**
 * Database Initialization Script
 * ===============================
 * Applies schema to the database.
 * Usage: node src/db/init.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const logger = require('../utils/logger');

const initDb = async () => {
    try {
        console.log('🚀 Initializing Database...');
        console.log(`📡 Connecting to: ${process.env.DATABASE_URL.split('@')[1]}`); // Log host only for safety

        // Read schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('📝 Applying schema...');
        await db.query(schemaSql);

        console.log('✅ Database initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        process.exit(1);
    }
};

initDb();
