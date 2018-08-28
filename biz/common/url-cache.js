'use strict';
const logger = require('./logger');
const Chance = require('chance');
const chance = new Chance();

/**
 * 随机在过期时间加上0~30秒的值,防止高并发缓存同时失效的问题
 * @param {Number} expire
 */
const random = (expire) => {
    return expire + chance.integer({ min: 0, max: 30 });
};

module.exports = (cache, type, options) => {
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
    const getCache = async(type, key) => {
        const ret = await engine.get(key);

        switch (type) {
            case 'html':
            case 'xml':
            case 'text':
            case 'jsonp':
                return ret;
            default:
                return JSON.parse(ret);
        }
    };

    /**
     *  set data in cache with expire
     * @param {String} type
     * @param {String} key
     * @param {*} data
     * @param {Number} expire
     */
    const setCache = async(type, key, data, expire) => {
        switch (type) {
            case 'html':
            case 'xml':
            case 'text':
            case 'jsonp':
                return engine.setex(key, expire, data);
            default:
                return engine.setex(key, expire, JSON.stringify(data));
        }
    };

    return async(ctx, next) => {
        const key = `${prefix}::URL::CACHE::${ctx.url}`;

        if (ctx.method !== 'GET' || !cache || cache <= 0) {
            return next();
        }

        const ret = await getCache(type, key);
        
        if (ret) {
            ctx.body = ret;
            logger.info(`url_cache: ${ctx.method} ${ctx.url} get response body from cache`);
            
            return;
        }

        await next();
        setCache(type, key, ctx.body, random(cache)).catch(err => {
            ctx.errorCount++;
            logger.error(`url_cache: ${key} cache happened error:${err}`);
        });
    };
};
