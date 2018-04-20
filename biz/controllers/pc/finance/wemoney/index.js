const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/wemoney',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {

        // wemoney导航静态碎片
        console.log('getStaticFragment 10003...');
        const wemoneyNav = KVProxy.getStaticFragment(10003).then(...handleJson(ctx));
        const wemoneyLunbo = KVProxy.getStaticFragment(10006).then(...handleJsonByKey(ctx, 'content'));
        const wemoneyAdAside = KVProxy.getStaticFragment(10004).then(...handleJsonByKey(ctx, 'content'));
        const wemoneyNewsRanking = KVProxy.getStaticFragment(10005).then(...handleJsonByKey(ctx, 'content'));
        const wemoneyNewsFlow = KVProxy.getStaticFragment(10007).then(...handleJsonByKey(ctx, 'content'));

        const otherData = await Promise.all([
            wemoneyNav,
            wemoneyLunbo,
            wemoneyNewsFlow,
            wemoneyNewsRanking,
            wemoneyAdAside,
        ]);

        // console.log("11111 : ", otherData)
    
        const allData = {
            wemoneyNav: otherData[0],
            wemoneyLunbo: otherData[1],
            wemoneyNewsFlow: otherData[2],
            wemoneyNewsRanking: otherData[3],
            wemoneyAdAside: otherData[4],
        };
 
        await ctx.html('finance_wemoney', { allData });
    },
};
