/**
 * 路由重写,主要用于根据 移动端/pc端 和底页id进行模板选择
 * 如果项目中不需要，可以删除(删除时请同时删除入口文件app.js中的引用)
 */

const rewrite = (ctx, from, to, edit = true) => {
    // .replace('//', '/index/');
    ctx.originalUrl = ctx.url = ctx.url.replace(from, to);
    // if (!edit) {
    //     ctx.originalUrl = ctx.url = ctx.url.replace(/\/edit/ig, '');
    // }
    // console.log('-------------:'+ctx.url);
};

module.exports = async (ctx, next) => {
    const devicetype = ctx.headers['devicetype'] || 'pc';

    ctx.set('deviceType', devicetype);

    // ctx.headers['domain'] = 'finance.ifeng.com';
    // ctx.headers['domain'] = 'shankapi.ifeng.com';

    if (ctx.url.indexOf('visualediting/') > -1) {
        return (ctx.status = 404);
    }
    if (/\/api\//.test(ctx.url)) {
        // do nothing
    } else if (/\/c\/channel/.test(ctx.url)) {
        if (devicetype === 'pc' || devicetype === 'mobile') {
            rewrite(ctx, /\/c\/channel\/(\w+)?(\/\w+)?(\/index\.shtml)?(\.shtml)?/, '/pc/finance/$1$2', false);
        } else if (devicetype === 'ie78') {
            rewrite(ctx, /\/c\/channel\/(\w+)?(\/\w+)?(\/index\.shtml)?(\.shtml)?/, '/pc/finance/$1$2/low', false);
        } else if (devicetype === 'ie6') {
            ctx.type = 'text/html';

            return (ctx.body = '<h1>ie6</h1>');
        }
    } else if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('finance.ifeng.com') > -1) {
        if (devicetype === 'pc' || devicetype === 'mobile') {
            rewrite(ctx, /\/(\w+)?(\/\w+)?(\.shtml)?(\/index\.shtml)?/, '/pc/finance/$1$2', true);
        } else if (devicetype === 'ie78') {
            rewrite(ctx, /\/(\w+)(\/\w+)?(\/index\.shtml)?(\.shtml)?/, '/pc/finance/$1$2/low', false);
        } else if (devicetype === 'ie6') {
            ctx.type = 'text/html';

            return (ctx.body = '<h1>ie6</h1>');
        }
    } else if (ctx.headers['domain'] && ctx.headers['domain'].indexOf('shankapi.ifeng.com') > -1) {
        rewrite(ctx, /\/(\w+)/, '/api');
    }
    await next();
};
