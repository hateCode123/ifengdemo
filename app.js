/**
 * 后台服务入口
 */
const logger = require('./biz/common/logger');
const { tracer } = require('./biz/common/jaeger');
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
// const prevent = require('./biz/common/prevent');
const _ = require('lodash');
// 普罗米修斯
const { c, p_request, p_rpc, p_parse, p_rander, router } = require('./biz/common/prom');
const env = process.env.NODE_ENV || 'development';

// 创建koa实例
const app = new Koa();
let views = null;

// const server = http.Server(app.callback());

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
    app.use(koaStatic(path.join(__dirname, `./static`), { index: 'index.html' }));

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

// 对post请求参数进行解析，支持application/json 和 application/x-www-form-urlencoded 两种类型
app.use(bodyParser());

// 美化json格式输出
app.use(json());

webapi(app);

// 模板引擎设置
app.use(views(path.join(__dirname, `./${config.default.viewsdir}`), { map: { html: 'ejs' } }));

// 静态资源设置
app.use(koaStatic(path.join(__dirname, `./${config.default.viewsdir}`), { index: 'index.html' }));

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
                        url: ctx.originalUrl.replace(/\?.*/, ''),
                        method: ctx.method,
                        status_code: ctx.status,
                    },
                    ctx.requestTime,
                );

                // p_rpc.observe(parseInt(ctx.rpc_time));
                p_parse.observe(parseInt(ctx.parse_time));
            }
        } catch (error) {
            console.log(error);
        }
    });
}

app.use(async (ctx, next) => {
    if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('finance.ifeng.com') > -1) {
        ctx.url = `/pc/finance` + ctx.url;
        ctx.originalUrl = `/pc/finance` + ctx.originalUrl;
    }
    await next();
});

// app.use(prevent);

// 本地统计 开关
if (config.default.statistics) {
    // 监控请求响应时间，catch未知的错误
    app.use(async (ctx, next) => {
        // 请求进入
        logger.info(`<-- ${ctx.method} ${ctx.originalUrl}`);
        const start = new Date();
        ctx.routerTimeStart = process.hrtime();
        ctx.rpcTimeList = [[], []];
        ctx.parseTime = [];
        try {
            await next();
        } catch (err) {
            logger.error(err);
            if (ctx.method === 'POST') {
                logger.error(ctx.request.body);
            }
            const isAjax = ctx.headers['x-requested-with'] === 'XMLHttpRequest';

            if (isAjax) {
                ctx.json(1, err.message);
            } else {
                ctx.status = 502;
                // throw err;
            }

            ctx.span || ctx.span.setTag(opentracing.Tags.ERROR, true);
            ctx.span || ctx.span.log({ event: 'error', 'error.object': err, message: err.message, stack: err.stack });
        }
        const ms = new Date() - start;
        ctx.requestTime = ms;

        if (!ctx.routerTimeEnd) {
            ctx.routerTimeEnd = Timers.timeEnd(ctx.routerTimeStart);
        }

        let rpcTime = 0;
        const rpcCount = ctx.rpcTimeList[0].length + ctx.rpcTimeList[1].length;

        for (const i of ctx.rpcTimeList[0]) {
            rpcTime += parseFloat(i);
        }
        rpcTime += _.max(ctx.rpcTimeList[1]) || 0;

        let parseTime = 0;

        for (const i of ctx.parseTime) {
            parseTime += parseFloat(i);
        }
        parseTime = parseTime.toFixed(3);
        ctx.rpc_time = rpcTime;
        ctx.parse_time = parseTime;
        logger.info(
            `--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms - router: ${
                ctx.routerTimeEnd
            }ms - rpc:[${rpcCount}, ${rpcTime}ms] - JSON.parse: [${
                ctx.parseTime.length
            }, ${parseTime}ms] - domain: ${ctx.header.domain || ''}`,
        );
    });
} else {
    // 监控请求响应时间，catch未知的错误
    app.use(async (ctx, next) => {
        logger.debug(`<-- ${ctx.method} ${ctx.originalUrl}`);
        const start = new Date();

        try {
            await next();
        } catch (err) {
            logger.error(`<-- ${ctx.method} ${ctx.originalUrl}`);
            logger.error(err);
            if (ctx.method === 'POST') {
                logger.error(ctx.request.body);
            }
            const isAjax = ctx.headers['x-requested-with'] === 'XMLHttpRequest';

            if (isAjax) {
                ctx.json(1, err.message);
            } else {
                ctx.status = 502;
                // throw err;
            }
        }
        const ms = new Date() - start;
        ctx.requestTime = ms;

        logger.debug(`--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
    });
}

// 路由重写，根据项目需要在rewrite中添加重写规则
// app.use(rewrite);

// 加载路由
app.use(routers.routes(), routers.allowedMethods());
