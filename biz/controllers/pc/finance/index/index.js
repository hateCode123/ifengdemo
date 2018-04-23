const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.list = {
    path: '/finance',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // console.log('getStaticFragment 10002...');
        const navigation = KVProxy.getStaticFragment(10002).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20002...');
        const bannerPic = KVProxy.getRecommendFragment(20002).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20003...');
        const headline = KVProxy.getRecommendFragment(20003).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getStaticFragment 10011...');
        const extraNews = KVProxy.getStaticFragment(10011).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20004...');
        const recommend = KVProxy.getRecommendFragment(20004).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10008...');
        const talking = KVProxy.getStaticFragment(10008).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10009...');
        const finance = KVProxy.getStaticFragment(10009).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10010...');
        const stocks = KVProxy.getStaticFragment(10010).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20005...');
        const talkingList = KVProxy.getRecommendFragment(20005).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20006...');
        const financeList = KVProxy.getRecommendFragment(20006).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20007...');
        const stocksList = KVProxy.getRecommendFragment(20007).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10012...');
        const titleAd = KVProxy.getStaticFragment(10012).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20008...');
        const institute = KVProxy.getRecommendFragment(20008).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20009...');
        const state = KVProxy.getRecommendFragment(20009).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20010...');
        const meeting = KVProxy.getRecommendFragment(20010).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10015...');
        const cooperation = KVProxy.getStaticFragment(10015).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 17007_719_68...');
        const customList = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        // console.log('getRecommendFragment 10014...');
        const market = KVProxy.getStaticFragment(10014).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10016...');
        const courier = KVProxy.getStaticFragment(10016).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10017...');
        const production = KVProxy.getStaticFragment(10017).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 17007_719_68...');
        const dayNews = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        // console.log('getRecommendFragment 10018...');
        const stockMarket = KVProxy.getStaticFragment(10018).then(...handleJsonByKey(ctx, 'content'));

        let otherData = await Promise.all([
            navigation,
            bannerPic,
            headline,
            recommend,
            talking,
            finance,
            stocks,
            talkingList,
            financeList,
            stocksList,
            extraNews,
            titleAd,
            institute,
            state,
            meeting,
            cooperation,
            customList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
        ]);

        // console.dir(otherData, { depth: null });
        const allData = {
            // navigation: JSON.parse(navigation).content,
            // bannerPic: JSON.parse(bannerPic).data,
            navigation: otherData[0],
            bannerPic: otherData[1],
            headline: otherData[2],
            recommend: otherData[3],
            talking: otherData[4],
            finance: otherData[5],
            stocks: otherData[6],
            talkingList: otherData[7],
            financeList: otherData[8],
            stocksList: otherData[9],
            extraNews: otherData[10],
            titleAd: otherData[11],
            institute: otherData[12],
            state: otherData[13],
            meeting: otherData[14],
            cooperation: otherData[15],
            customList: otherData[16],
            market: otherData[17],
            courier: otherData[18],
            production: otherData[19],
            dayNews: otherData[20],
            stockMarket: otherData[21],
        };

        await ctx.html('finance_index', { allData });
    },
};
