/**
 * Heritage Pulse - OSRM Service
 * =============================
 * Service for routing and distance calculations using OSRM.
 */

const axios = require('axios');
const logger = require('../utils/logger');
const { retry } = require('../utils/helpers');

// Using OSRM Demo API
// NOTE: For production, use a hosted instance or a paid provider (Mapbox, GraphHopper)
const OSRM_API_URL = 'http://router.project-osrm.org';

class OSRMService {
    /**
     * Calculate route between multiple coordinates
     * @param {Array<Object>} coordinates - List of {lat, lng} points
     * @param {boolean} optimize - Whether to optimize the route (TSP) (default: false)
     * @returns {Promise<Object>} Route details including distance and duration
     */
    async calculateRoute(coordinates, optimize = false) {
        if (!coordinates || coordinates.length < 2) {
            throw new Error('At least two coordinates are required for routing');
        }

        // Format coordinates: "lng,lat;lng,lat"
        const coordString = coordinates
            .map(c => `${c.lng},${c.lat}`)
            .join(';');

        // Service: 'route' for direction, 'trip' for TSP optimization
        const service = optimize ? 'trip' : 'route';
        const profile = 'driving'; // driving, walking, cycling

        try {
            const response = await retry(async () => {
                return await axios.get(`${OSRM_API_URL}/${service}/v1/${profile}/${coordString}`, {
                    params: {
                        overview: 'full',
                        geometries: 'geojson',
                        steps: 'true',
                    },
                    timeout: 20000,
                });
            }, 3, 2000);

            if (response.data.code !== 'Ok') {
                throw new Error(`OSRM API Error: ${response.data.code}`);
            }

            return this._processRouteResult(response.data, optimize);

        } catch (error) {
            logger.error('OSRM API error:', error.message);

            // Fallback: Calculate straight-line distances if API fails
            logger.warn('Falling back to straight-line distance calculation');
            return this._calculateFallbackRoute(coordinates);
        }
    }

    /**
     * Process OSRM API result
     * @private
     */
    _processRouteResult(data, optimize) {
        // Determine which property to access based on service type
        const route = optimize ? data.trips[0] : data.routes[0];
        const waypoints = data.waypoints;

        return {
            distance: route.distance, // meters
            duration: route.duration, // seconds
            distanceKm: (route.distance / 1000).toFixed(2),
            durationHours: (route.duration / 3600).toFixed(2),
            geometry: route.geometry, // GeoJSON LineString
            waypoints: waypoints.map(wp => ({
                location: wp.location, // [lng, lat]
                name: wp.name,
                waypointIndex: wp.waypoint_index, // Useful for optimized order
            })),
            steps: route.legs.flatMap(leg => leg.steps),
            isOptimized: optimize,
            source: 'osrm',
        };
    }

    /**
     * Fallback: Straight-line Haversine distance
     * @private
     */
    _calculateFallbackRoute(coordinates) {
        let totalDistance = 0;

        // Calculate sum of distances between sequential points
        for (let i = 0; i < coordinates.length - 1; i++) {
            const p1 = coordinates[i];
            const p2 = coordinates[i + 1];
            totalDistance += this._getDistanceFromLatLonInKm(p1.lat, p1.lng, p2.lat, p2.lng);
        }

        // Estimate duration: 60km/h average speed
        const durationHours = totalDistance / 60;

        return {
            distance: totalDistance * 1000,
            duration: durationHours * 3600,
            distanceKm: totalDistance.toFixed(2),
            durationHours: durationHours.toFixed(2),
            geometry: null,
            isFallback: true,
            source: 'calculation',
        };
    }

    // Haversine formula
    _getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this._deg2rad(lat2 - lat1);
        const dLon = this._deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    _deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
}

module.exports = new OSRMService();
