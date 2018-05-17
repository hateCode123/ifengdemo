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

        // Logo
        let logo = KVProxy.getStaticFragment(10131).then(...handleJsonByKey(ctx, 'content'));

        // Logo Ad
        let logoAd = KVProxy.getStaticFragment(10132).then(...handleJsonByKey(ctx, 'content'));

        // 财经首页导航
        let navigation = KVProxy.getStaticFragment(10002).then(...handleJsonByKey(ctx, 'content'));

        // 焦点图
        let bannerPic = KVProxy.getRecommendFragment(20002).then(...handleJsonByKey(ctx, 'data'));

        // 头条新闻
        let headline = KVProxy.getRecommendFragment(20003).then(...handleJsonByKey(ctx, 'data'));

        // 头条新闻多拼新闻
        let extraNews = KVProxy.getStaticFragment(10011).then(...handleJs(ctx, 'content'));

        // 推荐新闻
        let recommend = KVProxy.getRecommendFragment(20004).then(...handleJsonByKey(ctx, 'data'));

        // 大咖说
        let talking = KVProxy.getStaticFragment(10008).then(...handleJsonByKey(ctx, 'content'));

        // 财商教育
        let finance = KVProxy.getStaticFragment(10009).then(...handleJsonByKey(ctx, 'content'));

        // 炒股大赛
        let stocks = KVProxy.getStaticFragment(10010).then(...handleJsonByKey(ctx, 'content'));

        // 大咖说新闻列表
        let talkingList = KVProxy.getRecommendFragment(20005).then(...handleJsonByKey(ctx, 'data'));

        // 财商教育新闻列表
        let financeList = KVProxy.getRecommendFragment(20006).then(...handleJsonByKey(ctx, 'data'));

        // 炒股大赛新闻列表
        let stocksList = KVProxy.getRecommendFragment(20007).then(...handleJsonByKey(ctx, 'data'));

        // 标题广告
        let titleAd = KVProxy.getStaticFragment(10012).then(...handleJs(ctx, 'content'));

        // 研究院
        let institute = KVProxy.getRecommendFragment(20008).then(...handleJsonByKey(ctx, 'data'));

        // 专题会议
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
        let footer = KVProxy.getStaticFragment(10114).then(...handleJsonByKey(ctx, 'content'));

        // 二维码
        let qrCode = KVProxy.getStaticFragment(10135).then(...handleJsonByKey(ctx, 'content'));

        [
            nav,
            search,
            logo,
            logoAd,
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
            qrCode,
        ] = await Promise.all([
            nav,
            search,
            logo,
            logoAd,
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
            qrCode,
        ]);

        const allData = {
            nav,
            search,
            logo,
            logoAd,
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
            qrCode,
        };

        await ctx.html('finance_index', {
            allData
        });
    },
};
