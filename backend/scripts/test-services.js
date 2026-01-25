/**
 * Test External Services
 * =======================
 * Functional test script to verify external API integrations.
 * Run with: node src/scripts/test-services.js
 */

require('dotenv').config();
const {
    wikidataService,
    wikipediaService,
    openStreetMapService,
    osrmService
} = require('../src/services');
const logger = require('../src/utils/logger');

const runTests = async () => {
    console.log('🚀 Starting Service Verification...\n');

    try {
        // 1. Test OpenStreetMap Geocoding
        console.log('📍 Testing OpenStreetMap Geocoding (Nominatim)...');
        const location = await openStreetMapService.geocodeLocation('Taj Mahal, Agra');
        if (location && location.lat) {
            console.log(`✅ Geocoding Success: ${location.displayName}`);
            console.log(`   Coordinates: ${location.lat}, ${location.lng}`);
        } else {
            console.error('❌ Geocoding Failed');
        }
        console.log('-'.repeat(50));

        // 2. Test Wikidata Search
        if (location) {
            console.log('🏛️  Testing Wikidata Search (SPARQL)...');
            const sites = await wikidataService.searchHeritageSites({
                location: { lat: location.lat, lng: location.lng },
                radius: 5, // 5km radius
                limit: 3
            });

            if (sites.length > 0) {
                console.log(`✅ Wikidata Success: Found ${sites.length} sites`);
                sites.forEach(site => console.log(`   - ${site.name} (${site.category})`));
            } else {
                console.warn('⚠️  Wikidata: No sites found (might be expected location)');
            }
        } else {
            console.log('⚠️  Skipping Wikidata test due to missing location');
        }
        console.log('-'.repeat(50));

        // 3. Test Wikipedia Context
        console.log('📚 Testing Wikipedia Context...');
        const wikiContext = await wikipediaService.getHistoricalContext('Taj Mahal');
        if (wikiContext && wikiContext.found) {
            console.log(`✅ Wikipedia Success: ${wikiContext.title}`);
            console.log(`   Summary length: ${wikiContext.summary.length} names`);
            console.log(`   URL: ${wikiContext.url}`);
        } else {
            console.error('❌ Wikipedia Failed');
        }
        console.log('-'.repeat(50));

        // 4. Test OSRM Routing
        console.log('🚗 Testing OSRM Routing...');
        // Agra to Delhi coordinates approximately
        const route = await osrmService.calculateRoute([
            { lat: 27.1751, lng: 78.0421 }, // Taj Mahal
            { lat: 28.6139, lng: 77.2090 }  // New Delhi
        ]);

        if (route) {
            console.log(`✅ OSRM Success: ${route.distanceKm} km, ${route.durationHours} hours`);
            console.log(`   Source: ${route.source}`);
        } else {
            console.error('❌ OSRM Failed');
        }
        console.log('-'.repeat(50));

        console.log('\n✨ Verification Complete!');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Verification Error:', error);
        process.exit(1);
    }
};

runTests();
