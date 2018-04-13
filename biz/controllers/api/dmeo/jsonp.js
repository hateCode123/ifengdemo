const redis = require('../../../common/redis');
const logger = require('../../../common/logger');

exports.jsonp = {
    path: '/api/jsonp',
    method: 'get',
    handler: async ctx => {
        ctx.jsonp({ name: 'ifeng', desc: 'The weather today is good！' });
    },
};
