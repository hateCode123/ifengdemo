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
        console.log('getStaticFragment 10019...');
        const navigation = KVProxy.getStaticFragment(10019).then(...handleJsonByKey(ctx, 'content'));
        // const wemoneyLunbo = KVProxy.getStaticFragment(10006).then(...handleJsonByKey(ctx, 'content'));
        // const wemoneyAdAside = KVProxy.getStaticFragment(10004).then(...handleJsonByKey(ctx, 'content'));
        // const wemoneyNewsRanking = KVProxy.getStaticFragment(10005).then(...handleJsonByKey(ctx, 'content'));
        // const wemoneyNewsFlow = KVProxy.getStaticFragment(10007).then(...handleJsonByKey(ctx, 'content'));
console.log('navigation',navigation)
        const otherData = await Promise.all([
            navigation,
            // wemoneyLunbo,
            // wemoneyNewsFlow,
            // wemoneyNewsRanking,
            // wemoneyAdAside,
        ]);

        // console.log("11111 : ", otherData)
    
        const allData = {
            navigation: otherData[0],
            // wemoneyLunbo: otherData[1],
            // wemoneyNewsFlow: otherData[2],
            // wemoneyNewsRanking: otherData[3],
            // wemoneyAdAside: otherData[4],
        };
 
        await ctx.html('finance_money', { allData });
    },
};
