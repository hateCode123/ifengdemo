const Timers = require('./utils/timers');
const config = require('../configs');
const {tracer} = require('../common/jaeger');

exports.match = (type, cache, edit, ctrlPath, handler) => {
    if (config.default.statistics) {
        
        return async(ctx, next) => {
     
            ctx.routerTimeEnd = Timers.timeEnd(ctx.routerTimeStart);
            ctx.urlinfo = { type, cache, edit, ctrlPath };
            ctx.span.log({'event': 'route_matching', 'route_matching_time': ctx.routerTimeEnd});
            ctx.spanrpc = tracer._tracer.startSpan('rpc', { childOf: ctx.span });
            return await handler(ctx, next);
        };
    } else {
        return async(ctx, next) => {
            ctx.urlinfo = { type, cache, edit, ctrlPath };

            return await handler(ctx, next);
        };
    }
};
