const redis = require('../../common/redis');
const logger = require('../../common/logger');
const { tracer } = require('../../common/jaeger');

exports.heartbeat = {
    path: '/api/heartbeat',
    method: 'get',
    handler: async ctx => {
        ctx.body = { success: true };
    },
};
