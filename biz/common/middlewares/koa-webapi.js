/**
 * koa框架 ctx对象方法扩展
 * ctx对象新增 ctx.html(), ctx.json, ctx.jsonp()方法，使用说明请查看doc.md
 */
const util = require('util');
const {tracer} = require('../../common/jaeger');

module.exports = (app, options = {}) => {
    // extend html function
    app.context.html = async function(tplName, data) {
        this.spanrpc.finish();
        const child = tracer._tracer.startSpan('render', { childOf: this.span });
        if (this.urlinfo && this.urlinfo.ctrlPath === 'mobile') {
            tplName += '_mobile';
        }
        if (this.urlinfo && this.urlinfo.edit) {
            tplName += '_edit';
        }
        await this.render(tplName, data);
        child.finish();
    };

    // extend json function
    app.context.json = function(code, message, data) {
        const contentType = 'application/json';
        let response = null;

        if (arguments.length === 1) {
            response = { code: 0, message: '成功', data: arguments[0] };
        } else {
            response = { code, message, data };
        }
        this.type = contentType;
        this.body = response;
    };

    // extend jsonp function
    app.context.jsonp = function(data) {
        const callback = this.query.callback || 'callback';
        const contentType = 'text/javascript';
        let response = null;

        if (this.method !== 'GET') {
            return;
        }
        response = `${callback}(${JSON.stringify(data)})`;
        this.type = contentType;
        this.body = response;
    };

    // extend error function
    app.context.error = function(status) {
        this.status = status || 404;
    };
};
