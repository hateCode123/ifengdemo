const Tracer = require('shimo-jaeger')
const opentracing = require('opentracing')
const tracer = new Tracer({
  serviceName: 'web-channel1',
  options: {
    enables: ['koa', 'express', 'http']
  }
})

exports.tracer = tracer;