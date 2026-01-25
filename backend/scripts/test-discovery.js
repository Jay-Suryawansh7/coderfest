/**
 * Test Discovery Endpoint
 * ========================
 * Integration test for the Heritage Discovery pipeline.
 */

const axios = require('axios');

const TEST_PAYLOAD = {
    location: "Jaipur",
    radius: 10,
    categories: ["UNESCO", "Fort", "Palace"]
};

const runTest = async () => {
    console.log('🚀 Testing Heritage Discovery Pipeline...');
    console.log(`📍 Location: ${TEST_PAYLOAD.location}`);
    console.log('⏳ This may take up to 30 seconds (fetching from multiple APIs)...');

    try {
        const response = await axios.post('http://localhost:5000/api/heritage/discover', TEST_PAYLOAD);

        if (response.data.success) {
            console.log('\n✅ Discovery Successful!');
            const data = response.data.data;

            console.log(`\nFound ${data.count} sites in ${data.location.name}`);
            console.log(`Coordinates: ${data.location.coordinates.lat}, ${data.location.coordinates.lng}`);

            console.log('\nTop 5 Sites:');
            data.sites.slice(0, 5).forEach((site, index) => {
                console.log(`\n${index + 1}. ${site.name} (${site.category})`);
                console.log(`   Source: ${site.source}`);
                console.log(`   Summary: ${site.summary.substring(0, 100)}...`);
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
        process.exit(1);
    }
};

runTest();
