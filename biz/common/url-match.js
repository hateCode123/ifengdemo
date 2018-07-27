const Timers = require('./utils/timers');
const config = require('../configs');
const { tracer } = require('../common/jaeger');

exports.match = (type, cache, edit, preview, low, handler, cdncache, path) => {
    return async (ctx, next) => {
        if (config.default.statistics) {
            ctx.routerTime = Timers.timeEnd(ctx.routerTimeStart);
        }
        if (config.default.statisticsJaeger) {
            ctx.span.log({ event: 'route_matching', route_matching_time: ctx.routerTime });
            ctx.spanrouter.finish();
            ctx.spanrpc = tracer.startSpan('ctrl', { childOf: ctx.span });
        }
        ctx.urlinfo = { type, cache, edit, preview, low, cdncache, path };

        return await handler(ctx, next);
    };
};
