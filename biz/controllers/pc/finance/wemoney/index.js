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
        // console.log('getStaticFragment 10003...');
        const navigation = KVProxy.getStaticFragment(10003).then(...handleJson(ctx));

        // console.log('getStaticFragment 10006...');
        const slider = KVProxy.getStaticFragment(10006).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10004...');
        const adAside1 = KVProxy.getStaticFragment(10021).then(...handleJson(ctx));

        // console.log('getStaticFragment 10004...');
        const adAside2 = KVProxy.getStaticFragment(10022).then(...handleJson(ctx));

        // console.log('getStaticFragment 10004...');
        const adAside3 = KVProxy.getStaticFragment(10023).then(...handleJson(ctx));

        // console.log('getStaticFragment 10004...');
        const adAside4 = KVProxy.getStaticFragment(10024).then(...handleJson(ctx));

        // console.log('getStaticFragment 10004...');
        const adAside5 = KVProxy.getStaticFragment(10025).then(...handleJson(ctx));

        // console.log('getStaticFragment 10005...');
        const hotNews = KVProxy.getStaticFragment(10005).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10007...');
        const info = KVProxy.getStaticFragment(10007).then(...handleJsonByKey(ctx, 'content'));

        const otherData = await Promise.all([
            navigation,
            slider,
            info,
            hotNews,
            adAside1,
            adAside2,
            adAside3,
            adAside4,
            adAside5,
        ]);

        // console.log("11111 : ", otherData)

        const allData = {
            navigation: otherData[0],
            slider: otherData[1],
            info: otherData[2],
            hotNews: otherData[3],
            adAside1: otherData[4],
            adAside2: otherData[5],
            adAside3: otherData[6],
            adAside4: otherData[7],
            adAside5: otherData[8],
        };

        await ctx.html('finance_wemoney', {
            allData,
        });
    },
};
