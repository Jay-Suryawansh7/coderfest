/**
 * Test AI Itinerary Generator
 * ============================
 * Integration test for DeepSeek R1 itinerary generation.
 */

const axios = require('axios');

const TEST_PAYLOAD = {
    location: "agra",
    days: 2,
    preferences: {
        categories: ["UNESCO", "Monument"],
        pace: "moderate",
        startTime: "09:00",
        endTime: "18:00"
    }
};

const runTest = async () => {
    console.log('🚀 Testing AI Itinerary Generator (DeepSeek R1)...');
    console.log(`📍 Location: ${TEST_PAYLOAD.location}, Days: ${TEST_PAYLOAD.days}`);
    console.log('⏳ This uses a reasoning model, so it might take 30-60 seconds...');

    try {
        const response = await axios.post('http://localhost:5000/api/itinerary/generate', TEST_PAYLOAD, {
            timeout: 120000 // 2 minutes timeout for AI
        });

        if (response.data.success) {
            console.log('\n✅ Itinerary Generated Successfully!');
            const data = response.data.data;

            console.log(`\nTitle: ${data.summary}`);
            console.log(`ID: ${data.itinerary_id}`);

            console.log('\n📅 Schedule Preview:');
            data.schedule.forEach(day => {
                console.log(`\nDay ${day.day}: ${day.theme || 'Exploration'}`);
                day.sites.forEach(activity => {
                    console.log(`   ⏰ ${activity.time || activity.arrival_time} - ${activity.location || activity.site_details?.name}`);
                    console.log(`      Details: ${activity.site_details ? 'Attached' : 'Missing'}`);
                    if (activity.notes) console.log(`      Note: ${activity.notes.substring(0, 50)}...`);
                });
            });

        } else {
            console.error('❌ API returned success: false', response.data);
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('❌ Connection refused. Is the server running on port 5000?');
        } else {
            console.error('❌ Request failed:', error.response?.data || error.message);
        }
    }
};

runTest();
