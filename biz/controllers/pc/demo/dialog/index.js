exports.dialog = {
    path: '/demo/dialog',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_dialog', {});
    },
};
