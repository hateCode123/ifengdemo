'use strict';
const logger = require('./logger');
const EventEmitter = require('events');
const map = new Map();
const proxy = new EventEmitter();

proxy.setMaxListeners(0);

const lock = async (url, action, ctx) => {
    const isLocked = map.has(url);

    if (!isLocked) {
        map.set(url, 1);
        try {
            await action();
            map.delete(url);
            proxy.emit(url, ctx.body);
        } catch (err) {
            map.del(url);
            console.error(err);
        }
    }
};

module.exports = async (ctx, next) => {
    if (ctx.method !== 'GET') {
        return next();
    }

    const result = await new Promise(async (resolve, reject) => {
        const url = ctx.url;

        proxy.once(url, result => {
            resolve(result);
        });

        lock(
            url,
            async () => {
                await next();
            },
            ctx,
        );
    });

    ctx.body = result;
};
