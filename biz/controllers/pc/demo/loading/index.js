exports.login = {
    path: '/demo/loading',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_loading', {});
    },
};
