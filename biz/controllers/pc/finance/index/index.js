const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const {
    KVProxy,
    SearchProxy
} = require('../../../../providers/ucmsapiProxy');
const {
    jsonParse,
    handleData,
    handleJson,
    handleJsonByKey,
    handleJs
} = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/index',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // 页面公用导航
        let nav = KVProxy.getStaticFragment(10108).then(...handleJsonByKey(ctx, 'content'));

        // 搜索
        let search = KVProxy.getStaticFragment(10129).then(...handleJsonByKey(ctx, 'content'));

        // 财经首页导航
        let navigation = KVProxy.getStaticFragment(10002).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20002...');
        let bannerPic = KVProxy.getRecommendFragment(20002).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20003...');
        let headline = KVProxy.getRecommendFragment(20003).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getStaticFragment 10011...');
        let extraNews = KVProxy.getStaticFragment(10011).then(...handleJs(ctx, 'content'));

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
        let titleAd = KVProxy.getStaticFragment(10012).then(...handleJs(ctx, 'content'));

        // console.log('getRecommendFragment 20008...');
        let institute = KVProxy.getRecommendFragment(20008).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 20010...');
        let meeting = KVProxy.getRecommendFragment(20010).then(...handleJsonByKey(ctx, 'data'));

        // 底部合作链接
        let cooperation = KVProxy.getStaticFragment(10015).then(...handleJs(ctx, 'content'));

        // 信息流首页抓取数据
        let customList = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        // 信息流宏观抓取数据
        let macroList = KVProxy.getCustom('finance_22005_10736_24').then(...handleJson(ctx));

        // 信息流股票抓取数据
        let stockList = KVProxy.getCustom('finance_22005_10736_30').then(...handleJson(ctx));

        // 信息流imarkets 抓取数据
        let imarketsList = KVProxy.getCustom('finance_22005_10736_25').then(...handleJson(ctx));

        // 信息流公司抓取数据
        let companyList = KVProxy.getCustom('finance_22005_10736_29').then(...handleJson(ctx));

        // 信息流Wemoney 抓取数据
        let wemoneyList = KVProxy.getCustom('finance_22005_10736_26').then(...handleJson(ctx));

        // 理财超市
        let market = KVProxy.getStaticFragment(10014).then(...handleJs(ctx, 'content'));

        // 理财速递
        let courier = KVProxy.getStaticFragment(10016).then(...handleJsonByKey(ctx, 'content'));

        // 投顾产品
        let production = KVProxy.getStaticFragment(10017).then(...handleJs(ctx, 'content'));

        // 每日要闻
        let dayNews = KVProxy.getCustom('17007_719_68').then(...handleJson(ctx));

        // 股票超市静态碎片
        let stockMarket = KVProxy.getStaticFragment(10018).then(...handleJs(ctx, 'content'));

        // 返回连环话数据
        let comicBook = KVProxy.getCustom('finance_22005_10736_27').then(...handleJson(ctx));

        // 返回财经视频数据
        let financeVideo = KVProxy.getCustom('finance_22005_10736_28').then(...handleJson(ctx));

        // 底部公用版权
        let footer = KVProxy.getStaticFragment(10114).then(...handleJs(ctx, 'content'));

        [
            nav,
            search,
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
            macroList,
            stockList,
            imarketsList,
            companyList,
            wemoneyList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
            comicBook,
            financeVideo,
            footer,
        ] = await Promise.all([
            nav,
            search,
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
            macroList,
            stockList,
            imarketsList,
            companyList,
            wemoneyList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
            comicBook,
            financeVideo,
            footer,
        ]);

        let allData = {
            nav,
            search,
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
            macroList,
            stockList,
            imarketsList,
            companyList,
            wemoneyList,
            market,
            courier,
            production,
            dayNews,
            stockMarket,
            comicBook,
            financeVideo,
            footer,
        };

        await ctx.html('finance_index', {
            allData
        });
    },
};
