const bunyan = require('bunyan');
const config = require('../configs');
const logs = config.default.logs;

let streams = [];
if ( process.env.NODE_ENV !== 'production') {
    logs.stream = process.stdout;
    streams.push(logs);
} else {
    streams = logs;
}

const logger = bunyan.createLogger({
    name: 'app',
    streams
});

module.exports = logger;