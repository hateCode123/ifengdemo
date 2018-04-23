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
        
        //console.log('getStaticFragment 10003...');
        const navigation = KVProxy.getStaticFragment(10003).then(...handleJson(ctx));

        //console.log('getStaticFragment 10006...');
        const slider = KVProxy.getStaticFragment(10006).then(...handleJsonByKey(ctx, 'content'));

        //console.log('getStaticFragment 10004...');
        const adAside = KVProxy.getStaticFragment(10004).then(...handleJsonByKey(ctx, 'content'));

        //console.log('getStaticFragment 10005...');
        const hotNews = KVProxy.getStaticFragment(10005).then(...handleJsonByKey(ctx, 'content'));

        //console.log('getStaticFragment 10007...');
        //const info = KVProxy.getStaticFragment(10007).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 17007_719_68...');
        const info = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        const otherData = await Promise.all([
            navigation,
            slider,
            info,
            hotNews,
            adAside,
        ]);

        // console.log("11111 : ", otherData)
    
        const allData = {
            navigation: otherData[0],
            slider: otherData[1],
            info: otherData[2],
            hotNews: otherData[3],
            adAside: otherData[4],
        };
 
        await ctx.html('finance_wemoney', { allData });
    },
};
