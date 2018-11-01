const Redis = require('ioredis');
const config = require('../configs');

const client = new Redis.Cluster(config.default.redisHosts);

module.exports = client;
