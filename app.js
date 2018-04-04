const Koa = require('koa');
const http = require('http');
const path = require('path');
const app = new Koa();
const onerror = require('koa-onerror');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const logger = require('./biz/common/logger');
const config = require('./biz/configs');
const static = require('koa-static');

// handle error
onerror(app);

// --webapi response; html & json & jsonp
const webapi = require('./biz/common/middlewares/koa-webapi');
webapi(app);

app.use(bodyParser());
app.use(json());

// 加载模板引擎
app.use(views(path.join(__dirname, `./${config.default.viewsdir}`), {
    map: {html: 'ejs'}
}));

// --静态资源
app.use(static(path.join(__dirname, `./${config.default.viewsdir}`), {index: 'index.html'}));

// logger access logger
app.use(async (ctx, next) => {
    logger.debug(`<-- ${ctx.method} ${ctx.originalUrl}`);
    let start = new Date();
    try {
        await next();
    } catch (err) {
        logger.error(`<-- ${ctx.method} ${ctx.originalUrl}`);
        logger.error(err);
        if (ctx.method == 'POST') {
            logger.error(ctx.request.body);
        }
        let isAjax = ctx.headers['x-requested-with'] == 'XMLHttpRequest';
        if(isAjax){
            ctx.json(1, err.message);
        }else{
            throw err;
        }
    }
    let ms = new Date() - start;
    logger.debug(`--> ${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
});

// routers
let routers = require('./biz/routers');
app.use(routers.routes(), routers.allowedMethods());

// Create HTTP server.
let server = http.createServer(app.callback());
// Listen on provided port, on all network interfaces.

module.exports = app.listen(config.default.port || 3000, () => {
    logger.info(`app is listening ${config.default.port || 3000}`);
});