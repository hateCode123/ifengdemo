const Redis = require('ioredis');
const config = require('../configs');

let client = null;

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
    client = new Redis(config.default.redisHosts[0]);
} else {
    client = new Redis.Cluster(config.default.redisHosts);
}
module.exports = client;
