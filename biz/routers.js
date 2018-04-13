/**
 * 路由加载器
 */

const router = require('koa-router')();
const glob = require('glob');
const _ = require('lodash');
const logger = require('./common/logger');
const config = require('./configs');
const { validate } = require('./common/validate');
const redis = require('./common/redis');
const urlCache = require('./common/url-cache');
const { match } = require('./common/url-match');

const middleware = (ctrlObj, i, path, edit, ctrlPath) => {
    // http请求类型，暂时只支持get和post
    const method = ctrlObj[i].method || 'get|post';

    // 业务方法，主要处理所有业务 (Function)
    const handler = ctrlObj[i].handler;

    // 中间件列表 (Function | Array )
    const middleware = ctrlObj[i].middleware;

    // joi 对象 (Object)
    const schema = ctrlObj[i].schema;

    // 类型 (Sting)
    const type = ctrlObj[i].type;

    // 缓存时间 (Number)，单位s
    const cache = ctrlObj[i].cache || 0;
    const meddlewareList = [];

    if (_.isObject(schema)) {
        // 添加joi验证中间件
        meddlewareList.push(validate(schema, type));
    }
    if (config.default.cacheURL && cache > 0) {
        if (!type) {
            throw new Error(`router error;${path} Failed to load \nYou must set the type before you can use the cache`);
        }

        // 添加缓存中间件
        meddlewareList.push(urlCache(cache, type, { engine: redis, prefix: 'app' }));
    }
    if (_.isFunction(middleware)) {
        // 添加自定义中间件，处理单个中间件，传入类型 Function
        meddlewareList.push(middleware);
    }
    if (_.isArray(middleware)) {
        for (const item of middleware) {
            if (_.isFunction(item)) {
                // 添加自定义中间件，处理多个中间件传入，传入类型 [ Function, Function...]
                meddlewareList.push(item);
            }
        }
    }
    const methodArr = method.toLowerCase().split('|');

    for (const j in methodArr) {
        const methodItem = methodArr[j].trim();

        if (!methodItem) {
            continue;
        }
        if (_.isFunction(handler)) {
            // 将路由挂载
            router[methodItem](path, ...meddlewareList, match(type, cache, edit, ctrlPath, handler));
            logger.debug(`${methodItem}\t:${path}`);
        }
    }
};

const routerLoad = ctrlPath => {
    glob.sync(`${__dirname}/controllers/${ctrlPath}/**/*.js`).forEach(file => {
        const urlPath = file.replace(__dirname, '');

        if (config.default.blacklist.indexOf(urlPath) > -1) {
            // 处理路由黑名单，在黑名单中的路由不会被加载
            return;
        }

        const ctrlObj = require(file);

        for (const i in ctrlObj) {
            if (!ctrlObj[i].path) {
                continue;
            }

            // 是否需要编辑 (Boolean)
            const edit = ctrlObj[i].edit;

            // url路径 (String)
            const path = config.default.apiPrefix + ctrlObj[i].path;

            middleware(ctrlObj, i, path, false, ctrlPath);
            if (edit) {
                // 添加页面编辑中间件
                middleware(ctrlObj, i, `${path}/edit`, edit, ctrlPath);
            }
        }
    });
};

routerLoad('api');
routerLoad('pc');
routerLoad('mobile');

module.exports = router;
