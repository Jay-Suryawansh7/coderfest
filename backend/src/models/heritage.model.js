/**
 * Heritage Pulse - Heritage Site Model
 * =====================================
 * Data validation schema and types for heritage sites.
 */

/**
 * @typedef {Object} HeritageSite
 * @property {string} id - Unique ID
 * @property {string} name - Site name
 * @property {{lat: number, lng: number}} coordinates - Location
 * @property {string} category - Site category
 * @property {'wikidata'|'osm'|'wikipedia'|'manual'} source - Data source
 * @property {string} [wikidata_id] - Wikidata ID
 * @property {string} [summary] - Brief description
 * @property {string[]} [images] - Image URLs
 * @property {boolean} verified - Verification status
 * @property {string} [visitingHours] - Opening hours
 * @property {string} [entryFee] - Entry fee information
 * @property {Object} [metadata] - Additional source-specific data
 */

// ... existing schema and validation logic ...

/**
 * Heritage site schema definition
 */
const heritageSiteSchema = {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true, minLength: 1, maxLength: 200 },
    coordinates: {
        type: 'object',
        required: true,
        properties: {
            lat: { type: 'number', required: true },
            lng: { type: 'number', required: true },
        },
    },
    category: { type: 'string', required: true },
    source: { type: 'string', required: true, enum: ['wikidata', 'osm', 'wikipedia', 'manual'] },
    wikidata_id: { type: 'string', required: false },
    summary: { type: 'string', required: false },
    images: { type: 'array', required: false },
    verified: { type: 'boolean', required: false, default: false },
    visitingHours: { type: 'string', required: false },
    entryFee: { type: 'string', required: false },
    metadata: { type: 'object', required: false },
};

/**
 * Validate heritage site data
 */
const validateHeritageSite = (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== 'string') {
        errors.push({ field: 'name', message: 'Name is required and must be a string' });
    }

    if (!data.coordinates || typeof data.coordinates !== 'object') {
        errors.push({ field: 'coordinates', message: 'Coordinates are required' });
    } else {
        if (typeof data.coordinates.lat !== 'number') {
            errors.push({ field: 'coordinates.lat', message: 'Latitude must be a number' });
        }
        if (typeof data.coordinates.lng !== 'number') {
            errors.push({ field: 'coordinates.lng', message: 'Longitude must be a number' });
        }
    }

    if (!data.category || typeof data.category !== 'string') {
        errors.push({ field: 'category', message: 'Category is required' });
    }

    if (data.source && !['wikidata', 'osm', 'wikipedia', 'manual'].includes(data.source)) {
        errors.push({ field: 'source', message: 'Invalid source' });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Sanitize heritage site data
 */
const sanitizeHeritageSite = (data) => {
    return {
        id: data.id?.toString().trim(),
        name: data.name?.toString().trim(),
        coordinates: {
            lat: parseFloat(data.coordinates?.lat || data.location?.lat),
            lng: parseFloat(data.coordinates?.lng || data.location?.lng),
        },
        category: data.category?.toString().trim(),
        source: data.source || 'manual',
        wikidata_id: data.wikidata_id || null,
        summary: data.summary?.trim() || data.description?.trim() || null,
        images: Array.isArray(data.images) ? data.images : [],
        verified: !!data.verified,
        visitingHours: data.visitingHours || null,
        entryFee: data.entryFee || null,
        metadata: data.metadata || {},
    };
};

module.exports = {
    heritageSiteSchema,
    validateHeritageSite,
    sanitizeHeritageSite,
};
