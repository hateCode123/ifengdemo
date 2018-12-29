exports.components = {
    path: '/demo/share',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_share', {});
    },
};
