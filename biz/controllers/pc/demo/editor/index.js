exports.editor = {
    path: '/demo/editor',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('demo_editor', {});
    },
};
