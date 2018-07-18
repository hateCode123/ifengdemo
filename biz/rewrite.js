/**
 * 路由重写,主要用于根据 移动端/pc端 和底页id进行模板选择
 * 如果项目中不需要，可以删除(删除时请同时删除入口文件app.js中的引用)
 */
const logger = require('./common/logger');

module.exports = async (ctx, next) => {
    let devicetype = ctx.headers['devicetype'] || 'pc';

    ctx.set('deviceType', devicetype);

    // devicetype = 'ie78';
    // ctx.headers['domain'] = 'finance.ifeng.com';

    if (/\/api\//.test(ctx.url)) {
        // do nothing
    } else if (/\/c\/channel/.test(ctx.url)) {
        if (devicetype === 'pc' || devicetype === 'mobile') {
            ctx.originalUrl = ctx.url = ctx.url.replace('/c/channel', '/pc/finance');
        } else if (devicetype === 'ie78') {
            ctx.originalUrl = ctx.url = ctx.url.replace(/\/c\/(channel)\/([a-z]+)(\??.*)/, '/pc/finance/$2/low$3');
        } else if (devicetype === 'ie6') {
            ctx.type = 'text/html';

            return (ctx.body = '<h1>ie6</h1>');
        }
    } else if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('finance.ifeng.com') > -1) {
        if (devicetype === 'pc' || devicetype === 'mobile') {
            ctx.originalUrl = ctx.url = `/pc/finance${ctx.url}`;
        } else if (devicetype === 'ie78') {
            let arr = ctx.url.split('?');

            ctx.originalUrl = ctx.url = `/pc/finance${arr[0] === '/' ? '/index' : arr[0]}/low${
                arr[1] ? `?${arr[1]}` : ''
            }`;
        } else if (devicetype === 'ie6') {
            ctx.type = 'text/html';

            return (ctx.body = '<h1>ie6</h1>');
        }
    }
    await next();
};
