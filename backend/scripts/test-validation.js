/**
 * Test Validation Middleware
 * ===========================
 * Verifies that validators correctly accept valid data and reject invalid data.
 */

const express = require('express');
const { validateItineraryRequest } = require('../src/middleware/validators/itinerary.validator');
const { validateHeritageRequest } = require('../src/middleware/validators/heritage.validator');
const { validate } = require('../src/middleware/validation'); // Generic validation handler that checks validationResult
const axios = require('axios');
const logger = require('../src/utils/logger');

// Setup temp server
const app = express();
app.use(express.json());

// Routes with validation
app.post('/test/itinerary', validateItineraryRequest, validate, (req, res) => {
    res.json({ success: true, data: req.body });
});

app.get('/test/heritage', validateHeritageRequest, validate, (req, res) => {
    res.json({ success: true, query: req.query });
});

const PORT = 5001;
let server;

const startServer = () => {
    return new Promise((resolve) => {
        server = app.listen(PORT, () => {
            console.log(`Test server running on port ${PORT}`);
            resolve();
        });
    });
};

const stopServer = () => {
    server.close();
};

const runTests = async () => {
    try {
        await startServer();
        const baseUrl = `http://localhost:${PORT}`;

        console.log('\n🧪 Testing Itinerary Validator...');

        // Case 1: Valid Itinerary Request
        try {
            await axios.post(`${baseUrl}/test/itinerary`, {
                location: 'Jaipur',
                days: 3,
                preferences: {
                    categories: ['Fort', 'Palace'],
                    pace: 'moderate',
                    startTime: '09:00',
                    endTime: '18:00'
                },
                radius: 20
            });
            console.log('✅ Valid Itinerary Request: PASSED');
        } catch (e) {
            console.error('❌ Valid Itinerary Request: FAILED', e.response?.data || e.message);
        }

        // Case 2: Invalid Itinerary (days out of range)
        try {
            await axios.post(`${baseUrl}/test/itinerary`, {
                location: 'Jaipur',
                days: 20, // Invalid: max 14
            });
            console.error('❌ Invalid Itinerary (Days): FAILED (Should have been rejected)');
        } catch (e) {
            if (e.response?.status === 400) {
                console.log('✅ Invalid Itinerary (Days): PASSED (Correctly rejected)');
            } else {
                console.error('❌ Invalid Itinerary (Days): FAILED', e.response?.status);
            }
        }

        console.log('\n🧪 Testing Heritage Validator...');

        // Case 3: Valid Heritage Request
        try {
            await axios.get(`${baseUrl}/test/heritage?query=Taj%20Mahal&page=1&limit=10&filters[verified]=true`);
            console.log('✅ Valid Heritage Request: PASSED');
        } catch (e) {
            console.error('❌ Valid Heritage Request: FAILED', e.response?.data || e.message);
        }

        // Case 4: Invalid Heritage (query too short)
        try {
            await axios.get(`${baseUrl}/test/heritage?query=yo`); // Invalid: min 3 chars
            console.error('❌ Invalid Heritage (Query): FAILED (Should have been rejected)');
        } catch (e) {
            if (e.response?.status === 400) {
                console.log('✅ Invalid Heritage (Query): PASSED (Correctly rejected)');
            } else {
                console.error('❌ Invalid Heritage (Query): FAILED', e.response?.status);
            }
        }

    } catch (error) {
        console.error('Test execution failed:', error);
    } finally {
        stopServer();
        process.exit(0);
    }
};

runTests();
