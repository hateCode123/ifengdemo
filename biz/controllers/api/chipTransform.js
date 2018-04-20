const redis = require('../../common/redis');
const logger = require('../../common/logger');
const { listTransform } = require('../../common/transform');
const transformConfig = [{ id: '1', type: 'active', callback: listTransform }];

exports.chipTransform = {
    path: '/api/chipTransform',
    method: 'post',
    handler: async ctx => {
        const { id, type, data } = ctx.request.body;

        console.log(id);
        console.log(type);
        console.log(data);
        let result = null;
        
        for (const config of transformConfig) {
            if (id === config.id && type === config.type) {
                result = await config.callback(data);
            }
        }
        ctx.json(result);
    },
};
