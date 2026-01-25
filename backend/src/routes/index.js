/**
 * Heritage Pulse - Routes Index
 * ==============================
 * Centralized route exports.
 */

const healthRoutes = require('./health.routes');
const apiRoutes = require('./api.routes');
const heritageRoutes = require('./heritage.routes');
const chatRoutes = require('./chat.routes');

module.exports = {
    healthRoutes,
    apiRoutes,
    heritageRoutes,
    chatRoutes,
};
