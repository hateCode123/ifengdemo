const prom = require('prom-client');
const Router = require('koa-router');
const config = require('../configs');
const router = new Router();
const register = prom.register;
const Histogram = prom.Histogram;
const Counter = prom.Counter;
const Gauge = prom.Gauge;

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
const p_request = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_requests`,
    help: '统计相应整体时间',
    labelNames: ['url', 'method', 'request_time', 'status_code', 'rpc_time', 'parse_time', 'error'],
    buckets: [
        2,
        4,
        6,
        8,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200,
        500,
        1000,
    ],
});

// 初始化http请求时间统计
const p_rpc = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_rpc`,
    help: '统计rpc时间',
    labelNames: ['rpc_func', 'url'],
});

const p_parse = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_parse`,
    help: '统计rpc时间',
    labelNames: ['parse_time'],
});

const p_rander = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_rander`,
    help: '页面渲染时间',
});

// 初始化http请求计数器
const c = new Counter({
    name: `${config.default.namespace}_${config.default.appname}_counter`,
    help: 'Example of a counter',
    labelNames: ['counter'],
});

const p_memory = new Gauge({
    name: `${config.default.namespace}_${config.default.appname}_memory`,
    help: '内存占用',
    labelNames: ['type'],
});

setInterval(() => {
    let pm = process.memoryUsage();

    // { rss: 130772992,  // 总内存占用
    //     heapTotal: 121925632, // 堆占用的内存，包括用到的和没用到的。
    //     heapUsed: 106210400, // 用到的堆的部分
    //     external: 2984477 } // V8 引擎内部的 C++ 对象占用的内存。

    p_memory.set({ type: 'rss' }, parseInt(pm.rss));
    p_memory.set({ type: 'heapTotal' }, parseInt(pm.heapTotal));
    p_memory.set({ type: 'heapUsed' }, parseInt(pm.heapUsed));
    p_memory.set({ type: 'external' }, parseInt(pm.external));
}, 10000);

// 导出
module.exports = {
    c,
    p_request,
    p_rpc,
    p_parse,
    p_rander,
    router,
};
