const { KVProxy } = require('../../../../../providers/ucmsapiProxy');
const { handleJson, handleJsonByKey } = require('../../../../../services/common/common');

// 数据处理，过滤掉不必要数据函数 clickRank investInfo newPaper ssComponey

// 静态碎片数据，改为json数据

exports.financeWemoney = {
    path: '/pc/finance/stock/gstzgc',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        // 通用导航
        let nav = KVProxy.getStaticFragment(10108).then(...handleJsonByKey(ctx, 'content'));

        // 搜索
        let search = KVProxy.getStaticFragment(10129).then(...handleJsonByKey(ctx, 'content'));

        // 顶部通栏广告
        let logo = KVProxy.getStaticFragment(10107).then(...handleJsonByKey(ctx, 'content'));

        // 顶部通栏广告
        let topAd = KVProxy.getStaticFragment(10027).then(...handleJson(ctx));

        // 投资观察A股指数和导航
        let navigation = KVProxy.getStaticFragment(10028).then(...handleJsonByKey(ctx, 'content'));

        // 新闻头条1
        let headlineNews1 = KVProxy.getStaticFragment(10030).then(...handleJson(ctx));

        // 新闻头条2
        let headlineNews2 = KVProxy.getStaticFragment(10031).then(...handleJson(ctx));

        // 新闻头条3
        let headlineNews3 = KVProxy.getStaticFragment(10032).then(...handleJson(ctx));

        // 新闻头条4
        let headlineNews4 = KVProxy.getStaticFragment(10033).then(...handleJson(ctx));

        // 新闻头条5
        let headlineNews5 = KVProxy.getStaticFragment(10034).then(...handleJson(ctx));

        // 视频解盘
        let videoAnalysis = KVProxy.getStaticFragment(10036).then(...handleJson(ctx));

        // 炒股大赛
        let stockCompetition = KVProxy.getStaticFragment(10037).then(...handleJson(ctx));

        // 轮播
        let sliderData = KVProxy.getStaticFragment(10116).then(...handleJsonByKey(ctx, 'content'));

        // 文章列表导航
        let paperMenu = KVProxy.getStaticFragment(10041).then(...handleJsonByKey(ctx, 'content'));

        // 最新文章
        let newPaper = KVProxy.getCustom('finance_22005_10736_2').then(...handleJson(ctx));

        // 最新文章2条静态碎片
        let newPaperExtra = KVProxy.getStaticFragment(10043).then(...handleJsonByKey(ctx, 'content'));

        // 更多最新文章
        let newPaperMore = KVProxy.getStaticFragment(10053).then(...handleJsonByKey(ctx, 'content'));

        // 投资情报
        let investInfo = KVProxy.getCustom('finance_22005_10736_3').then(...handleJson(ctx));

        // 更多投资情报
        let investMore = KVProxy.getStaticFragment(10054).then(...handleJsonByKey(ctx, 'content'));

        // 上市公司
        let ssComponey = KVProxy.getCustom('finance_22005_10736_1').then(...handleJson(ctx));

        // 更多上市公司
        let ssComMore = KVProxy.getStaticFragment(10055).then(...handleJsonByKey(ctx, 'content'));

        // 牛人解盘标题
        let nrjpTitle = KVProxy.getStaticFragment(10057).then(...handleJsonByKey(ctx, 'content'));

        // 牛人解盘;
        let nrjp = KVProxy.getStaticFragment(10056).then(...handleJsonByKey(ctx, 'content'));

        // 7*24小时直播标题
        let liveTitle = KVProxy.getStaticFragment(10058).then(...handleJsonByKey(ctx, 'content'));

        // 行情标题
        let hqTitle = KVProxy.getStaticFragment(10059).then(...handleJsonByKey(ctx, 'content'));

        // A股分析师答疑标题
        let QATitle = KVProxy.getStaticFragment(10060).then(...handleJsonByKey(ctx, 'content'));

        // 点击排行标题
        let clickRankTitle = KVProxy.getStaticFragment(10061).then(...handleJsonByKey(ctx, 'content'));

        // 点击排行;
        let clickRank = KVProxy.getCustom('http://finance.ifeng.com/cmpp_12006/click/409.html').then(
            ...handleJson(ctx),
        );

        // 视频抓牛股标题
        let spzngTit = KVProxy.getStaticFragment(10063).then(...handleJsonByKey(ctx, 'content'));

        // 涨跌排行标题
        let zdphTit = KVProxy.getStaticFragment(10064).then(...handleJsonByKey(ctx, 'content'));

        // 资金流向标题
        let zjlxTit = KVProxy.getStaticFragment(10065).then(...handleJsonByKey(ctx, 'content'));

        // 自选股标题
        let zxgTit = KVProxy.getStaticFragment(10066).then(...handleJsonByKey(ctx, 'content'));

        // 分析师答疑
        let QATabs = KVProxy.getStaticFragment(10106).then(...handleJsonByKey(ctx, 'content'));

        // 微信公众号标题
        let wxTitle = KVProxy.getStaticFragment(10062).then(...handleJsonByKey(ctx, 'content'));

        // 微信公众号
        let wxPublic = KVProxy.getStaticFragment(10068).then(...handleJson(ctx));

        // 版权合作
        let cooperation = KVProxy.getStaticFragment(10112).then(...handleJsonByKey(ctx, 'content'));

        // 版权
        let copyright = KVProxy.getStaticFragment(10114).then(...handleJsonByKey(ctx, 'content'));

        [
            nav,
            search,
            logo,
            topAd,
            navigation,
            headlineNews1,
            headlineNews2,
            headlineNews3,
            headlineNews4,
            headlineNews5,
            videoAnalysis,
            stockCompetition,
            sliderData,
            paperMenu,
            newPaper,
            newPaperExtra,
            investInfo,
            ssComponey,
            newPaperMore,
            investMore,
            ssComMore,
            nrjpTitle,
            nrjp,
            liveTitle,
            hqTitle,
            QATitle,
            clickRankTitle,
            wxTitle,
            spzngTit,
            zdphTit,
            zjlxTit,
            zxgTit,
            clickRank,
            wxPublic,
            QATabs,
            cooperation,
            copyright,
        ] = await Promise.all([
            nav,
            search,
            logo,
            topAd,
            navigation,
            headlineNews1,
            headlineNews2,
            headlineNews3,
            headlineNews4,
            headlineNews5,
            videoAnalysis,
            stockCompetition,
            sliderData,
            paperMenu,
            newPaper,
            newPaperExtra,
            investInfo,
            ssComponey,
            newPaperMore,
            investMore,
            ssComMore,
            nrjpTitle,
            nrjp,
            liveTitle,
            hqTitle,
            QATitle,
            clickRankTitle,
            wxTitle,
            spzngTit,
            zdphTit,
            zjlxTit,
            zxgTit,
            clickRank,
            wxPublic,
            QATabs,
            cooperation,
            copyright,
        ]);

        const allData = {
            nav,
            search,
            logo,
            topAd,
            navigation,
            headlineNews1,
            headlineNews2,
            headlineNews3,
            headlineNews4,
            headlineNews5,
            videoAnalysis,
            stockCompetition,
            sliderData,
            paperMenu,
            newPaper,
            newPaperExtra,
            investInfo,
            ssComponey,
            newPaperMore,
            investMore,
            ssComMore,
            nrjpTitle,
            nrjp,
            liveTitle,
            hqTitle,
            QATitle,
            clickRankTitle,
            wxTitle,
            spzngTit,
            zdphTit,
            zjlxTit,
            zxgTit,
            clickRank,
            wxPublic,
            QATabs,
            cooperation,
            copyright,
        };

        await ctx.html('finance_stock_gstzgc', {
            allData,
        });
    },
};
