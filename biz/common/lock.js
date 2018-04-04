const redis = require('./redis');

module.exports = async function (key, action, seconds = 5) {
    let is_locked = await redis.setnx(key, 1);
    redis.expire(key, seconds);
    if (is_locked == 0) throw new Error('您的操作过于频繁');
    try {
        await action();
        redis.del(key);
    } catch (err) {
        redis.del(key);
        throw err;
    }

}