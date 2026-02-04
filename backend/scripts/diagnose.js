const path = require('path');
require('dotenv').config();

console.log('Starting diagnosis...');

try {
    console.log('1. Testing Logger...');
    const logger = require('../src/config/logger');
    console.log('✅ Logger loaded.');
} catch (e) {
    console.error('❌ Logger failed:', e);
}

try {
    console.log('2. Testing Database Config...');
    const db = require('../src/config/database');
    console.log('✅ Database config loaded.');
} catch (e) {
    console.error('❌ Database config failed:', e);
}

const services = [
    'openrouter.service',
    'heritage.service',
    'chat.service',
    'WikidataService',
    'WikipediaService',
    'OpenStreetMapService',
    'OSRMService'
];

console.log('3. Testing Services...');
services.forEach(service => {
    try {
        console.log(`   Testing ${service}...`);
        require(`../src/services/${service}`);
        console.log(`   ✅ ${service} loaded.`);
    } catch (e) {
        console.error(`   ❌ ${service} failed:`, e.message);
        if (e.code === 'MODULE_NOT_FOUND') {
            console.error('      Detailed:', e);
        }
    }
});

console.log('Diagnosis complete.');
