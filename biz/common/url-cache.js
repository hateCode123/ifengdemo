'use strict';
const logger = require('@ifeng/logger');
const Chance = require('chance');

const chance = new Chance();

/**
 * 随机在过期时间加上0~30秒的值,防止高并发缓存同时失效的问题
 * @param {Number} expire
 */
function random(expire) {
    return expire + chance.integer({ min: 0, max: 30 });
}


module.exports = (cache,type,options) => {
    const prefix = options.prefix;
    const engine = options.engine;

    if (!prefix) {
        throw new Error('cache need a prefix');
    }

    if (!engine) {
        throw new Error('cache engine is undefined');
    }

    if ((engine.get && typeof engine.get !== 'function') || (engine.setex && typeof engine.setex !== 'function')) {
        throw new Error('engine should have method get or setex');
    }

    /**
     * get data from cache
     * @param {String} type
     * @param {String} key
     */
    async function getCache(type, key) {
        switch (type) {
            case 'html':
            case 'xml':
            case 'text':
                return engine.get(key);
            default:
                let ret = await engine.get(key);
                return JSON.parse(ret);
        }
    }

    /**
     *  set data in cache with expire
     * @param {String} type
     * @param {String} key
     * @param {*} data
     * @param {Number} expire
     */
    async function setCache(type, key, data, expire) {
        switch (type) {
            case 'html':
            case 'xml':
            case 'text':
                return engine.setex(key, expire, data);
            default:
                return engine.setex(key, expire, JSON.stringify(data));
        }
    }

    return async (ctx, next) => {
        let key = prefix + '::URL::CACHE::' + ctx.url;
        if (ctx.method !== 'GET' || !cache ||cache <= 0) {
            return next();
        }

        let ret = await getCache(type, key);
        if (ret) {
            ctx.body = ret;
            logger.info(`url_cache: ${ctx.method} ${ctx.url} get response body from cache`);
            return;
        }

        await next();
        setCache(type, key, ctx.body, random(cache)).catch(err => {
            logger.error(`url_cache: ${key} cache happened error:${err}`);
        });
    }
};