/**
 * 后台服务入口
 */
const Koa = require('koa');
const http = require('http');
const path = require('path');
const onerror = require('koa-onerror');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('./biz/common/logger');
const Timers = require('./biz/common/utils/timers');
const config = require('./biz/configs');
const koaStatic = require('koa-static');
const routers = require('./biz/routers');
const rewrite = require('./biz/rewrite');
const _ = require('lodash');

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

// 模板引擎设置
app.use(views(path.join(__dirname, `./${config.default.viewsdir}`), { map: { html: 'ejs' } }));

// 静态资源设置
app.use(koaStatic(path.join(__dirname, `./${config.default.viewsdir}`), { index: 'index.html' }));

if (config.default.statistics) {
    // 监控请求响应时间，catch未知的错误
    app.use(async (ctx, next) => {
        logger.debug(`<-- ${ctx.method} ${ctx.originalUrl}`);
        const start = new Date();

        ctx.routerTimeStart = process.hrtime();
        ctx.rpcTimeList = [[], []];
        ctx.parseTime = [];
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
                throw err;
            }
        }
        const ms = new Date() - start;

        if (!ctx.routerTimeEnd) {
            ctx.routerTimeEnd = Timers.timeEnd(ctx.routerTimeStart);
        }

        let rpcTime = 0;
        let rpcCount = ctx.rpcTimeList[0].length + ctx.rpcTimeList[1].length;

        for (let i of ctx.rpcTimeList[0]) {
            rpcTime += parseFloat(i);
        }
        rpcTime += _.max(ctx.rpcTimeList[1]) || 0;
        rpcTime = rpcTime.toFixed(3);

        let parseTime = 0;

        for (let i of ctx.parseTime) {
            parseTime += parseFloat(i);
        }
        parseTime = parseTime.toFixed(3);

        // logger.debug(`--> time router - ${ctx.routerTimeEnd}ms`);
        // logger.debug(`--> time rpc - ${rpcTime}ms`);
        // logger.debug(`--> time JSON.parse - ${ctx.parseTime}ms`);
        logger.debug(
            `--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms - router: ${
                ctx.routerTimeEnd
            }ms - rpc:[${rpcCount}, ${rpcTime}ms] - JSON.parse: [${ctx.parseTime.length}, ${parseTime}ms]`,
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
                throw err;
            }
        }
        const ms = new Date() - start;

        logger.debug(`--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
    });
}

// 路由重写，根据项目需要在rewrite中添加重写规则
app.use(rewrite);

// 加载路由
app.use(routers.routes(), routers.allowedMethods());
