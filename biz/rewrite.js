/**
 * 路由重写,主要用于根据 移动端/pc端 和底页id进行模板选择
 * 如果项目中不需要，可以删除(删除时请同时删除入口文件app.js中的引用)
 */
const rewrite = require('koa-rewrite');
const logger = require('./common/logger');
const { isPC } = require('./common/utils/browser');
const { KVProxy } = require('./providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('./services/common/common');

module.exports = async(ctx, next) => {
    // logger.debug(ctx.url);
    let type = '';
    const deviceType = ctx.headers['deviceType'] || 'pc';

    // 底页面 rewrite
    if (/^\/r\//.test(ctx.url)) {
        const id = ctx.url.match(/r\/([0-9]+)/)[1];
        let docData = {};

        docData = await KVProxy.getDocument(parseInt(id)).then(...handleJson(ctx, true));
        ctx.docData = docData;

        type = docData.type;
        logger.debug(`docData.type：${docData.type}`);

        type = 'content';

        const partten = deviceType === 'pc' ? `/${type}$1` : `/mobile/${type}$1`;

        return await rewrite(/\/r(.*)/, partten)(ctx, next);
    }

    if (deviceType === 'phone' && !/(^\/api\/)|(^\/heartbeat)|(^\/mobile\/)/.test(ctx.url)) {
        return await rewrite(/(.*)/, '/mobile$1')(ctx, next);
    }

    return await next();
};
