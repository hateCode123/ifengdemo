exports.login = {
    path: '/demo/pagination2',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_pagination2', {});
    },
};
