const Timers = require('./utils/timers');
const config = require('../configs');

exports.match = (type, cache, edit, ctrlPath, handler) => {
    if (config.default.statistics) {
        return async(ctx, next) => {
            ctx.routerTimeEnd = Timers.timeEnd(ctx.routerTimeStart);
            ctx.urlinfo = { type, cache, edit, ctrlPath };

            return await handler(ctx, next);
        };
    } else {
        return async(ctx, next) => {
            ctx.urlinfo = { type, cache, edit, ctrlPath };

            return await handler(ctx, next);
        };
    }
};
