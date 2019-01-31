exports.form = {
    path: '/demo/form',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_form', {});
    },
};
