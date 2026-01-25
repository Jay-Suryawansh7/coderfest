/**
 * Test Data Enricher
 * ==================
 * Verifies utility functions for data enhancement.
 */

const { dataEnricher } = require('../src/utils');

const runTest = () => {
    console.log('🚀 Testing Data Enricher...');

    // 1. Format Historical Context
    console.log('\n1. formatHistoricalContext:');
    const rawText = "The Taj Mahal [1] is a mausoleum [citation needed] built in 1632.";
    const cleanText = dataEnricher.formatHistoricalContext(rawText);
    if (cleanText === "The Taj Mahal is a mausoleum built in 1632.") {
        console.log('✅ Cleaned text correctly');
    } else {
        console.error(`❌ Failed: "${cleanText}"`);
    }

    // 2. Categorize Site
    console.log('\n2. categorizeSite:');
    const cat1 = dataEnricher.categorizeSite({ name: 'City Palace' }, []); // Palace
    const cat2 = dataEnricher.categorizeSite({ tourism: 'museum' }, []); // Museum
    const cat3 = dataEnricher.categorizeSite({}, ['UNESCO World Heritage']); // UNESCO

    if (cat1 === 'Palace' && cat2 === 'Museum' && cat3 === 'UNESCO World Heritage Site') {
        console.log('✅ Categorization logic works');
    } else {
        console.error(`❌ Failed: ${cat1}, ${cat2}, ${cat3}`);
    }

    // 3. Generate Slug
    console.log('\n3. generateSiteSlug:');
    const slug = dataEnricher.generateSiteSlug("Red Fort, Delhi");
    if (slug === 'red-fort-delhi') {
        console.log(`✅ Slug generated: ${slug}`);
    } else {
        console.error(`❌ Failed: ${slug}`);
    }

    // 4. Visiting Info
    console.log('\n4. addVisitingInfo:');
    const site = { category: 'Museum' };
    const enriched = dataEnricher.addVisitingInfo(site);
    if (enriched.visitingHours.includes('10:00')) {
        console.log(`✅ Added Museum hours: ${enriched.visitingHours}`);
    } else {
        console.error(`❌ Failed: ${enriched.visitingHours}`);
    }

    console.log('\n✨ Enrichment Verification Complete!');
};

runTest();
