const { KVProxy } = require('../../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../../services/common/common');

// 数据处理，过滤掉不必要数据函数 clickRank investInfo newPaper ssComponey

// 静态碎片数据，改为json数据

exports.financeWemoney = {
    path: '/pc/finance/stock/gstzgc',
    method: 'get',
    edit: true,
    type: 'html',
    low: true,
    preview: true,
    handler: async ctx => {
        const json = [
            // 统计代码 Head 片段
            ['statisticsHead', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],

            // 统计代码 Body 片段
            ['statisticsBody', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],

            // 通用导航
            ['nav', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStructuredFragment', 20005, getStringByKey('content')],

            // 顶部logo
            ['logo', 'KVProxy', 'getStaticFragment', 10107, getStringByKey('content')],

            // 顶部通栏广告
            ['topAd', 'KVProxy', 'getStaticFragment', 10027, getJson()],

            // 投资观察A股指数和导航
            ['navigation', 'KVProxy', 'getStaticFragment', 10028, getJsonByKey('content')],

            // 头条新闻
            ['headline', 'KVProxy', 'getRecommendFragment', 20035, getJsonByKey('data')],

            // 视频解盘
            ['videoAnalysis', 'KVProxy', 'getStaticFragment', 10036, getJson()],

            // 炒股大赛
            ['stockCompetition', 'KVProxy', 'getStaticFragment', 10037, getJson()],

            // 轮播
            ['sliderData', 'KVProxy', 'getRecommendFragment', 20036, getJsonByKey('data')],

            // 文章列表导航
            ['paperMenu', 'KVProxy', 'getStaticFragment', 10041, getJsonByKey('content')],

            // 最新文章
            // ['newPaper', 'KVProxy', 'getCustom', 'finance_22005_10736_2', getJson()],
            ['newPaper', 'KVProxy', 'getDynamicFragment', '20041', getStringByKey('data')],

            // 最新文章2条静态碎片
            ['newPaperExtra', 'KVProxy', 'getStaticFragment', 10043, getJsonByKey('content')],

            // 更多最新文章
            ['newPaperMore', 'KVProxy', 'getStaticFragment', 10053, getJsonByKey('content')],

            // 投资情报
            // ['investInfo', 'KVProxy', 'getCustom', 'finance_22005_10736_3', getJson()],
            ['investInfo', 'KVProxy', 'getDynamicFragment', '20042', getStringByKey('data')],

            // 更多投资情报
            ['investMore', 'KVProxy', 'getStaticFragment', 10054, getJsonByKey('content')],

            // 上市公司
            // ['ssComponey', 'KVProxy', 'getCustom', 'finance_22005_10736_1', getJson()],
            ['ssComponey', 'KVProxy', 'getDynamicFragment', '20043', getStringByKey('data')],

            // 更多上市公司
            ['ssComMore', 'KVProxy', 'getStaticFragment', 10055, getJsonByKey('content')],

            // 牛人解盘标题
            ['nrjpTitle', 'KVProxy', 'getStaticFragment', 10057, getStringByKey('content')],

            // 牛人解盘;
            ['nrjp', 'KVProxy', 'getStaticFragment', 10056, getStringByKey('content')],

            // 7*24小时直播标题
            ['liveTitle', 'KVProxy', 'getStaticFragment', 10058, getJsonByKey('content')],

            // 行情标题
            ['hqTitle', 'KVProxy', 'getStaticFragment', 10059, getJsonByKey('content')],

            // A股分析师答疑标题
            ['QATitle', 'KVProxy', 'getStaticFragment', 10060, getJsonByKey('content')],

            // 点击排行标题
            ['clickRankTitle', 'KVProxy', 'getStaticFragment', 10061, getJsonByKey('content')],

            // 点击排行;
            ['clickRank', 'KVProxy', 'getCustom', 'http://finance.ifeng.com/cmpp_12006/click/409.html', getJson()],

            // 视频抓牛股标题
            ['spzngTit', 'KVProxy', 'getStaticFragment', 10063, getJsonByKey('content')],

            // 涨跌排行标题
            ['zdphTit', 'KVProxy', 'getStaticFragment', 10064, getJsonByKey('content')],

            // 资金流向标题
            ['zjlxTit', 'KVProxy', 'getStaticFragment', 10065, getJsonByKey('content')],

            // 自选股标题
            ['zxgTit', 'KVProxy', 'getStaticFragment', 10066, getJsonByKey('content')],

            // 分析师答疑
            ['QATabs', 'KVProxy', 'getStaticFragment', 10106, getJsonByKey('content')],

            // 微信公众号标题
            ['wxTitle', 'KVProxy', 'getStaticFragment', 10062, getJsonByKey('content')],

            // 微信公众号
            ['wxPublic', 'KVProxy', 'getStaticFragment', 10068, getJson()],

            // 版权合作
            ['cooperation', 'KVProxy', 'getStaticFragment', 10112, getStringByKey('content')],

            // 版权
            ['copyright', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],
        ];
        const allData = await transfer(ctx, json);

        const statisticsData = {
            statisticsHead: allData.statisticsHead,
            statisticsBody: allData.statisticsBody,
        };

        delete allData.statisticsHead;
        delete allData.statisticsBody;

        await ctx.html('finance_stock_gstzgc', {
            allData,
            statisticsData,
        });
    },
};
