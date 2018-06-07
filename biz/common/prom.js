const prom = require('prom-client');
const Router = require('koa-router');
const config = require('../configs');
const router = new Router();
const register = prom.register;
const Histogram = prom.Histogram;
const Counter = prom.Counter;

// 对Prometheus监控系统暴露接口，该路由在 app.js中进行挂载
router.get('/metrics', (ctx, next) => {
    // ctx.router available
    // res.set('Content-Type', register.contentType);
    ctx.type = register.contentType;
    ctx.body = register.metrics();
});

// 自定义监控接口
// router.get('/metrics/counter', (ctx, next) => {
//     // res.set('Content-Type', register.contentType);
//     ctx.type = register.contentType;
//     ctx.body = register.getSingleMetricAsString('test_counter');
// });

// 初始化http请求时间统计
const h = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_requests`,
    help: 'Example of a histogram',
    labelNames: ['url','method','request_time','status_code','rpc_time','parse_time','error'],
    // buckets: [1, 5, 15, 50, 100, 500],
});

// 初始化http请求计数器
const c = new Counter({
    name: `${config.default.namespace}_${config.default.appname}_counter`,
    help: 'Example of a counter',
    labelNames: ['counter'],
});

// 导出
module.exports = {
    c,
    h,
    router,
};
