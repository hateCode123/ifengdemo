exports.login = {
    path: '/demo/table',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_table', {});
    },
};
