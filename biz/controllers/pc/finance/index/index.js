const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.list = {
    path: '/finance',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // console.log('getStaticFragment 10002...');
        let navigation = KVProxy.getStaticFragment(10002).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20002...');
        let bannerPic = KVProxy.getRecommendFragment(20002).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20003...');
        let headline = KVProxy.getRecommendFragment(20003).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getStaticFragment 10011...');
        let extraNews = KVProxy.getStaticFragment(10011).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20004...');
        let recommend = KVProxy.getRecommendFragment(20004).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10008...');
        let talking = KVProxy.getStaticFragment(10008).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10009...');
        let finance = KVProxy.getStaticFragment(10009).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10010...');
        let stocks = KVProxy.getStaticFragment(10010).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20005...');
        let talkingList = KVProxy.getRecommendFragment(20005).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20006...');
        let financeList = KVProxy.getRecommendFragment(20006).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20007...');
        let stocksList = KVProxy.getRecommendFragment(20007).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10012...');
        let titleAd = KVProxy.getStaticFragment(10012).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20008...');
        let institute = KVProxy.getRecommendFragment(20008).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20009...');
        let state = KVProxy.getRecommendFragment(20009).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20010...');
        let meeting = KVProxy.getRecommendFragment(20010).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10015...');
        let cooperation = KVProxy.getStaticFragment(10015).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 17007_719_68...');
        let customList = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        // console.log('getRecommendFragment 10014...');
        let market = KVProxy.getStaticFragment(10014).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10016...');
        let courier = KVProxy.getStaticFragment(10016).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10017...');
        let production = KVProxy.getStaticFragment(10017).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 17007_719_68...');
        let dayNews = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        // console.log('getRecommendFragment 10018...');
        let stockMarket = KVProxy.getStaticFragment(10018).then(...handleJsonByKey(ctx, 'content'));

        // 返回连环话数据
        let comicBook = SearchProxy.list('1-68-', '*', '*', '1', 0, 1, 'newsTime:desc', '*').then(...handleJson(ctx));

        // 返回财经视频数据
        let financeVideo = SearchProxy.list('1-78-', '*', '*', '1', 0, 3, 'id:desc', '*').then(...handleJson(ctx));

        [
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
            meeting,
            cooperation,
            customList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
            comicBook,
            financeVideo,
        ] = await Promise.all([
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
            meeting,
            cooperation,
            customList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
            comicBook,
            financeVideo,
        ]);

        // console.dir(otherData, { depth: null });
        let allData = {
            // navigation: JSON.parse(navigation).content,
            // bannerPic: JSON.parse(bannerPic).data,
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
            meeting,
            cooperation,
            customList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
            comicBook,
            financeVideo,
        };

        await ctx.html('finance_index', { allData });
    },
};
