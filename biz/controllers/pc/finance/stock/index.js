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
    path: '/pc/finance/stock',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // 页面公用导航
        let nav = KVProxy.getStaticFragment(10108).then(...handleJsonByKey(ctx, 'content'));

        // 股票导航
        let navigation = KVProxy.getStaticFragment(10038).then(...handleJsonByKey(ctx, 'content'));

        // 股票子导航
        let subNavigation = KVProxy.getStaticFragment(10040).then(...handleJsonByKey(ctx, 'content'));

        // 股票显示样式
        let stockPlateStyle = KVProxy.getStaticFragment(10086).then(...handleJsonByKey(ctx, 'content'));

        // 股票显示
        let stockPlate = KVProxy.getSsiFragment('finance.ifeng.com/app/zq/caterank.html').then(...handleData(ctx));

        // 动画
        let animationPic = KVProxy.getStaticFragment(10085).then(...handleJsonByKey(ctx, 'content'));

        // 跳转链接
        let jumpLink = KVProxy.getStaticFragment(10044).then(...handleJs(ctx, 'content'));

        // 头条新闻
        let headline = KVProxy.getRecommendFragment(20018).then(...handleJsonByKey(ctx, 'data'));

        // 要闻直播标题
        let newsLiveTab = KVProxy.getStaticFragment(10049).then(...handleJsonByKey(ctx, 'content'));

        // 要闻直播标题外链
        let newsLiveTabLink = KVProxy.getStaticFragment(10115).then(...handleJsonByKey(ctx, 'content'));

        // 直播 Logo
        let liveLogo = KVProxy.getStaticFragment(10052).then(...handleJsonByKey(ctx, 'content'));

        // 股市要闻
        let stockNews1 = SearchProxy.list('1-62-84-', '*', '*', '1', 0, 6, '', '*').then(...handleJson(ctx));

        let stockNews2 = SearchProxy.list('1-62-84-', '*', '*', '1', 6, 6, '', '*').then(...handleJson(ctx));

        let stockNews3 = SearchProxy.list('1-62-84-', '*', '*', '1', 12, 6, '', '*').then(...handleJson(ctx));

        // 轮播新闻
        let broadcast = SearchProxy.list('1-62-84-', '*', '*', '1', 18, 10, '', '*').then(...handleJson(ctx));

        // 公司要闻标题
        let newsTab = KVProxy.getStaticFragment(10050).then(...handleJsonByKey(ctx, 'content'));

        // 公司要闻子标题
        let newsSubTab = KVProxy.getStaticFragment(10117).then(...handleJsonByKey(ctx, 'content'));

        // 公司要闻
        let news = SearchProxy.list('1-62-83-', '*', '*', '1', 0, 24, '', '*').then(...handleJson(ctx));

        // 牛人解盘标题
        let answerTab = KVProxy.getStaticFragment(10051).then(...handleJsonByKey(ctx, 'content'));

        // 牛人解盘子标题
        let answerSubTab = KVProxy.getStaticFragment(10118).then(...handleJsonByKey(ctx, 'content'));

        // 牛人解盘
        let answerList = KVProxy.getRecommendFragment(20019).then(...handleJsonByKey(ctx, 'data'));

        // 视频抓牛股标题
        let cattleStocksTitle = KVProxy.getStaticFragment(10100).then(...handleJsonByKey(ctx, 'content'));

        // 涨跌排行榜标题
        let rankTitle = KVProxy.getStaticFragment(10101).then(...handleJsonByKey(ctx, 'content'));

        // 资金流向标题
        let fundsFlowTitle = KVProxy.getStaticFragment(10102).then(...handleJsonByKey(ctx, 'content'));

        // 自选股登录标题
        let customStocksTitle = KVProxy.getStaticFragment(10103).then(...handleJsonByKey(ctx, 'content'));

        // 分析师答疑标题
        let QATitle = KVProxy.getStaticFragment(10104).then(...handleJsonByKey(ctx, 'content'));

        // 分析师答疑
        let QATabs = KVProxy.getStaticFragment(10105).then(...handleJsonByKey(ctx, 'content'));

        // 轮播图
        let bannerPic = KVProxy.getStaticFragment(10075).then(...handleJsonByKey(ctx, 'content'));

        // 热点专题标题
        let subjectTitle = KVProxy.getStaticFragment(10076).then(...handleJsonByKey(ctx, 'content'));

        // 热点专题
        let subject = KVProxy.getStaticFragment(10079).then(...handleJs(ctx, 'content'));

        // 理财超市标题
        let marketTitle = KVProxy.getStaticFragment(10077).then(...handleJsonByKey(ctx, 'content'));

        // 理财超市
        let market = KVProxy.getStaticFragment(10080).then(...handleJs(ctx, 'content'));

        // 理财速递标题
        let courierTitle = KVProxy.getStaticFragment(10119).then(...handleJsonByKey(ctx, 'content'));

        // 理财速递
        let courier = KVProxy.getStaticFragment(10082).then(...handleJsonByKey(ctx, 'content'));

        // 视频播放项
        let playItem = KVProxy.getStaticFragment(10083).then(...handleJsonByKey(ctx, 'content'));

        // 跳转链接列表
        let linkList = KVProxy.getStaticFragment(10084).then(...handleJsonByKey(ctx, 'content'));

        // 每日论股标题
        let dayStockTitle = KVProxy.getStaticFragment(10078).then(...handleJsonByKey(ctx, 'content'));

        // 每日论股
        let dayStock = KVProxy.getStaticFragment(10081).then(...handleJs(ctx, 'content'));

        // 操盘热点标题
        let hotSpotsTitle = KVProxy.getStaticFragment(10067).then(...handleJsonByKey(ctx, 'content'));

        // 操盘分析标题
        let hotSpotsSubTitle1 = KVProxy.getStaticFragment(10070).then(...handleJsonByKey(ctx, 'content'));

        // 热点板块标题
        let hotSpotsSubTitle2 = KVProxy.getStaticFragment(10071).then(...handleJsonByKey(ctx, 'content'));

        // 操盘分析
        let marketAnalysis = SearchProxy.list('1-62-85-', '*', '*', '1', 0, 100, '', '*').then(...handleJson(ctx));

        // 热点板块
        let hotPlate = SearchProxy.list('1-62-87-', '*', '*', '1', 0, 100, '', '*').then(...handleJson(ctx));

        // 行业概念资金流向标题
        let industryTitle = KVProxy.getStaticFragment(10120).then(...handleJsonByKey(ctx, 'content'));

        // 行业概念资金流向
        let industry = KVProxy.getStaticFragment(10087).then(...handleJsonByKey(ctx, 'content'));

        // 个股资金流向标题
        let singleStockTitle = KVProxy.getStaticFragment(10088).then(...handleJsonByKey(ctx, 'content'));

        // 市场雷达
        let marketRadar = KVProxy.getStaticFragment(10089).then(...handleJsonByKey(ctx, 'content'));

        // 大单追踪
        let track = KVProxy.getStaticFragment(10090).then(...handleJsonByKey(ctx, 'content'));

        // 5日增减仓
        let fiveDays = KVProxy.getStaticFragment(10091).then(...handleJsonByKey(ctx, 'content'));

        // 高手学堂标题
        let schoolTitle = KVProxy.getStaticFragment(10069).then(...handleJsonByKey(ctx, 'content'));

        // 高手操盘日志标题
        let schoolSubTitle1 = KVProxy.getStaticFragment(10072).then(...handleJsonByKey(ctx, 'content'));

        // 股民学校标题
        let schoolSubTitle2 = KVProxy.getStaticFragment(10073).then(...handleJsonByKey(ctx, 'content'));

        // 高手操盘日志
        let logs = SearchProxy.list('1-67-96-', '*', '*', '1', 0, 10, '', '*').then(...handleJson(ctx));

        // 股民学校
        let school = SearchProxy.list('1-67-101-', '*', '*', '1', 0, 10, '', '*').then(...handleJson(ctx));

        // 明星分析师标题
        let starAnalystTitle = KVProxy.getStaticFragment(10092).then(...handleJsonByKey(ctx, 'content'));

        // 明星分析师数据
        let starAnalyst = KVProxy.getStaticFragment(10093).then(...handleJsonByKey(ctx, 'content'));

        // 研报选股标题
        let stockPickingTitle = KVProxy.getStaticFragment(10094).then(...handleJsonByKey(ctx, 'content'));

        // 机构荐股池
        let stockPickingData0 = KVProxy.getStaticFragment(10095).then(...handleJsonByKey(ctx, 'content'));

        // 目标涨幅最大
        let stockPickingData1 = KVProxy.getStaticFragment(10096).then(...handleJsonByKey(ctx, 'content'));

        // 评级调高个股
        let stockPickingData2 = KVProxy.getStaticFragment(10097).then(...handleJsonByKey(ctx, 'content'));

        // 机构首次关注股
        let stockPickingData3 = KVProxy.getStaticFragment(10098).then(...handleJsonByKey(ctx, 'content'));

        // 机构关注度最高
        let stockPickingData4 = KVProxy.getStaticFragment(10099).then(...handleJsonByKey(ctx, 'content'));

        // 底部合作链接
        let cooperation = KVProxy.getStaticFragment(10074).then(...handleJs(ctx, 'content'));

        // 底部公用版权
        let footer = KVProxy.getStaticFragment(10114).then(...handleJs(ctx, 'content'));

        [
            nav,
            navigation,
            subNavigation,
            stockPlateStyle,
            stockPlate,
            animationPic,
            jumpLink,
            headline,
            newsLiveTab,
            newsLiveTabLink,
            stockNews1,
            stockNews2,
            stockNews3,
            broadcast,
            liveLogo,
            newsTab,
            newsSubTab,
            news,
            answerTab,
            answerSubTab,
            answerList,
            bannerPic,
            cattleStocksTitle,
            rankTitle,
            fundsFlowTitle,
            customStocksTitle,
            QATitle,
            QATabs,
            subjectTitle,
            subject,
            marketTitle,
            market,
            courierTitle,
            courier,
            playItem,
            linkList,
            dayStockTitle,
            dayStock,
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            marketAnalysis,
            hotPlate,
            industryTitle,
            industry,
            singleStockTitle,
            marketRadar,
            track,
            fiveDays,
            schoolTitle,
            schoolSubTitle1,
            schoolSubTitle2,
            logs,
            school,
            starAnalystTitle,
            starAnalyst,
            stockPickingTitle,
            stockPickingData0,
            stockPickingData1,
            stockPickingData2,
            stockPickingData3,
            stockPickingData4,
            cooperation,
            footer
        ] = await Promise.all([
            nav,
            navigation,
            subNavigation,
            stockPlateStyle,
            stockPlate,
            animationPic,
            jumpLink,
            headline,
            newsLiveTab,
            newsLiveTabLink,
            stockNews1,
            stockNews2,
            stockNews3,
            broadcast,
            liveLogo,
            newsTab,
            newsSubTab,
            news,
            answerTab,
            answerSubTab,
            answerList,
            bannerPic,
            cattleStocksTitle,
            rankTitle,
            fundsFlowTitle,
            customStocksTitle,
            QATitle,
            QATabs,
            subjectTitle,
            subject,
            marketTitle,
            market,
            courierTitle,
            courier,
            playItem,
            linkList,
            dayStockTitle,
            dayStock,
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            marketAnalysis,
            hotPlate,
            industryTitle,
            industry,
            singleStockTitle,
            marketRadar,
            track,
            fiveDays,
            schoolTitle,
            schoolSubTitle1,
            schoolSubTitle2,
            logs,
            school,
            starAnalystTitle,
            starAnalyst,
            stockPickingTitle,
            stockPickingData0,
            stockPickingData1,
            stockPickingData2,
            stockPickingData3,
            stockPickingData4,
            cooperation,
            footer
        ]);

        let allData = {
            nav,
            navigation,
            subNavigation,
            stockPlateStyle,
            stockPlate,
            animationPic,
            jumpLink,
            headline,
            newsLiveTab,
            newsLiveTabLink,
            stockNews1,
            stockNews2,
            stockNews3,
            broadcast,
            liveLogo,
            newsTab,
            newsSubTab,
            news,
            answerTab,
            answerSubTab,
            answerList,
            bannerPic,
            cattleStocksTitle,
            rankTitle,
            fundsFlowTitle,
            customStocksTitle,
            QATitle,
            QATabs,
            subjectTitle,
            subject,
            marketTitle,
            market,
            courierTitle,
            courier,
            playItem,
            linkList,
            dayStockTitle,
            dayStock,
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            marketAnalysis,
            hotPlate,
            industryTitle,
            industry,
            singleStockTitle,
            marketRadar,
            track,
            fiveDays,
            schoolTitle,
            schoolSubTitle1,
            schoolSubTitle2,
            logs,
            school,
            starAnalystTitle,
            starAnalyst,
            stockPickingTitle,
            stockPickingData0,
            stockPickingData1,
            stockPickingData2,
            stockPickingData3,
            stockPickingData4,
            cooperation,
            footer
        };

        await ctx.html('finance_stock', {
            allData
        });
    },
};
