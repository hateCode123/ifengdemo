/**
 * koa框架 ctx对象方法扩展
 * ctx对象新增 ctx.html(), ctx.json, ctx.jsonp()方法，使用说明请查看doc.md
 */
const util = require('util');
const {tracer} = require('../../common/jaeger');
const config = require('../../configs')

module.exports = (app, options = {}) => {
    // extend html function
    app.context.html = async function(tplName, data) {
        let child = null;
        if (config.default.statisticsJaeger) {
            this.spanrpc.finish();
            child = tracer._tracer.startSpan('render', { childOf: this.span });
        }
        if (this.urlinfo && this.urlinfo.ctrlPath === 'mobile') {
            tplName += '_mobile';
        }
        if (this.urlinfo && this.urlinfo.edit) {
            tplName += '_edit';
        }

        if (this.urlinfo && this.urlinfo.low) {
            tplName += '_low';
        }

        if (this.urlinfo.cdncache > 0) {
            this.set('Cache-Control', `max-age=${this.urlinfo.cdncache}`);
        } else if (this.urlinfo.cdncache === 0) {
            this.set('Cache-Control', 'no-cache');
        } else {
            this.set('Cache-Control', `max-age=${config.default.cdnCacheTime}`);
        }

        await this.render(tplName, data);

        if (config.default.statisticsJaeger) {
            child.finish();
        }
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

        if (this.urlinfo.cdncache > 0) {
            this.set('Cache-Control', `max-age=${this.urlinfo.cdncache}`);
        } else if (this.urlinfo.cdncache === 0) {
            this.set('Cache-Control', 'no-cache');
        } else {
            this.set('Cache-Control', `max-age=${config.default.cdnCacheTime}`);
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

        if (this.urlinfo.cdncache > 0) {
            this.set('Cache-Control', `max-age=${this.urlinfo.cdncache}`);
        } else if (this.urlinfo.cdncache === 0) {
            this.set('Cache-Control', 'no-cache');
        } else {
            this.set('Cache-Control', `max-age=${config.default.cdnCacheTime}`);
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
