const bunyan = require('@ifeng/server_bunyan');
const config = require('../configs');
const logs = config.default.logs;

let streams = [];

// if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
//     logs.stream = process.stdout;
//     streams.push(logs);
// } else {
//     streams = logs;
// }

logs.stream = process.stdout;
streams.push(logs);

const logger = bunyan.createLogger({
    name: 'app',
    streams,
});

console.trace = logger.trace.bind(logger);
console.log = logger.debug.bind(logger);
console.debug = logger.debug.bind(logger);
console.info = logger.info.bind(logger);
console.warn = logger.warn.bind(logger);
console.error = logger.error.bind(logger);

module.exports = logger;
