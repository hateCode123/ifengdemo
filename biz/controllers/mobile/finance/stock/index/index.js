exports.mobileFinanceStock = {
    path: '/mobile/finance/stock/test',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler: async ctx => {
        ctx.redirect('https://istock.ifeng.com/');
    },
};
