const Redis = require('ioredis');
const config = require('../configs');

let write_client = null;
let read_client = null;

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
    write_client = new Redis(config.default.redisHosts[0]);
    read_client = new Redis(config.default.redisHostsSlave[0]);
} else {
    write_client = read_client = new Redis.Cluster(config.default.redisHosts);
}
module.exports = type => {
    if (type === 'read') {
        return read_client;
    }
    if (type === 'write') {
        return write_client;
    }
    
    return null;
};
