const { KVProxy } = require('../../../../../providers/ucmsapiProxy');
const { handleJson, handleJsonByKey, handleStringByKey } = require('../../../../../services/common/common');

// 数据处理，过滤掉不必要数据函数 clickRank investInfo newPaper ssComponey

// 静态碎片数据，改为json数据

exports.financeWemoney = {
    path: '/pc/finance/stock/gstzgc',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        // 通用导航
        let nav = KVProxy.getStaticFragment(ctx, 10108).then(...handleJsonByKey(ctx, 'content'));

        // 搜索
        let search = KVProxy.getStaticFragment(ctx, 10129).then(...handleJsonByKey(ctx, 'content'));

        // 顶部logo
        let logo = KVProxy.getStaticFragment(ctx, 10107).then(...handleStringByKey(ctx, 'content'));

        // 顶部通栏广告
        let topAd = KVProxy.getStaticFragment(ctx, 10027).then(...handleJson(ctx));

        // 投资观察A股指数和导航
        let navigation = KVProxy.getStaticFragment(ctx, 10028).then(...handleJsonByKey(ctx, 'content'));

        // 头条新闻
        let headline = KVProxy.getRecommendFragment(ctx, 20035).then(...handleStringByKey(ctx, 'data'));

        // 视频解盘
        let videoAnalysis = KVProxy.getStaticFragment(ctx, 10036).then(...handleJson(ctx));

        // 炒股大赛
        let stockCompetition = KVProxy.getStaticFragment(ctx, 10037).then(...handleJson(ctx));

        // 轮播
        let sliderData = KVProxy.getRecommendFragment(ctx, 20036).then(...handleStringByKey(ctx, 'data'));

        // 文章列表导航
        let paperMenu = KVProxy.getStaticFragment(ctx, 10041).then(...handleJsonByKey(ctx, 'content'));

        // 最新文章
        let newPaper = KVProxy.getCustom(ctx, 'finance_22005_10736_2').then(...handleJson(ctx));

        // 最新文章2条静态碎片
        let newPaperExtra = KVProxy.getStaticFragment(ctx, 10043).then(...handleJsonByKey(ctx, 'content'));

        // 更多最新文章
        let newPaperMore = KVProxy.getStaticFragment(ctx, 10053).then(...handleJsonByKey(ctx, 'content'));

        // 投资情报
        let investInfo = KVProxy.getCustom(ctx, 'finance_22005_10736_3').then(...handleJson(ctx));

        // 更多投资情报
        let investMore = KVProxy.getStaticFragment(ctx, 10054).then(...handleJsonByKey(ctx, 'content'));

        // 上市公司
        let ssComponey = KVProxy.getCustom(ctx, 'finance_22005_10736_1').then(...handleJson(ctx));

        // 更多上市公司
        let ssComMore = KVProxy.getStaticFragment(ctx, 10055).then(...handleJsonByKey(ctx, 'content'));

        // 牛人解盘标题
        let nrjpTitle = KVProxy.getStaticFragment(ctx, 10057).then(...handleStringByKey(ctx, 'content'));

        // 牛人解盘;
        let nrjp = KVProxy.getStaticFragment(ctx, 10056).then(...handleStringByKey(ctx, 'content'));

        // 7*24小时直播标题
        let liveTitle = KVProxy.getStaticFragment(ctx, 10058).then(...handleJsonByKey(ctx, 'content'));

        // 行情标题
        let hqTitle = KVProxy.getStaticFragment(ctx, 10059).then(...handleJsonByKey(ctx, 'content'));

        // A股分析师答疑标题
        let QATitle = KVProxy.getStaticFragment(ctx, 10060).then(...handleJsonByKey(ctx, 'content'));

        // 点击排行标题
        let clickRankTitle = KVProxy.getStaticFragment(ctx, 10061).then(...handleJsonByKey(ctx, 'content'));

        // 点击排行;
        let clickRank = KVProxy.getCustom(ctx, 'http://finance.ifeng.com/cmpp_12006/click/409.html').then(
            ...handleJson(ctx),
        );

        // 视频抓牛股标题
        let spzngTit = KVProxy.getStaticFragment(ctx, 10063).then(...handleJsonByKey(ctx, 'content'));

        // 涨跌排行标题
        let zdphTit = KVProxy.getStaticFragment(ctx, 10064).then(...handleJsonByKey(ctx, 'content'));

        // 资金流向标题
        let zjlxTit = KVProxy.getStaticFragment(ctx, 10065).then(...handleJsonByKey(ctx, 'content'));

        // 自选股标题
        let zxgTit = KVProxy.getStaticFragment(ctx, 10066).then(...handleJsonByKey(ctx, 'content'));

        // 分析师答疑
        let QATabs = KVProxy.getStaticFragment(ctx, 10106).then(...handleJsonByKey(ctx, 'content'));

        // 微信公众号标题
        let wxTitle = KVProxy.getStaticFragment(ctx, 10062).then(...handleJsonByKey(ctx, 'content'));

        // 微信公众号
        let wxPublic = KVProxy.getStaticFragment(ctx, 10068).then(...handleJson(ctx));

        // 版权合作
        let cooperation = KVProxy.getStaticFragment(ctx, 10112).then(...handleStringByKey(ctx, 'content'));

        // 版权
        let copyright = KVProxy.getStaticFragment(ctx, 10114).then(...handleJsonByKey(ctx, 'content'));

        [
            nav,
            search,
            logo,
            topAd,
            navigation,
            headline,
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
            headline,
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
            headline,
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
