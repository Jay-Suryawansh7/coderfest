/**
 * Test Route Optimizer
 * ====================
 * Verifies the greedy TSP and scheduling logic.
 */

const { routeOptimizer } = require('../src/utils');

const runTest = () => {
    console.log('🚀 Testing Route Optimizer...');

    // Mock Sites
    const startCoords = { lat: 28.6139, lng: 77.2090 }; // New Delhi
    const sites = [
        { name: 'Red Fort', coordinates: { lat: 28.6562, lng: 77.2410 }, category: 'Fort' }, // ~5km
        { name: 'Humayun Tomb', coordinates: { lat: 28.5933, lng: 77.2507 }, category: 'UNESCO' }, // ~4km
        { name: 'Qutub Minar', coordinates: { lat: 28.5244, lng: 77.1855 }, category: 'UNESCO' }, // ~12km
        { name: 'Lotus Temple', coordinates: { lat: 28.5535, lng: 77.2588 }, category: 'Temple' }, // ~8km
        { name: 'Far Site', coordinates: { lat: 27.1751, lng: 78.0421 }, category: 'Monument' }, // Agra (High distance)
    ];

    const constraints = {
        startTime: '09:00',
        endTime: '18:00', // 9 hours
        startCoords
    };

    try {
        const schedule = routeOptimizer.optimizeRoute(sites, constraints);

        console.log(`\nGenerated ${schedule.length} Day(s) Schedule:`);

        schedule.forEach(day => {
            console.log(`\n📅 Day ${day.day}:`);
            day.sites.forEach(stop => {
                console.log(`   📍 ${stop.arrival_time} - ${stop.site.name} (${stop.duration_minutes}m visit)`);
                console.log(`      Travel: ${stop.travel_time_minutes}m (${stop.distance_km} km)`);
            });

            const stats = routeOptimizer.calculateDayStats(day.sites);
            console.log('   📊 Day Stats:', JSON.stringify(stats));
        });

        // Verification Checks
        if (schedule.length >= 1) {
            console.log('\n✅ Optimization produced a schedule');
        }

        // Check if Agra (Far Site) is likely pushed to Day 2 or last
        const farSiteDay = schedule.find(d => d.sites.some(s => s.site.name === 'Far Site'));
        if (farSiteDay && farSiteDay.day > 1) {
            console.log('✅ "Far Site" correctly pushed to later day or managed');
        } else {
            console.log('ℹ️ "Far Site" is in Day 1 (might verify logic or constraints)');
        }

    } catch (error) {
        console.error('❌ Optimizer failed:', error);
    }
};

runTest();
