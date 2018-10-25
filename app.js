/**
 * 后台服务入口
 */
const logger = require('./biz/common/logger');
const { tracer, jaegerInit } = require('./biz/common/jaeger');
const { Tags } = require('opentracing');
const config = require('./biz/configs');
const Koa = require('koa');
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
const os = require('os');
const hostname = os.hostname();
const pid = process.pid;
const gracefulShutdown = require('./biz/common/shutdown');

// 普罗米修斯
const { promInit } = require('./biz/common/prom');
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
    app.use(koaStatic(path.join(__dirname, './static'), { index: 'index.html' }));

    setTimeout(() => {
        io.sockets.emit('reload');
    }, 1000);

    chokidar.watch('devtmp', {}).on('change', (event, path) => {
        // console.log(event, '----', path);
        io.sockets.emit('reload');
    });
} else if (env === 'pre_development') {
    // 静态资源设置
    app.use(koaStatic(path.join(__dirname, `./${config.default.viewsdir}`), { index: 'index.html' }));
    views = require('koa-views');
} else {
    views = require('koa-views');
}

// 捕获未知错误
onerror(app);

// 对ctx对象进行扩展，添加 html & json & jsonp 等方法
const webapi = require('./biz/common/middlewares/koa-webapi');

webapi(app);

// 普鲁米修斯初始化
promInit(app);

app.use(async (ctx, next) => {
    if (ctx.url === '/heartbeat') {
        return (ctx.body = { success: true });
    }
    let sourcePath = ctx.url;

    // 初始化
    ctx.start = process.uptime() * 1000;
    ctx.uuid = uuid().replace(/-/g, '');
    ctx.schemaTime = 0;
    ctx.schemaTimeList = [];
    ctx.parseTime = 0;
    ctx.parseTimeList = [];
    ctx.requestTime = 0;
    ctx.rpcCount = 0;
    ctx.rpcTime = 0;
    ctx.routerTime = 0;
    ctx.routerTimeStart = process.hrtime();
    ctx.rpcTimeList = [[], []];
    ctx.randerTime = 0;
    ctx.errorCount = 0;
    ctx.rpcList = [];
    ctx.kvList = [];

    ctx.set('shankTracerId', ctx.uuid);
    ctx.set('hostname', hostname);
    ctx.set('pid', pid);

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
            ctx.span.setTag('error', true);
            ctx.span.log({ event: 'error', 'error.object': err, message: err.message, stack: err.stack });
        }
    }
    ctx.time = process.uptime() * 1000 - ctx.start;

    ctx.rpcCount = ctx.rpcTimeList[0].length + ctx.rpcTimeList[1].length;

    for (const i of ctx.rpcTimeList[0]) {
        ctx.rpcTime += parseFloat(i);
    }
    ctx.rpcTime += _.max(ctx.rpcTimeList[1]) || 0;

    for (const i of ctx.parseTimeList) {
        ctx.parseTime += parseFloat(i);
    }
    ctx.parseTime = ctx.parseTime.toFixed(3);

    for (const i of ctx.schemaTimeList) {
        ctx.schemaTime += parseFloat(i);
    }
    // logger.info(
    //     `--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ctx.time}ms - ${ctx.time2}ms - router: ${
    //         ctx.routerTime
    //     }ms - rpc:[${ctx.rpcCount}, ${ctx.rpcTime}ms] - getDoc: ${ctx.rpcTimeList[0][0]}ms - getAll: ${
    //         ctx.rpcTimeList[1][0]
    //     }ms - schemaTime: ${ctx.schemaTime}ms - JSON.parse: [${ctx.parseTimeList.length}, ${
    //         ctx.parseTime
    //     }ms] - domain: ${ctx.header.domain || ''}`,
    // );
    // console.info(ctx.headers);
    logger.info({
        kpi: {
            sourcePath,
            method: ctx.method,
            path: ctx.originalUrl,
            status: ctx.status,
            time: ctx.time,
            router: Number(ctx.routerTime),
            rpcTime: ctx.rpcTime,
            rpcCount: ctx.rpcCount,
            getDoc: ctx.rpcTimeList[0][0],
            getAll: ctx.rpcTimeList[1][0],
            parseTime: Number(ctx.parseTime),
            schemaTime: Number(ctx.schemaTime),
            parseCount: ctx.parseTimeList.length,
            randerTime: ctx.randerTime,
            shankTracerId: ctx.uuid,
            errorCount: ctx.errorCount,
            serverTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            domain: ctx.header.domain || 'nodomain',
            devicetype: ctx.headers['devicetype'] || 'nodevicetype',
        },
    });
});

// jaeger初始化
jaegerInit(app);

// 对post请求参数进行解析，支持application/json 和 application/x-www-form-urlencoded 两种类型
app.use(bodyParser());

// 美化json格式输出
app.use(json());

// 模板引擎设置
app.use(views(path.join(__dirname, `./${config.default.viewsdir}`), { map: { html: 'ejs' } }));

// 路由重写，根据项目需要在rewrite中添加重写规则
app.use(rewrite);

// // 防雪崩
// app.use(prevent);

// 加载路由
app.use(routers.routes(), routers.allowedMethods());

const cleanup = () => {
    return new Promise(resolve => {
        console.log('... in cleanup');
        setTimeout(() => {
            console.log('... cleanup finished');
            resolve();
        }, 1000);
    });
};

// this enables the graceful shutdown with advanced options
gracefulShutdown(server, {
    signals: 'SIGINT SIGTERM',
    timeout: 30000,
    development: false,
    onShutdown: cleanup,
    finally: () => {
        console.log('Server gracefulls shutted down.....');
    },
});
