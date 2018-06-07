const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const {
    promiseAll,
    jsonParse,
    handleData,
    handleJson,
    handleJsonByKey,
    handleJs,
    handleStringByKey,
    transfer,
    getJson,
    getJsonByKey,
    getStringByKey,
} = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/index',
    domain: 'finance.ifeng.com/index.shtml',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // let jsons = [
        //     ['customList', 'KVProxy', 'getCustom', '17007_719_68', getJson()],
        //     ['stockList', 'KVProxy', 'getCustom', 'finance_22005_10736_30', getJson()],
        //     ['macroList', 'KVProxy', 'getCustom', 'finance_22005_10736_24', getJson()],
        //     ['dayNews', 'KVProxy', 'getCustom', '17007_719_68', getJson()],
        //     ['wemoneyList', 'KVProxy', 'getCustom', 'finance_22005_10736_26', getJson()],
        //     ['imarketsList', 'KVProxy', 'getCustom', 'finance_22005_10736_25', getJson()],
        //     ['financeVideo', 'KVProxy', 'getCustom', 'finance_22005_10736_28', getJson()],
        //     ['companyList', 'KVProxy', 'getCustom', 'finance_22005_10736_29', getJson()],
        //     ['comicBook', 'KVProxy', 'getCustom', 'finance_22005_10736_27', getJson()],
        // ];
        // let getCustoms = await transfer(ctx, jsons);

        // // let single = await KVProxy.getCustom(ctx, '17007_719_68').then(...handleJson(ctx));
        // return (ctx.body = { getCustoms });

        // let data = await KVProxy.getStaticFragment(ctx, 10156).then(...handleJson(ctx));
        // console.log(data);
        //     let arr =  [
        //         ['nav',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['search',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['logo',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['nav',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['nav',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['nav',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['nav',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //         ['nav',KVProxy,'getStaticFragment',10108,handleJsonByKey(ctx, 'content')],
        //     ];
        // let alldata1 = await transfer(arr)

        let json = [
            ['nav', 'KVProxy', 'getStaticFragment', 10108, getJsonByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStaticFragment', 10129, getJsonByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStaticFragment', 10131, getJsonByKey('content')],

            // Logo Ad
            ['logoAd', 'KVProxy', 'getStaticFragment', 10132, getJsonByKey('content')],

            // 财经首页导航
            ['navigation', 'KVProxy', 'getStaticFragment', 10002, getJsonByKey('content')],

            // 焦点图
            ['bannerPic', 'KVProxy', 'getRecommendFragment', 20002, getJsonByKey('data')],

            // 头条新闻
            ['headline', 'KVProxy', 'getRecommendFragment', 20003, getStringByKey('data')],

            // 头条新闻多拼新闻
            ['extraNews', 'KVProxy', 'getStaticFragment', 10011, getStringByKey('content')],

            // 推荐新闻
            ['recommend', 'KVProxy', 'getRecommendFragment', 20004, getJsonByKey('data')],

            // 大咖说
            ['talking', 'KVProxy', 'getStaticFragment', 10008, getJsonByKey('content')],

            // 财商教育
            ['finance', 'KVProxy', 'getStaticFragment', 10009, getJsonByKey('content')],

            // 炒股大赛
            ['stocks', 'KVProxy', 'getStaticFragment', 10010, getJsonByKey('content')],

            // 大咖说新闻列表
            ['talkingList', 'KVProxy', 'getRecommendFragment', 20005, getStringByKey('data')],

            // 财商教育新闻列表
            ['financeList', 'KVProxy', 'getRecommendFragment', 20006, getStringByKey('data')],

            // 炒股大赛新闻列表
            ['stocksList', 'KVProxy', 'getRecommendFragment', 20007, getStringByKey('data')],

            // 标题广告
            ['titleAd', 'KVProxy', 'getStaticFragment', 10012, getStringByKey('content')],

            // 研究院
            ['institute', 'KVProxy', 'getRecommendFragment', 20008, getStringByKey('data')],

            // 专题会议
            ['meeting', 'KVProxy', 'getRecommendFragment', 20010, getStringByKey('data')],

            // 底部合作链接
            ['cooperation', 'KVProxy', 'getStaticFragment', 10015, getStringByKey('content')],

            // 信息流首页抓取数据
            ['customList', 'KVProxy', 'getCustom', '17007_719_68', getJson()],

            // 信息流宏观抓取数据
            ['macroList', 'KVProxy', 'getCustom', 'finance_22005_10736_24', getJson()],

            // 信息流股票抓取数据
            ['stockList', 'KVProxy', 'getCustom', 'finance_22005_10736_30', getJson()],

            // 信息流imarkets 抓取数据
            ['imarketsList', 'KVProxy', 'getCustom', 'finance_22005_10736_25', getJson()],

            // 信息流公司抓取数据
            ['companyList', 'KVProxy', 'getCustom', 'finance_22005_10736_29', getJson()],

            // 信息流Wemoney 抓取数据
            ['wemoneyList', 'KVProxy', 'getCustom', 'finance_22005_10736_26', getJson()],

            // 理财超市
            ['market', 'KVProxy', 'getStaticFragment', 10014, getStringByKey('content')],

            // 理财速递
            ['courier', 'KVProxy', 'getStaticFragment', 10016, getJsonByKey('content')],

            // 投顾产品
            ['production', 'KVProxy', 'getStaticFragment', 10017, getStringByKey('content')],

            // 每日要闻
            ['dayNews', 'KVProxy', 'getCustom', '17007_719_68', getJson()],

            // 股票超市静态碎片
            ['stockMarket', 'KVProxy', 'getStaticFragment', 10018, getStringByKey('content')],

            // 返回连环话数据
            ['comicBook', 'KVProxy', 'getCustom', 'finance_22005_10736_27', getJson()],

            // 返回财经视频数据
            ['financeVideo', 'KVProxy', 'getCustom', 'finance_22005_10736_28', getJson()],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],

            // 二维码
            ['qrCode', 'KVProxy', 'getStaticFragment', 10135, getJsonByKey('content')],
        ];

        let allData = await transfer(ctx, json);
        await ctx.html('finance_index', {
            allData,
        });

        // 页面公用导航
        // let json = {
        //     nav: KVProxy.getStaticFragment(ctx, 10108).then(...handleJsonByKey(ctx, 'content')),

        //     // 搜索
        //     search: KVProxy.getStaticFragment(ctx, 10129).then(...handleJsonByKey(ctx, 'content')),

        //     // Logo
        //     logo: KVProxy.getStaticFragment(ctx, 10131).then(...handleJsonByKey(ctx, 'content')),

        //     // Logo Ad
        //     logoAd: KVProxy.getStaticFragment(ctx, 10132).then(...handleJsonByKey(ctx, 'content')),

        //     // 财经首页导航
        //     navigation: KVProxy.getStaticFragment(ctx, 10002).then(...handleJsonByKey(ctx, 'content')),

        //     // 焦点图
        //     bannerPic: KVProxy.getRecommendFragment(ctx, 20002).then(...handleJsonByKey(ctx, 'data')),

        //     // 头条新闻
        //     headline: KVProxy.getRecommendFragment(ctx, 20003).then(...handleStringByKey(ctx, 'data')),

        //     // 头条新闻多拼新闻
        //     extraNews: KVProxy.getStaticFragment(ctx, 10011).then(...handleJs(ctx, 'content')),

        //     // 推荐新闻
        //     recommend: KVProxy.getRecommendFragment(ctx, 20004).then(...handleJsonByKey(ctx, 'data')),

        //     // 大咖说
        //     talking: KVProxy.getStaticFragment(ctx, 10008).then(...handleJsonByKey(ctx, 'content')),

        //     // 财商教育
        //     finance: KVProxy.getStaticFragment(ctx, 10009).then(...handleJsonByKey(ctx, 'content')),

        //     // 炒股大赛
        //     stocks: KVProxy.getStaticFragment(ctx, 10010).then(...handleJsonByKey(ctx, 'content')),

        //     // 大咖说新闻列表
        //     talkingList: KVProxy.getRecommendFragment(ctx, 20005).then(...handleStringByKey(ctx, 'data')),

        //     // 财商教育新闻列表
        //     financeList: KVProxy.getRecommendFragment(ctx, 20006).then(...handleStringByKey(ctx, 'data')),

        //     // 炒股大赛新闻列表
        //     stocksList: KVProxy.getRecommendFragment(ctx, 20007).then(...handleStringByKey(ctx, 'data')),

        //     // 标题广告
        //     titleAd: KVProxy.getStaticFragment(ctx, 10012).then(...handleJs(ctx, 'content')),

        //     // 研究院
        //     institute: KVProxy.getRecommendFragment(ctx, 20008).then(...handleStringByKey(ctx, 'data')),

        //     // 专题会议
        //     meeting: KVProxy.getRecommendFragment(ctx, 20010).then(...handleStringByKey(ctx, 'data')),

        //     // 底部合作链接
        //     cooperation: KVProxy.getStaticFragment(ctx, 10015).then(...handleJs(ctx, 'content')),

        //     // 信息流首页抓取数据
        //     customList: KVProxy.getCustom(ctx, '17007_719_68').then(...handleJson(ctx)),

        //     // 信息流宏观抓取数据
        //     macroList: KVProxy.getCustom(ctx, 'finance_22005_10736_24').then(...handleJson(ctx)),

        //     // 信息流股票抓取数据
        //     stockList: KVProxy.getCustom(ctx, 'finance_22005_10736_30').then(...handleJson(ctx)),

        //     // 信息流imarkets 抓取数据
        //     imarketsList: KVProxy.getCustom(ctx, 'finance_22005_10736_25').then(...handleJson(ctx)),

        //     // 信息流公司抓取数据
        //     companyList: KVProxy.getCustom(ctx, 'finance_22005_10736_29').then(...handleJson(ctx)),

        //     // 信息流Wemoney 抓取数据
        //     wemoneyList: KVProxy.getCustom(ctx, 'finance_22005_10736_26').then(...handleJson(ctx)),

        //     // 理财超市
        //     market: KVProxy.getStaticFragment(ctx, 10014).then(...handleJs(ctx, 'content')),

        //     // 理财速递
        //     courier: KVProxy.getStaticFragment(ctx, 10016).then(...handleJsonByKey(ctx, 'content')),

        //     // 投顾产品
        //     production: KVProxy.getStaticFragment(ctx, 10017).then(...handleJs(ctx, 'content')),

        //     // 每日要闻
        //     dayNews: KVProxy.getCustom(ctx, '17007_719_68').then(...handleJson(ctx)),

        //     // 股票超市静态碎片
        //     stockMarket: KVProxy.getStaticFragment(ctx, 10018).then(...handleJs(ctx, 'content')),

        //     // 返回连环话数据
        //     comicBook: KVProxy.getCustom(ctx, 'finance_22005_10736_27').then(...handleJson(ctx)),

        //     // 返回财经视频数据
        //     financeVideo: KVProxy.getCustom(ctx, 'finance_22005_10736_28').then(...handleJson(ctx)),

        //     // 底部公用版权
        //     footer: KVProxy.getStaticFragment(ctx, 10114).then(...handleJsonByKey(ctx, 'content')),

        //     // 二维码
        //     qrCode: KVProxy.getStaticFragment(ctx, 10135).then(...handleJsonByKey(ctx, 'content')),
        // };

        // let allData = await promiseAll(json);
        // await ctx.html('finance_index', {
        //     allData,
        // });
    },
};
