const prom = require('prom-client');
const Router = require('koa-router');
const config = require('../configs')
const router = new Router();
const register = prom.register;
const Histogram = prom.Histogram;

router.get('/metrics', (ctx, next) => {
    // ctx.router available
    // res.set('Content-Type', register.contentType);
    ctx.type = register.contentType;
    ctx.body = register.metrics();
});

// router.get('/metrics/counter', (ctx, next) => {
//     // res.set('Content-Type', register.contentType);
//     ctx.type = register.contentType;
//     ctx.body = register.getSingleMetricAsString('test_counter');
// });

const h = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_requests`,
    help: 'Example of a histogram',
    labelNames: ['code'],
    buckets: [1, 5, 15, 50, 100, 500],
});

const Counter = prom.Counter;
const c = new Counter({
    name: `${config.default.namespace}_${config.default.appname}_counter`,
    help: 'Example of a counter',
    labelNames: ['counter'],
});


module.exports = {
    c,
    h
}
