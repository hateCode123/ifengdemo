/**
 * 后台服务入口
 */
const logger = require('./biz/common/logger');
const { tracer } = require('./biz/common/jaeger');
const { Tags } = require('opentracing');
const config = require('./biz/configs');
const Koa = require('koa');
const http = require('http');
const path = require('path');
const onerror = require('koa-onerror');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const Timers = require('./biz/common/utils/timers');
const koaStatic = require('koa-static');
const routers = require('./biz/routers');
const rewrite = require('./biz/rewrite');
const prevent = require('./biz/common/prevent');
const _ = require('lodash');
const uuid = require('uuid/v1');
const moment = require('moment');

// 普罗米修斯
const { c, p_request, p_rpc, p_parse, p_rander, router } = require('./biz/common/prom');
const env = process.env.NODE_ENV || 'development';

// 创建koa实例
const app = new Koa();
let views = null;

// 导出koa 实例，方便单元测试
const server = app.listen(config.default.port || 3000, () => {
    logger.info(`app is listening ${config.default.port || 3000}`);
});

module.exports = server;

if (env === 'development') {
    const socket = require('socket.io');
    const io = socket(server);
    const chokidar = require('chokidar');

    views = require('./biz/common/middlewares/koa-views');

    // 静态资源设置
    app.use(koaStatic(path.join(__dirname, 'node_modules/socket.io-client/dist')));

    // 静态资源设置
    app.use(koaStatic(path.join(__dirname, `./${config.default.viewsdir}`), { index: 'index.html' }));

    setTimeout(() => {
        io.sockets.emit('reload');
    }, 1000);

    chokidar.watch('devtmp', {}).on('change', (event, path) => {
        // console.log(event, '----', path);
        io.sockets.emit('reload');
    });
} else {
    views = require('koa-views');
}

// 捕获未知错误
onerror(app);

// 对ctx对象进行扩展，添加 html & json & jsonp 等方法
const webapi = require('./biz/common/middlewares/koa-webapi');

webapi(app);

app.use(async (ctx, next) => {
    if (ctx.url === '/heartbeat') {
        return (ctx.body = { success: true });
    }
    // 初始化
    ctx.start = new Date();
    ctx.start2 = process.uptime() * 1000;
    ctx.uuid = uuid();
    ctx.schemaTime = 0;
    ctx.parseTime = 0;
    ctx.parseTimeList = [];
    ctx.requestTime = 0;
    ctx.rpcCount = 0;
    ctx.rpcTime = 0;
    ctx.routerTimeStart = process.hrtime();
    ctx.rpcTimeList = [[], []];

    ctx.set('shankTracerId', ctx.uuid);

    await next();
});

// 对post请求参数进行解析，支持application/json 和 application/x-www-form-urlencoded 两种类型
app.use(bodyParser());

// // 美化json格式输出
// app.use(json());

// 模板引擎设置
app.use(views(path.join(__dirname, `./${config.default.viewsdir}`), { map: { html: 'ejs' } }));

// jaeger 开关
if (config.default.statisticsJaeger) {
    app.use(async (ctx, next) => {
        // 监控锚点
        const span = tracer._tracer.startSpan('http_request');
        ctx.span = span;
        await next();
        ctx.span.finish();
    });
}

// prometheus 开关
if (config.default.statisticsProm) {
    app.use(router.routes(), router.allowedMethods());
    app.use(async (ctx, next) => {
        ctx.p_rpc = p_rpc;
        await next();
        try {
            if (/(^\/pc)|(^\/mobile)|(^\/api)/.test(ctx.originalUrl)) {
                c.inc({ code: 200 });
                p_request.observe(
                    {
                        url: ctx.urlinfo && ctx.urlinfo.path ? ctx.urlinfo.path : '未知路由',
                        method: ctx.method,
                        status_code: ctx.status,
                    },
                    ctx.time,
                );

                // p_rpc.observe(parseInt(ctx.rpcTime));
                p_parse.observe(parseInt(ctx.parseTime));
            }
        } catch (error) {
            logger.error(error);
        }
    });
}

// 路由重写，根据项目需要在rewrite中添加重写规则
app.use(rewrite);

// 本地统计 开关
if (config.default.statistics) {
    // 监控请求响应时间，catch未知的错误
    app.use(async (ctx, next) => {
        // 请求进入
        // logger.info(`<-- ${ctx.method} ${ctx.originalUrl}`);

        try {
            await next();
        } catch (err) {
            logger.error(err);

            switch (ctx.type) {
                case 'json':
                    ctx.json(1, err.message);
                    break;
                case 'jsonp':
                    ctx.jsonp(1, err.message);
                    break;
                case 'html':
                case 'xml':
                case 'text':
                default:
                    ctx.status = 502;
            }

            if (ctx.span) {
                ctx.span.setTag(Tags.ERROR, true);
                ctx.span.log({ event: 'error', 'error.object': err, message: err.message, stack: err.stack });
            }
        }
        ctx.time = new Date() - ctx.start;
        ctx.time2 = process.uptime() * 1000 - ctx.start2;

        ctx.rpcCount = ctx.rpcTimeList[0].length + ctx.rpcTimeList[1].length;

        for (const i of ctx.rpcTimeList[0]) {
            ctx.rpcTime += parseFloat(i);
        }
        ctx.rpcTime += _.max(ctx.rpcTimeList[1]) || 0;

        for (const i of ctx.parseTimeList) {
            ctx.parseTime += parseFloat(i);
        }
        ctx.parseTime = ctx.parseTime.toFixed(3);

        // logger.info(
        //     `--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ctx.time}ms - ${ctx.time2}ms - router: ${
        //         ctx.routerTime
        //     }ms - rpc:[${ctx.rpcCount}, ${ctx.rpcTime}ms] - getAll: ${
        //         ctx.rpcTimeList[1][0]
        //     }ms - schemaTime: ${ctx.schemaTime}ms - JSON.parse: [${ctx.parseTimeList.length}, ${
        //         ctx.parseTime
        //     }ms] - domain: ${ctx.header.domain || ''}`,
        // );

        logger.info({
            kpi: {
                path: ctx.originalUrl,
                status: ctx.status,
                time: ctx.time,
                time2: ctx.time2,
                router: Number(ctx.routerTime),
                rpcTime: ctx.rpcTime,
                rpcCount: ctx.rpcCount,
                getAll: ctx.rpcTimeList[1][0],
                parseTime: Number(ctx.parseTime),
                schemaTime: Number(ctx.schemaTime),
                parseCount: ctx.parseTimeList.length,
                domain: ctx.header.domain,
                shankTracerId: ctx.uuid,
                serverTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
        });
    });
} else {
    // 监控请求响应时间，catch未知的错误
    app.use(async (ctx, next) => {
        logger.info(`<-- ${ctx.method} ${ctx.originalUrl}`);
        const start = process.uptime() * 1000;

        try {
            await next();
        } catch (err) {
            logger.error(`<-- ${ctx.method} ${ctx.originalUrl}`);
            logger.error(err);
            const isAjax = ctx.headers['x-requested-with'] === 'XMLHttpRequest';

            if (isAjax) {
                ctx.json(1, err.message);
            } else {
                ctx.status = 502;
                // throw err;
            }
        }
        const ms = process.uptime() * 1000 - start;

        ctx.requestTime = ms;

        logger.debug(`--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
    });
}
// app.use(prevent);

// 加载路由
app.use(routers.routes(), routers.allowedMethods());
