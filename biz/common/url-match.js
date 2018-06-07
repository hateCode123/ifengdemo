const Timers = require('./utils/timers');
const config = require('../configs');
const { tracer } = require('../common/jaeger');

exports.match = (type, cache, edit, ctrlPath, handler, cdncache) => {
    return async (ctx, next) => {
        if (config.default.statistics) {
            ctx.routerTimeEnd = Timers.timeEnd(ctx.routerTimeStart);
        }
        if (config.default.statisticsJaeger) {
            ctx.span.log({ event: 'route_matching', route_matching_time: ctx.routerTimeEnd });
            ctx.spanrpc = tracer._tracer.startSpan('rpc', { childOf: ctx.span });
        }
        ctx.urlinfo = { type, cache, edit, ctrlPath, cdncache};
        return await handler(ctx, next);
    };
};
