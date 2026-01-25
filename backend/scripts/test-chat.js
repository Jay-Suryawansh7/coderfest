/**
 * Test Heritage Chat Assistant
 * =============================
 * Integration test for Heritage Assistant Endpoint.
 */

const axios = require('axios');

const TEST_MESSAGES = [
    {
        message: "Tell me about Taj Mahal",
        context: { current_location: "Agra" }
    },
    {
        message: "What is nearby?",
        context: { current_location: "Agra" }
    }
];

const runTest = async () => {
    console.log('🚀 Testing Heritage Assistant Chat...');

    for (const payload of TEST_MESSAGES) {
        console.log(`\n💬 Sending: "${payload.message}"`);

        try {
            const response = await axios.post('http://localhost:5000/api/chat/heritage-assistant', payload);

            if (response.data.success) {
                console.log('✅ Response Received:');
                console.log(`   Reply: ${response.data.data.reply.substring(0, 150)}...`);
                console.log(`   Context Used: ${response.data.data.context_used}`);
                console.log(`   Sources: ${response.data.data.sources.map(s => s.type).join(', ')}`);
                if (response.data.data.related_sites.length > 0) {
                    console.log(`   Related: ${response.data.data.related_sites.join(', ')}`);
                }
            } else {
                console.error('❌ Success: false', response.data);
            }

        } catch (error) {
            if (error.response?.status === 404) {
                console.error('❌ Endpoint 404 - Server might need restart to pick up new routes');
            } else {
                console.error(`❌ Request Failed (${error.response?.status}):`, error.response?.data || error.message);
            }
        }
    }
};

runTest();
