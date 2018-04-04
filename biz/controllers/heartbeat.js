const redis = require('../common/redis');
const logger = require('../common/logger');

exports.heartbeat = {
    path: '/heartbeat',
    method: 'get',
    handler: async (ctx) => {
        ctx.body = {'success': true};
    }
};