const redis = require('../common/redis');
const logger = require('../common/logger');

exports.hello = {
    path: '/',
    method: 'get|post',
    handler: async(ctx) => {
        ctx.body = `<h1>test_content is running</h1>`;
    }
};