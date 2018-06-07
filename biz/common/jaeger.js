const config = require('../configs');
let tracer = {};

if (config.default.statisticsJaeger) {
    const Tracer = require('shimo-jaeger');
    tracer = new Tracer({
        serviceName: config.default.appname,
        options: {
            enables: ['koa', 'express', 'http'],
        },
    });
}

exports.tracer = tracer;
