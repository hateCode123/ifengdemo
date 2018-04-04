const redis = require('../../common/redis');
const logger = require('../../common/logger');

exports.jsonp_demo = {
    path: '/jsonp/demo',
    method: 'get',
    handler: async(ctx) => {
       ctx.jsonp({name:'ifeng',desc:'The weather today is good！'});
    }
};

