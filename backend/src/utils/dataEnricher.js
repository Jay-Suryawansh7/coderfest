/**
 * Heritage Pulse - Data Enricher Utility
 * =======================================
 * Utilities for cleaning, formatting, and enhancing heritage data.
 */

// Placeholder images for fallback
const PLACEHOLDERS = {
    default: 'https://placehold.co/600x400?text=Heritage+Site',
    museum: 'https://placehold.co/600x400?text=Museum',
    temple: 'https://placehold.co/600x400?text=Temple',
    fort: 'https://placehold.co/600x400?text=Fort',
};

/**
 * 1. Enrich site with images (Mock implementation of external fetching)
 * @param {Object} site 
 * @returns {Array<string>} Array of image URLs
 */
const enrichSiteWithImages = (site) => {
    // If site already has valid images, return them
    if (site.images && site.images.length > 0) {
        return site.images;
    }

    // If Wikipedia image is available from previous step (site.imageUrl)
    if (site.imageUrl) {
        return [site.imageUrl];
    }

    // Fallback to category-based placeholder
    const category = (site.category || '').toLowerCase();
    if (category.includes('museum')) return [PLACEHOLDERS.museum];
    if (category.includes('temple')) return [PLACEHOLDERS.temple];
    if (category.includes('fort')) return [PLACEHOLDERS.fort];

    return [PLACEHOLDERS.default];
};

/**
 * 2. Format and clean historical context summary
 * @param {string} summary 
 * @param {number} maxLength 
 * @returns {string} Cleaned summary
 */
const formatHistoricalContext = (summary, maxLength = 500) => {
    if (!summary) return 'No historical context available.';

    let clean = summary
        .replace(/\[\d+\]/g, '') // Remove citations [1], [2]
        .replace(/\[citation needed\]/g, '')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

    if (clean.length <= maxLength) return clean;

    // Truncate at the last full sentence within limit
    const truncated = clean.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');

    if (lastPeriod > 0) {
        return truncated.substring(0, lastPeriod + 1);
    }

    return truncated + '...';
};

/**
 * 3. Categorize site based on tags/metadata
 * @param {Object} tags - OSM tags
 * @param {Object} wikidataItem - Wikidata item
 * @returns {string} Standardized category
 */
const categorizeSite = (tags = {}, wikidataInstance = []) => {
    const instanceStr = Array.isArray(wikidataInstance) ? wikidataInstance.join(' ').toLowerCase() : (wikidataInstance || '').toLowerCase();

    if (instanceStr.includes('unesco') || (tags.heritage && tags.heritage.toString() === '1')) {
        return 'UNESCO World Heritage Site';
    }

    const historic = (tags.historic || '').toLowerCase();
    const tourism = (tags.tourism || '').toLowerCase();
    const name = (tags.name || '').toLowerCase();

    if (historic === 'temple' || name.includes('temple') || tags.religion) return 'Temple';
    if (historic === 'fort' || historic === 'castle' || name.includes('fort')) return 'Fort';
    if (historic === 'palace' || name.includes('palace')) return 'Palace';
    if (tourism === 'museum' || name.includes('museum')) return 'Museum';
    if (historic === 'memorial') return 'Memorial';
    if (historic === 'ruins') return 'Ruins';

    return 'Monument'; // Default
};

/**
 * 4. Generate URL-safe slug
 * @param {string} name 
 * @returns {string} Slug
 */
const generateSiteSlug = (name) => {
    if (!name) return 'unknown-site';

    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
        .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

/**
 * 5. Add visiting info (hours, fee) based on category/region
 * @param {Object} site 
 * @returns {Object} Enhanced site object
 */
const addVisitingInfo = (site) => {
    const category = (site.category || '').toLowerCase();
    let visitingHours = 'Sunrise to Sunset'; // Default for monuments
    let entryFee = 'Varies, check official website';

    // Specific Logic
    if (category.includes('museum')) {
        visitingHours = '10:00 - 17:00 (Closed Mondays)';
        entryFee = '₹50 - ₹500';
    } else if (category.includes('temple')) {
        visitingHours = '06:00 - 20:00';
        entryFee = 'Free Entry';
    } else if (category.includes('fort') || category.includes('palace')) {
        visitingHours = '09:00 - 17:00';
        entryFee = '₹20 - ₹600';
    } else if (category.includes('unesco')) {
        visitingHours = '06:00 - 18:00';
        entryFee = '₹50 (Indian) / ₹600 (Foreigner)';
    }

    // Use OSM opening_hours if available
    if (site.tags && site.tags.opening_hours) {
        visitingHours = site.tags.opening_hours;
    }

    return {
        ...site,
        visitingHours,
        entryFee
    };
};

module.exports = {
    enrichSiteWithImages,
    formatHistoricalContext,
    categorizeSite,
    generateSiteSlug,
    addVisitingInfo,
};
