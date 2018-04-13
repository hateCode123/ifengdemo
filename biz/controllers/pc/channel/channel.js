const redis = require('../../../common/redis');
const logger = require('../../../common/logger');

exports.channel = {
    path: '/channel',
    method: 'get',
    handler: async(ctx) => {
        await ctx.html('channel', { msg: 'HELLO WORLD' });
    },
};
