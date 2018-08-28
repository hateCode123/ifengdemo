const prom = require('prom-client');
const Router = require('koa-router');
const config = require('../configs');
const logger = require('./logger');
const router = new Router();
const register = prom.register;
const Histogram = prom.Histogram;
const Counter = prom.Counter;
const Gauge = prom.Gauge;
const pidusage = require('pidusage');
const pid = process.pid;
const os = require('os');
const hostname = os.hostname();
const buckets = [
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
];

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
    help: '统计响应整体时间',
    labelNames: ['url', 'method', 'status_code', 'hostname'],
    buckets,
});

// 初始化rpc请求时间统计
const p_rpc = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_rpc`,
    help: '统计rpc时间',
    labelNames: ['rpc_func', 'url', 'hostname'],
    buckets,
});

const p_parse = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_parse`,
    help: '统计rpc时间',
    labelNames: ['url', 'method', 'status_code', 'hostname'],
    buckets: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 4, 5, 6, 7, 8, 10],
});

const p_rander = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_rander`,
    help: '页面渲染时间',
    labelNames: ['url', 'method', 'status_code', 'hostname'],
    buckets: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10],
});

const p_error = new Histogram({
    name: `${config.default.namespace}_${config.default.appname}_error`,
    help: '服务端错误数量',
    labelNames: ['url', 'method', 'status_code', 'error_type', 'hostname'],
    buckets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
});

// 初始化http请求计数器
const c = new Counter({
    name: `${config.default.namespace}_${config.default.appname}_counter`,
    help: 'Example of a counter',
    labelNames: ['code', 'hostname'],
});

const p_memory = new Gauge({
    name: `${config.default.namespace}_${config.default.appname}_memory`,
    help: '内存占用',
    labelNames: ['type', 'hostname'],
});

const p_pidusage = new Gauge({
    name: `${config.default.namespace}_${config.default.appname}_pidusage`,
    help: 'CPU使用，percentage (from 0 to 100*vcore)',
    labelNames: ['type', 'hostname'],
});
const promInit = app => {
    // prometheus 开关
    if (config.default.statisticsProm) {
        app.use(router.routes(), router.allowedMethods());

        app.use(async (ctx, next) => {
            ctx.p_rpc = p_rpc;
            await next();
            try {
                if (ctx.url === '/heartbeat') {
                    return;
                }
                c.inc({ code: ctx.status });
                const labelObj = {
                    url: ctx.urlinfo && ctx.urlinfo.path ? ctx.urlinfo.path : '未知路由',
                    method: ctx.method,
                    status_code: ctx.status,
                    hostname,
                };

                p_request.observe(labelObj, ctx.time);
                p_rander.observe(labelObj, ctx.randerTime);
                p_error.observe(labelObj, ctx.errorCount);
                p_parse.observe(labelObj, parseInt(ctx.parseTime));
            } catch (error) {
                logger.error(error);
            }
        });
    }
};

setInterval(() => {
    const pm = process.memoryUsage();

    // rss：总内存占用
    p_memory.set({ type: 'rss', hostname }, parseInt(pm.rss));

    // heapTotal： 堆占用的内存，包括用到的和没用到的。
    p_memory.set({ type: 'heapTotal', hostname }, parseInt(pm.heapTotal));

    // heapUsed：用到的堆的部分
    p_memory.set({ type: 'heapUsed', hostname }, parseInt(pm.heapUsed));

    // external：V8 引擎内部的 C++ 对象占用的内存。
    p_memory.set({ type: 'external', hostname }, parseInt(pm.external));

    pidusage(pid, (err, stats) => {
        if (!err) {
            p_pidusage.set({ type: 'cpu', hostname }, stats.cpu);
        }
    });
}, 30000);

// 导出
module.exports = {
    c,
    p_request,
    p_rpc,
    p_parse,
    p_rander,
    promInit,
};
