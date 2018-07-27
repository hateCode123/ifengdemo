const transform = require('../../common/transform');

exports.chipTransform = {
    path: '/api/chipTransform',
    method: 'post',
    handler: async ctx => {
        const { data, translate } = ctx.request.body;

        if (transform[translate]) {
            ctx.json(transform[translate](data));
        } else {
            ctx.json(data);
        }
    },
};
