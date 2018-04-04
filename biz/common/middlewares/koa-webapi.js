'use strict';

const util = require('util');
const debug = require('debug')('koa-webapi');
const assert = require('assert');
const defaultJsonpCallbackFn = 'callback';

module.exports = function (app, options = {}) {

    assert(app && app.constructor.name === 'Application', 'app is must be an instance of koa');
    app.context.html = async function (tplName, data) {
        console.log(this.urlinfo)
        if(this.urlinfo && this.urlinfo.edit){
            tplName += '_edit';
        }
        await this.render(tplName, data);
    }

    //extend json function
    app.context.json = function(status, message, data){
        let contentType = "application/json",
            response;

        if (arguments.length == 1) {
            response = {status: 0, message: '成功', data: arguments[0]}
        } else {
            response = {status, message, data};
        }
        this.type = contentType;
        this.body = response;

        debug(`response: ${response}`);
    }

    //extend jsonp function
    let callbackFn;
    if (options.jsonpCallbackFn) {
        assert(isString(options.jsonpCallbackFn), 'jsonpCallbackFn must be string');
        callbackFn = options.jsonpCallbackFn;
    } else {
        callbackFn = defaultJsonpCallbackFn;
    }

    debug(`callback function name: ${callbackFn}`);

    app.context.jsonp = function (data) {
        let callback = this.query[callbackFn],
            contentType = 'text/javascript',
            response;
        if (this.method !== 'GET') {
            debug('the request mehtod is not "GET", return.');
            return;
        }
        if(!callback) {
            debug(`${callbackFn} is undefined, return.`);
            return;
        }
        response = `${callback}(${JSON.stringify(data)})`;

        this.type = contentType;
        this.body = response;

        debug(`response: ${response}`);
    }
}

function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
}