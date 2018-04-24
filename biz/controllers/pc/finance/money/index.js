const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/money',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        // 导航静态碎片

        const navigation = KVProxy.getStaticFragment(10019).then(...handleJsonByKey(ctx, 'content'));
        const subNavigation = KVProxy.getStaticFragment(10020).then(...handleJsonByKey(ctx, 'content'));
        const collapse = KVProxy.getStaticFragment(10026).then(...handleJsonByKey(ctx, 'content'));

        const topLinkTable = KVProxy.getStaticFragment(10029).then(...handleJson(ctx));
        // const wemoneyNewsRanking = KVProxy.getStaticFragment(10005).then(...handleJsonByKey(ctx, 'content'));
        // const wemoneyNewsFlow = KVProxy.getStaticFragment(10007).then(...handleJsonByKey(ctx, 'content'));

        const otherData = await Promise.all([
            navigation,
            subNavigation,
            collapse,
            topLinkTable,
            // wemoneyLunbo,
            // wemoneyNewsFlow,
            // wemoneyNewsRanking,
            // wemoneyAdAside,
        ]);
        
        const allData = {
            navigation: otherData[0],
            subNavigation: otherData[1],
            collapse: otherData[2],
            topLinkTable: otherData[3],
            // wemoneyAdAside: otherData[4],
        };

        await ctx.html('finance_money', { allData });
    },
};
