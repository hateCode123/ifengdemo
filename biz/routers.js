/**
 * 路由加载器
 */

const router = require('koa-router')();
const glob = require('glob');
const _ = require('lodash');
const logger = require('./common/logger');
const config = require('./configs');
const {validate} = require('./common/validate');
const redis = require('./common/redis');
const urlCache = require('./common/url-cache');
const {match} = require('./common/url-match');

glob.sync(__dirname + '/controllers/**/*.js').forEach(file => {
    let url_path = file.replace(__dirname, '');
    if (config.default.blacklist.indexOf(url_path) > -1) {             // 处理路由黑名单，在黑名单中的路由不会被加载
        return;
    }
    let ctrlObj = require(file);
    for (let i in ctrlObj) {
        if (!ctrlObj[i].path) {
            continue;
        }
        let edit = ctrlObj[i].edit;                                 // 是否需要编辑 (Boolean)
        let path = config.default.apiPrefix + ctrlObj[i].path;      // url路径 (String)
        middleware(ctrlObj, i, path);
        if (edit) {
            middleware(ctrlObj, i, `${path}/edit`, edit)                   // 添加页面编辑
        }
    }

    function middleware(ctrlObj, i, path, edit) {
        let method = ctrlObj[i].method || 'get|post';                 // http请求类型，暂时只支持get和post
        let handler = ctrlObj[i].handler;                               // 业务方法，主要处理所有业务 (Function)
        let middleware = ctrlObj[i].middleware;                        // 中间件列表 (Function | Array )
        let schema = ctrlObj[i].schema;                                  // joi 对象 (Object)
        let type = ctrlObj[i].type;                                     // 类型 (Sting)
        let cache = ctrlObj[i].cache || 0;                              // 缓存时间 (Number)，单位s
        let meddlewareList = [];
        if (_.isObject(schema)) {
            meddlewareList.push(validate(schema, type));                 // 添加joi验证中间件
        }
        if (config.default.cacheURL && cache > 0) {
            meddlewareList.push(urlCache(cache, type, {engine: redis, prefix: 'app'}));  // 添加缓存中间件
        }
        if (_.isFunction(middleware)) {
            meddlewareList.push(middleware);              // 添加自定义中间件，处理单个中间件，传入类型 Function
        }
        if (_.isArray(middleware)) {
            for (let item of middleware) {
                if (_.isFunction(item)) {
                    meddlewareList.push(item);            // 添加自定义中间件，处理多个中间件传入，传入类型 [ Function, Function...]
                }
            }
        }
        let methodArr = method.toLowerCase().split('|');
        for (let j in methodArr) {
            let method_item = methodArr[j].trim();
            if (!method_item) {
                continue;
            }
            if (_.isFunction(handler)) {
                router[method_item](path, ...meddlewareList, match(type, cache, edit, handler));  // 将路由挂载
                logger.debug(method_item + '\t: ' + path);
            }
        }
    }
});
module.exports = router;

