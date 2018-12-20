exports.login = {
    path: '/demo/slider',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_slider', {});
    },
};
