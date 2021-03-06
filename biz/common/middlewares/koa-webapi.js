/**
 * koa框架 ctx对象方法扩展
 * ctx对象新增 ctx.html(), ctx.json, ctx.jsonp()方法，使用说明请查看doc.md
 */
const util = require('util');
const { tracer } = require('../../common/jaeger');
const config = require('../../configs');
const _ = require('lodash');
const KVTableEnum = config.common.KVProxy;
const writeRedis = require('../redis')('write');

module.exports = (app, options = {}) => {
    // extend html function
    app.context.html = async function(tplName, data = {}) {
        let child = null;
        let randerStart = 0;
        if (config.default.statistics) {
            randerStart = process.uptime() * 1000;
        }
        if (config.default.statisticsJaeger) {
            child = tracer.startSpan('render', { childOf: this.spanrpc || this.span });
        }

        // if (this.urlinfo.ctrlPath === 'mobile') {
        //     tplName += '_mobile';
        // }

        if (this.urlinfo.edit) {
            tplName += '_edit';
        }

        if (this.urlinfo.low) {
            tplName += '_low';
        }

        if (this.urlinfo.cdncache > 0) {
            this.set('Cache-Control', `max-age=${this.urlinfo.cdncache}`);
        } else if (this.urlinfo.cdncache === 0) {
            this.set('Cache-Control', 'no-cache');
        } else {
            this.set('Cache-Control', `max-age=${config.default.cdnCacheTime}`);
        }
        if (this.urlinfo.edit) {
            if (_.isArray(this.urlinfo.async_chips)) {
                for (const item of this.urlinfo.async_chips) {
                    let arr = item[0].split(':');
                    this.kvList.push({
                        type: KVTableEnum[item[2]] || '',
                        id: item[3],
                        title: arr[1] || '',
                        key: arr[0],
                        from: 'api',
                    });
                }
            }
            data.kvList = this.kvList;
        } else {
            data.kvList = [];
        }
        data.bid = this.uuid;
        data.router = this.urlinfo.path;

        await this.render(tplName, data);

        if (config.default.statistics) {
            this.randerTime = process.uptime() * 1000 - randerStart;
        }

        if (config.default.statisticsJaeger) {
            child.finish();
            this.spanrpc.finish();
        }

        // 将kv放入队列
        writeKvToQueue(this);
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

        // 将kv放入队列
        writeKvToQueue(this);
    };

    // extend jsonp function
    app.context.jsonp = function(code, message, data) {
        const callback = this.params.callback || this.query.callback || 'callback';
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

        if (arguments.length === 1) {
            response = { code: 0, message: '成功', data: arguments[0] };
        } else {
            response = { code, message, data };
        }

        response = `${callback}(${JSON.stringify(response)})`;

        this.type = contentType;
        this.body = response;

        // 将kv放入队列
        writeKvToQueue(this);
    };

    // extend error function
    app.context.error = function(status) {
        this.status = status || 404;
    };

    app.context.errorLog = function(err) {
        if (typeof err === 'object') {
            err.bid = this.uuid;
        } else if (typeof err === 'string') {
            err += `，bid： ${this.uuid}`;
        }
        console.error(err);
    };
};

const set = new Set();
const prefix = `${config.default.namespace}::${config.default.appname}`;
const cacheTime = 7 * 24 * 60 * 60;
function writeKvToQueue(ctx) {
    process.nextTick(() => {
        for (let item of ctx.kvList) {
            set.add(
                `${prefix}::chip::${ctx.headers.domain}::${ctx.urlinfo.path}::${item.type}::${
                    item.type != 'documents' ? item.id : ':id'
                }`,
            );
        }
    });
}

setInterval(function() {
    let index = 0;
    const size = set.size;
    const start = process.uptime() * 1000;
    for (let item of set) {
        // console.log(item);
        writeRedis.set(item, '1', 'EX', cacheTime, () => {
            index++;
            if (size == index) {
                let time = process.uptime() * 1000 - start;
                console.info({ chip: { size, time } });
            }
        });
    }
    set.clear();
}, 2 * 60 * 1000 + parseInt(Math.random() * 1000 * 60));
