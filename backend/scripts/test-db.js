/**
 * Test Database Connection & Schema
 * ==================================
 * Verifies PostgreSQL connection and table operations.
 */

require('dotenv').config();
const db = require('../src/config/database');
const { generateId } = require('../src/utils/helpers');

const runTest = async () => {
    console.log('🚀 Testing Database Connection...');

    try {
        // 1. Health Check
        const health = await db.healthCheck();
        if (health.status === 'healthy') {
            console.log(`✅ DB Connected! Time: ${health.timestamp}`);
        } else {
            throw new Error(`DB Unhealthy: ${health.error}`);
        }

        // 2. Insert Dummy Itinerary
        console.log('\n📝 Inserting dummy itinerary...');
        const dummyId = generateId('test_itin');
        const dummyData = {
            location_name: 'Test City',
            days: 2,
            preferences: { pace: 'relaxed' },
            schedule: [{ day: 1, sites: [] }],
            summary: 'Test summary'
        };

        const insertQuery = `
      INSERT INTO itineraries (id, location_name, days, preferences, schedule, summary)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

        await db.query(insertQuery, [
            dummyId,
            dummyData.location_name,
            dummyData.days,
            JSON.stringify(dummyData.preferences),
            JSON.stringify(dummyData.schedule),
            dummyData.summary
        ]);

        console.log(`✅ Inserted ID: ${dummyId}`);

        // 3. Read Verification
        console.log('\n🔍 Verifying insertion...');
        const result = await db.query('SELECT * FROM itineraries WHERE id = $1', [dummyId]);

        if (result.rows.length === 1) {
            console.log('✅ Record found!');
            console.log('   Location:', result.rows[0].location_name);
            console.log('   Created At:', result.rows[0].created_at);
        } else {
            console.error('❌ Record NOT found');
        }

        // 4. Cleanup
        console.log('\n🧹 Cleaning up...');
        await db.query('DELETE FROM itineraries WHERE id = $1', [dummyId]);
        console.log('✅ Cleanup successful');

    } catch (error) {
        console.error('❌ Test Failed:', error.message);
    } finally {
        // Close pool to allow script to exit
        await db.pool.end();
    }
};

runTest();
