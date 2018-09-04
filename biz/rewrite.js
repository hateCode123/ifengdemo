/**
 * 路由重写,主要用于根据 移动端/pc端 和底页id进行模板选择
 * 如果项目中不需要，可以删除(删除时请同时删除入口文件app.js中的引用)
 */

const rewrite = (ctx, from, to) => {
    ctx.originalUrl = ctx.url = ctx.url
        .replace(from, to)
        .replace(/(\/index\.s?html)|(\.s?html)/gi, '')
        .replace(/\/\//, '/');
};

module.exports = async (ctx, next) => {
    let devicetype = ctx.headers['devicetype'] || 'pc';

    if (devicetype === 'ie6') {
        return;
    }
    // devicetype = 'ie78';

    ctx.set('deviceType', devicetype);

    // ctx.headers['domain'] = 'finance.ifeng.com';
    // ctx.headers['domain'] = 'shankapi.ifeng.com';

    if (ctx.url.indexOf('visualediting/') > -1) {
        return (ctx.status = 404);
    }
   
    if (/\/api\//.test(ctx.url)) {
        // do nothing
    } else if (/\/c\/channel/.test(ctx.url)) {
        if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('ucms.ifeng.com') > -1) {
            rewrite(ctx, /\/shank\/spring\/c\/channel/, `/${devicetype}/finance`);
        } else if (devicetype === 'pc' || devicetype === 'mobile') {
            rewrite(ctx, /\/c\/channel\/([a-zA-Z0-9/-_]+)?/, `/${devicetype}/finance/$1`);
        } else if (devicetype === 'ie78') {
            rewrite(ctx, /\/c\/channel\/([a-zA-Z0-9/-_]+)?/, '/pc/finance/$1/low');
        }
    } else if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('finance.ifeng.com') > -1) {
        if (devicetype === 'pc' || devicetype === 'mobile') {
            rewrite(ctx, /\/([a-zA-Z0-9/-_]+)?/, `/${devicetype}/finance/$1`);
        } else if (devicetype === 'ie78') {
            rewrite(ctx, /\/([a-zA-Z0-9/-_]+)?/, '/pc/finance/$1/low');
        }
    } else if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('shankapi.ifeng.com') > -1) {
        rewrite(ctx, /\/(\w+)/, '/api');
    } else if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('ucms.ifeng.com') > -1) {
        rewrite(ctx, /\/shank\/\w+/, `/${devicetype}/finance`);
    }
    await next();
};
