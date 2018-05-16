const bunyan = require('bunyan');
const config = require('../configs');
const logs = config.default.logs;

let streams = [];

if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging') {
    logs.stream = process.stdout;
    streams.push(logs);
} else {
    streams = logs;
}

const logger = bunyan.createLogger({
    name: 'app',
    streams,
});

console.log = logger.debug.bind(logger);
console.error = logger.error.bind(logger);

module.exports = logger;
