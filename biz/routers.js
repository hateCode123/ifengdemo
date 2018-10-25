/**
 * 路由加载器
 */

const router = require('koa-router')();
const glob = require('glob');
const _ = require('lodash');
const logger = require('./common/logger');
const config = require('./configs');
const { validate } = require('./common/validate');
const urlCache = require('./common/url-cache');
const { match } = require('./common/url-match');

const routerList = [];

// 路由重写，共用一个路由（将对象key的路径指向value的路径，value所对应的路径不受影响）
const rewriteList = {};

// 自动加载controllers中的路由
let routers = {};
let routerPath = [];

glob.sync(`${__dirname}/controllers/**/*.js`).forEach(file => {
    const urlPath = file.replace(__dirname, '');

    if (config.default.blacklist.indexOf(urlPath) > -1) {
        // 处理路由黑名单，在黑名单中的路由不会被加载
        return;
    }

    let ctrlObj = require(file);

    for (const i in ctrlObj) {
        if (!ctrlObj[i].path) {
            continue;
        }
        routers[ctrlObj[i].path] = ctrlObj[i];
    }
});
routerPath = Object.keys(routers);

// console.log(routerPath);
//
for (const path of routerPath) {
    if (/^\/pc\//.test(path)) {
        let mobileUrl = path.replace('/pc/', '/mobile/');

        // console.log(mobileUrl);

        if (routerPath.indexOf(mobileUrl) === -1) {
            routers[mobileUrl] = _.clone(routers[path]);
            routers[mobileUrl].path = mobileUrl;
            routers[mobileUrl].low = false;
            routers[mobileUrl].share = 'mobile';
        }
    }

    if (/^\/mobile\//.test(path)) {
        let pcUrl = path.replace('/mobile/', '/pc/');

        if (routerPath.indexOf(pcUrl) === -1) {
            routers[pcUrl] = _.clone(routers[path]);
            routers[pcUrl].path = pcUrl;
            routers[pcUrl].share = 'pc';
        }
    }
}

for (const i in routers) {
    // 是否需要编辑 (Boolean)
    const edit = routers[i].edit;
    const preview = routers[i].preview;
    const low = routers[i].low;

    // url路径 (String)
    const path = config.default.apiPrefix + routers[i].path;

    // http请求类型，暂时只支持get和post
    const method = routers[i].method || 'get|post';

    // 业务方法，主要处理所有业务 (Function)
    const handler = routers[i].handler;

    // 中间件列表 (Function | Array )
    const middleware = routers[i].middleware;

    // joi 对象 (Object)
    const schema = routers[i].schema;

    // 类型 (Sting)
    const cdncache = routers[i].cdncache;

    // 类型 (Sting)
    const type = routers[i].type;

    // 缓存时间 (Number)，单位s
    const cache = routers[i].cache || 0;
    const async_chips = routers[i].async_chips || [];
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
        meddlewareList.push(urlCache(cache, type, { engine: null, prefix: 'app' }));
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
            let routerObj = _.clone(routers[i]);

            routerObj.edit = false;
            routerObj.preview = false;
            routerObj.low = false;

            // 将路由放入路由列表
            routerList.push({
                path,
                method: methodItem,
                handlers: [...meddlewareList, match(routerObj, handler)],
            });

            // 添加页面编辑中间件
            if (edit) {
                // 将路由放入路由列表
                let routerObj = _.clone(routers[i]);

                routerObj.path = `${routerObj.path}/visualediting`;
                routerObj.edit = true;
                routerObj.preview = false;
                routerObj.low = false;
                routerObj.async_chips = async_chips;

                routerList.push({
                    path: routerObj.path,
                    method: methodItem,
                    handlers: [...meddlewareList, match(routerObj, handler)],
                });
            }
            // 添加全页预览中间件
            if (preview) {
                let routerObj = _.clone(routers[i]);

                routerObj.path = `${routerObj.path}/preview`;
                routerObj.edit = false;
                routerObj.preview = true;
                routerObj.low = false;

                // 将路由放入路由列表
                routerList.push({
                    path: routerObj.path,
                    method: 'post',
                    handlers: [...meddlewareList, match(routerObj, handler)],
                });
            }

            // 添加降级页中间件
            if (low) {
                let routerObj = _.clone(routers[i]);

                routerObj.path = `${routerObj.path}/low`;
                routerObj.edit = false;
                routerObj.preview = false;
                routerObj.low = true;

                // 将路由放入路由列表
                routerList.push({
                    path: `${path}/low`,
                    method: methodItem,
                    handlers: [...meddlewareList, match(routerObj, handler)],
                });
            }
            // 处理路由冒泡
            if (routers[i].share === 'pc') {
                let routerObj = _.clone(routers[i]);

                routerObj.path = `${routerObj.path}/low`;
                routerObj.edit = false;
                routerObj.preview = false;
                routerObj.low = true;

                // 将路由放入路由列表
                routerList.push({
                    path: routerObj.path,
                    method: methodItem,
                    handlers: [...meddlewareList, match(routerObj, handler)],
                });
            }
        }
    }
}

// const getRouter = path => {
//     for (const item of routerList) {
//         if (item.path === path) {
//             return item;
//         }
//     }

//     return null;
// };

// for (const from in rewriteList) {
//     const item = getRouter(rewriteList[from]);

//     if (!item) {
//         continue;
//     }

//     // 将rewrite路由挂载
//     router[item.method](from, ...item.handlers);

//     logger.debug(`${item.method}\t:${from}`);
// }

for (const item of routerList) {
    // 将路由挂载
    router[item.method](item.path, ...item.handlers);

    logger.debug(`${item.method}\t:${item.path}`);
}

module.exports = router;
