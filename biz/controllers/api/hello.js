const redis = require('../../common/redis');
const logger = require('../../common/logger');
const moment = require('moment');

exports.hello = {
    path: '/api/hello',
    method: 'get|post',
    handler: async ctx => {
        // return ctx.error(502);

        ctx.body = '<h1>test_content is running</h1>';
    },
};
