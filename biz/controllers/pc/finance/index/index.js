const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/index',
    domain: 'finance.ifeng.com/index.shtml',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    handler: async ctx => {
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
            ['bannerPic', 'KVProxy', 'getDynamicFragment', 10005, getStringByKey('data')],

            // 头条新闻
            ['headline', 'KVProxy', 'getRecommendFragment', 20003, getStringByKey('data')],

            // 客户权益
            ['rights', 'KVProxy', 'getStaticFragment', 10018, getJsonByKey('content')],

            // 每日要闻
            ['dayNews', 'KVProxy', 'getDynamicFragment', 10006, getStringByKey('data')],

            // 每日要闻多拼新闻
            ['extraNews', 'KVProxy', 'getStaticFragment', 10011, getStringByKey('content')],

            // 推荐新闻
            ['recommend', 'KVProxy', 'getRecommendFragment', 20004, getJsonByKey('data')],

            // 返回连环话数据
            ['comicBook', 'KVProxy', 'getCustom', 'finance_22005_10736_27', getJson()],

            // 大咖说
            ['talking', 'KVProxy', 'getStaticFragment', 10008, getJsonByKey('content')],

            // 财商教育
            ['finance', 'KVProxy', 'getStaticFragment', 10009, getJsonByKey('content')],

            // 炒股大赛
            ['stocks', 'KVProxy', 'getCustom', 'finance_22005_10736_31', getJson()],

            // 大咖说新闻列表
            ['talkingList', 'KVProxy', 'getRecommendFragment', 20005, getStringByKey('data')],

            // 财商教育新闻列表
            ['financeList', 'KVProxy', 'getRecommendFragment', 20006, getStringByKey('data')],

            // 研究院
            ['institute', 'KVProxy', 'getCustom', 'finance_22005_10736_32', getJson()],

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
            ['production', 'KVProxy', 'getStaticFragment', 10017, getJsonByKey('content')],

            // 返回财经视频数据
            ['financeVideo', 'KVProxy', 'getDynamicFragment', 10007, getJson()],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],

            // 二维码
            ['qrCode', 'KVProxy', 'getStaticFragment', 10135, getJsonByKey('content')],
        ];

        let allData = await transfer(ctx, json);
        console.log(allData);
        await ctx.html('finance_index', {
            allData,
        });
    },
};
