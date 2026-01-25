/**
 * Test Error Handling
 * ====================
 * Verifies global error handler responses.
 */

const axios = require('axios');

const runTest = async () => {
    console.log('🚀 Testing Error Handling...');
    const baseUrl = 'http://localhost:5000';

    // 1. 404 Tests
    console.log('\n1. Testing 404 (Not Found)...');
    try {
        await axios.get(`${baseUrl}/api/ghost-route`);
        console.error('❌ Failed: Should have returned 404');
    } catch (error) {
        if (error.response?.status === 404) {
            console.log('✅ Correctly returned 404');
            console.log('   Response:', JSON.stringify(error.response.data));
        } else {
            console.error(`❌ Unexpected status: ${error.response?.status}`);
        }
    }

    // 2. Validation Error (400)
    console.log('\n2. Testing Validation Error (400)...');
    try {
        // Missing required fields
        await axios.post(`${baseUrl}/api/itinerary/generate`, {});
        console.error('❌ Failed: Should have returned 400');
    } catch (error) {
        if (error.response?.status === 400) {
            console.log('✅ Correctly returned 400');
            // Check response structure
            if (error.response.data.success === false && error.response.data.error) {
                console.log('✅ Response structure matches { success: false, error: ... }');
            } else {
                console.error('❌ Invalid response structure:', error.response.data);
            }
        } else {
            console.error(`❌ Unexpected status: ${error.response?.status}`);
        }
    }

    console.log('\n✨ Error Verification Complete! Check logs/error.log for entries.');
};

runTest();
