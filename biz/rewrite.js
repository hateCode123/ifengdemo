/**
 * 路由重写
 * 如果项目中不需要，可以删除(删除时请同时删除入口文件app.js中的引用)
 */
const rewrite = require('koa-rewrite');
const logger = require('./common/logger');
const { isPC } = require('./common/utils/browser');
const { KVProxy } = require('./providers/ucmsapiProxy');
const pathToRegexp = require('path-to-regexp');
const path = require('path');

const success = result => {
    console.log('success.response.costtime:', result.response.costtime);

    // console.log("success.response:", result.response);
    return result.response.return;
};

const error = result => {
    console.log('error.response.costtime:', result.response.costtime);
    console.log('error.response:', result.response.error);
};

module.exports = async(ctx, next) => {
    console.log(ctx.url);
    let type = '';
    const deviceType = ctx.headers['deviceType'] || 'pc';

    // if (/^\/heartbeat/.test(ctx.url)) {
    //     return await rewrite(/\/heartbeat(.*)/, '/api/heartbeat$1')(ctx, next);
    // }

    // // 监控api
    // if (/^\/api\//.test(ctx.url)) {
    //     return await rewrite(/\/api(.*)/, '/api$1')(ctx, next);
    // }

    // 底页面 rewrite
    if (/^\/r\//.test(ctx.url)) {
        let id = ctx.url.match(/r\/([0-9]+)/)[1];
        let docData = {};

        try {
            docData = await KVProxy.getDocument(parseInt(id)).then(success, error);
            docData = JSON.parse(docData);
            console.log(`docData.type：${docData.type}`);
            type = docData.type;
            ctx.docData = docData;
        } catch (err) {
            console.log(err);
        }

        type = 'content';

        let partten = deviceType === 'pc' ? `/${type}$1` : `/mobile/${type}$1`;

        return await rewrite(/\/r(.*)/, partten)(ctx, next);
    }

    // // 是否是移动端
    // if (/^\/mobile\//.test(ctx.url)) {
    //     return await next();
    // }

    if (deviceType === 'mobile' && !/(^\/api\/)|(^\/heartbeat)|(^\/mobile\/)/.test(ctx.url)) {

        return await rewrite(/(.*)/, '/mobile$1')(ctx, next);
    }

    return await next();
};
