const redis = require('../../../common/redis');
const logger = require('../../../common/logger');

const auth = async(ctx, next) => {
    console.log(`middleware is passing :${new Date()}`);
    await next();
};

exports.main = {
    path: '/api/main',
    method: 'get',
    middleware: [auth, auth, auth],
    handler: async ctx => {
        await ctx.html('main', { title: 'main' });
    },
};
