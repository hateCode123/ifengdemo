const redis = require('../../common/redis');
const logger = require('../../common/logger');

exports.main = {
    path: '/main',
    method: 'get',
    middleware: [auth, auth, auth],
    handler: async (ctx) => {
        await ctx.html('main', {
            title: 'main',
        })
    }
};

async function auth(ctx, next) {
    console.log('middleware is passing :' + new Date());
    await next();
};
