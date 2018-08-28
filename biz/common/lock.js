// const redis = require('./redis');

// module.exports = async(key, action, seconds = 5) => {
//     const isLocked = await redis.setnx(key, 1);

//     redis.expire(key, seconds);
//     if (isLocked !== 0) {
//         try {
//             await action();
//             redis.del(key);
//         } catch (err) {
//             redis.del(key);
//             throw err;
//         }
//     } else {
//         throw new Error('您的操作过于频繁');
//     }
// };
