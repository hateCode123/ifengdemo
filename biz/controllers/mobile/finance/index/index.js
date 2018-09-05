exports.mobileFinanceIndex = {
    path: '/mobile/finance/(index)?/test',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler: async ctx => {
        ctx.status = 301;
        ctx.redirect('https://ifinance.ifeng.com/');
    },
};
