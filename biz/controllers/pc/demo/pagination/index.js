exports.login = {
    path: '/demo/pagination',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_pagination', {});
    },
};
