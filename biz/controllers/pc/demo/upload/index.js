exports.components = {
    path: '/demo/upload',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_upload', {});
    },
};
