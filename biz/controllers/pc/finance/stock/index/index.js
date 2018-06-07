const redis = require('../../../../../common/redis');
const logger = require('../../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../../services/common/common');

exports.list = {
    path: '/pc/finance/stock',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // const Tars = require('@tars/stream');
        // const ids = new Tars.List(Tars.String);

        // ids.push('finance.ifeng.com/app/json/zq/yb_levelup.json' );
        // ids.push('finance.ifeng.com/app/json/zq/fiveday_buy.json' );
        // ids.push('finance.ifeng.com/app/json/zq/yb_focusest.json');

        // ids.push('financeifengcom/app/json/zq/star_s_rankjson');
        // ids.push('financeifengcom/app/json/zq/star_m_rankjson');
        // ids.push('financeifengcom/app/json/zq/star_l_rankjson');

        // // ids.push(10108);
        // // ids.push(10129);
        // // ids.push(10133);
        // try {
        //     let data = await KVProxy.getSsiFragments(ctx,ids)
        //     // console.log(data);
        //     return (ctx.body = data.response.return);
        // } catch (error) {
        //     console.log(error)
        //     console.log(error.response);
        //     return (ctx.body = 'error');
        // }

        //     const Tars = require('@tars/stream');
        //     const ids = new Tars.List(Tars.String);

        //     ids.push('finance_22005_10736_22');
        //     ids.push('finance_22005_10736_4');
        //     ids.push('finance_22005_10736_5');
        //     ids.push('finance_22005_10736_6');
        //     console.log(ids);
        //    let data =  await KVProxy.getCustoms(ids) //.then(...handleJsonByKey(ctx, 'content'));
        //    return ctx.body = data.response.return;

        let json = [
            // 页面公用导航
            ['nav', 'KVProxy', 'getStaticFragment', 10108, getJsonByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStaticFragment', 10129, getJsonByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStaticFragment', 10133, getJsonByKey('content')],

            // Logo Ad
            ['logoAd', 'KVProxy', 'getStaticFragment', 10134, getJsonByKey('content')],

            // 股票导航
            ['navigation', 'KVProxy', 'getStaticFragment', 10038, getJsonByKey('content')],

            // 股票子导航
            ['subNavigation', 'KVProxy', 'getStaticFragment', 10040, getJsonByKey('content')],

            // 股票显示
            ['stockPlate', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/caterankjson', getJson()],

            // 动画
            ['animationPic', 'KVProxy', 'getStaticFragment', 10085, getJsonByKey('content')],

            // 跳转链接
            ['jumpLink', 'KVProxy', 'getStaticFragment', 10044, getStringByKey('content')],

            // 头条新闻
            ['headline', 'KVProxy', 'getRecommendFragment', 20018, getStringByKey('data')],

            // 要闻直播标题
            ['newsLiveTab', 'KVProxy', 'getStaticFragment', 10049, getJsonByKey('content')],

            // 要闻直播标题外链
            ['newsLiveTabLink', 'KVProxy', 'getStaticFragment', 10115, getJsonByKey('content')],

            // 直播 Logo
            ['liveLogo', 'KVProxy', 'getStaticFragment', 10052, getJsonByKey('content')],

            // 轮播新闻
            ['broadcast', 'KVProxy', 'getCustom', 'finance_22005_10736_22', getJson()],

            // 股市要闻
            ['stockNews1', 'KVProxy', 'getCustom', 'finance_22005_10736_4', getJson()],

            ['stockNews2', 'KVProxy', 'getCustom', 'finance_22005_10736_5', getJson()],

            ['stockNews3', 'KVProxy', 'getCustom', 'finance_22005_10736_6', getJson()],

            // 公司要闻标题
            ['newsTab', 'KVProxy', 'getStaticFragment', 10050, getJsonByKey('content')],

            // 公司要闻子标题
            ['newsSubTab', 'KVProxy', 'getStaticFragment', 10117, getJsonByKey('content')],

            // 公司要闻
            ['news', 'KVProxy', 'getCustom', 'finance_22005_10736_23', getJson()],

            // 牛人解盘标题
            ['answerTab', 'KVProxy', 'getStaticFragment', 10051, getJsonByKey('content')],

            // 牛人解盘子标题
            ['answerSubTab', 'KVProxy', 'getStaticFragment', 10118, getJsonByKey('content')],

            // 牛人解盘
            ['answerList', 'KVProxy', 'getRecommendFragment', 20019, getStringByKey('data')],

            // 视频抓牛股标题
            ['cattleStocksTitle', 'KVProxy', 'getStaticFragment', 10100, getJsonByKey('content')],

            // 涨跌排行榜标题
            ['rankTitle', 'KVProxy', 'getStaticFragment', 10101, getJsonByKey('content')],

            // 资金流向标题
            ['fundsFlowTitle', 'KVProxy', 'getStaticFragment', 10102, getJsonByKey('content')],

            // 自选股登录标题
            ['customStocksTitle', 'KVProxy', 'getStaticFragment', 10103, getJsonByKey('content')],

            // 分析师答疑标题
            ['QATitle', 'KVProxy', 'getStaticFragment', 10104, getJsonByKey('content')],

            // 分析师答疑
            ['QATabs', 'KVProxy', 'getStaticFragment', 10105, getJsonByKey('content')],

            // 轮播图
            ['bannerPic', 'KVProxy', 'getStaticFragment', 10075, getJsonByKey('content')],

            // 热点专题标题
            ['subjectTitle', 'KVProxy', 'getStaticFragment', 10076, getJsonByKey('content')],

            // 热点专题
            ['subject', 'KVProxy', 'getStaticFragment', 10079, getStringByKey('content')],

            // 理财超市标题
            ['marketTitle', 'KVProxy', 'getStaticFragment', 10077, getJsonByKey('content')],

            // 理财超市
            ['market', 'KVProxy', 'getStaticFragment', 10080, getStringByKey('content')],

            // 理财速递标题
            ['courierTitle', 'KVProxy', 'getStaticFragment', 10119, getJsonByKey('content')],

            // 理财速递
            ['courier', 'KVProxy', 'getStaticFragment', 10082, getJsonByKey('content')],

            // 视频播放项
            ['playItem', 'KVProxy', 'getStaticFragment', 10083, getJsonByKey('content')],

            // 跳转链接列表
            ['linkList', 'KVProxy', 'getStaticFragment', 10084, getJsonByKey('content')],

            // 每日论股标题
            ['dayStockTitle', 'KVProxy', 'getStaticFragment', 10078, getJsonByKey('content')],

            // 每日论股
            ['dayStock', 'KVProxy', 'getStaticFragment', 10081, getStringByKey('content')],

            // 操盘热点标题
            ['hotSpotsTitle', 'KVProxy', 'getStaticFragment', 10067, getJsonByKey('content')],

            // 操盘分析标题
            ['hotSpotsSubTitle1', 'KVProxy', 'getStaticFragment', 10070, getJsonByKey('content')],

            // 热点板块标题
            ['hotSpotsSubTitle2', 'KVProxy', 'getStaticFragment', 10071, getJsonByKey('content')],

            // 操盘分析
            ['marketAnalysis', 'KVProxy', 'getCustom', 'finance_22005_10736_13', getJson()],

            // 热点板块
            ['hotPlate', 'KVProxy', 'getCustom', 'finance_22005_10736_14', getJson()],

            // 行业概念资金流向标题
            ['industryTitle', 'KVProxy', 'getStaticFragment', 10120, getJsonByKey('content')],

            // 行业概念资金流向 tabs 与图片数据
            ['industry', 'KVProxy', 'getStaticFragment', 10087, getJsonByKey('content')],

            // 股票显示
            ['hyin', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/zijin_hyinjson', getJson()],

            // 股票显示
            ['hyout', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/zijin_hyoutjson', getJson()],

            // 股票显示
            ['gnin', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/zijin_gninjson', getJson()],

            // 股票显示
            ['gnout', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/zijin_gnoutjson', getJson()],

            // 个股资金流向标题
            ['singleStockTitle', 'KVProxy', 'getStaticFragment', 10088, getJsonByKey('content')],

            // 市场雷达
            ['marketRadarTabs', 'KVProxy', 'getStaticFragment', 10089, getJsonByKey('content')],
            ['marketRadar', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/marketradarjson', getJson()],

            // 大单追踪
            ['trackTabs', 'KVProxy', 'getStaticFragment', 10090, getJsonByKey('content')],
            ['track', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/bigtrackjson', getJson()],

            // 5日增减仓
            ['fiveDaysTabs', 'KVProxy', 'getStaticFragment', 10091, getJsonByKey('content')],
            ['fiveDaysBuy', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/fiveday_buyjson', getJson()],
            ['fiveDaysSell', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/fiveday_selljson', getJson()],

            // 高手学堂标题
            ['schoolTitle', 'KVProxy', 'getStaticFragment', 10069, getJsonByKey('content')],

            // 高手操盘日志标题
            ['schoolSubTitle1', 'KVProxy', 'getStaticFragment', 10072, getJsonByKey('content')],

            // 股民学校标题
            ['schoolSubTitle2', 'KVProxy', 'getStaticFragment', 10073, getJsonByKey('content')],

            // 高手操盘日志
            ['logs', 'KVProxy', 'getCustom', 'finance_22005_10736_19', getJson()],

            // 股民学校
            ['school', 'KVProxy', 'getCustom', 'finance_22005_10736_15', getJson()],

            // 明星分析师标题
            ['starAnalystTitle', 'KVProxy', 'getStaticFragment', 10092, getJsonByKey('content')],

            // 明星分析师数据
            ['starAnalyst', 'KVProxy', 'getStaticFragment', 10093, getJsonByKey('content')],
            ['starSrank', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/star_s_rankjson', getJson()],
            ['starMrank', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/star_m_rankjson', getJson()],
            ['starLrank', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/star_l_rankjson', getJson()],

            // 研报选股标题
            ['stockPickingTitle', 'KVProxy', 'getStaticFragment', 10094, getJsonByKey('content')],

            // 机构荐股池
            ['stockpool', 'KVProxy', 'getStaticFragment', 10095, getJsonByKey('content')],
            ['stockpoolData', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/yb_stockpooljson', getJson()],

            // 目标涨幅最大
            ['chgpctest', 'KVProxy', 'getStaticFragment', 10096, getJsonByKey('content')],
            ['chgpctestData', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/yb_chgpctestjson', getJson()],

            // 评级调高个股
            ['levelup', 'KVProxy', 'getStaticFragment', 10097, getJsonByKey('content')],
            ['levelupData', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/yb_levelupjson', getJson()],

            // 机构首次关注股
            ['firstfocus', 'KVProxy', 'getStaticFragment', 10098, getJsonByKey('content')],
            ['firstfocusData', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/yb_firstfocusjson', getJson()],

            // 机构关注度最高
            ['focusest', 'KVProxy', 'getStaticFragment', 10099, getJsonByKey('content')],
            ['focusestData', 'KVProxy', 'getSsiFragment', 'financeifengcom/app/json/zq/yb_focusestjson', getJson()],

            // 底部合作链接
            ['cooperation', 'KVProxy', 'getStaticFragment', 10074, getStringByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],

            // 二维码
            ['qrCode', 'KVProxy', 'getStaticFragment', 10136, getJsonByKey('content')],
        ];

        let allData = await transfer(ctx, json);
        // return ctx.body = allData;
        await ctx.html('finance_stock_index', {
            allData,
        });
    },
};
