const redis = require('../../../../../common/redis');
const logger = require('../../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getString, getStringByKey } = require('../../../../../services/common/common');
const { handleBannerPicData, handleDayStockData } = require('../../../../../common/transform');
const { formatImage, formatUrl } = require('@ifeng/public_method');

exports.list = {
    path: '/pc/finance/stock/test',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler: async ctx => {
        const json = [
            // 统计代码 Head 片段
            ['statisticsHead', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],

            // 统计代码 Body 片段
            ['statisticsBody', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],

            // 页面公用导航
            ['nav', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStructuredFragment', 20005, getJsonByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStructuredFragment', 20037, getJsonByKey('content')],

            // Logo Ad
            ['logoAd', 'KVProxy', 'getStructuredFragment', 20038, getJsonByKey('content')],

            // 股票导航
            ['navigation', 'KVProxy', 'getStructuredFragment', 20039, getJsonByKey('content')],

            // 股票子导航
            ['subNavigation', 'KVProxy', 'getStaticFragment', 10040, getJsonByKey('content')],

            // 股票显示
            ['stockPlate', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/caterank.json', getJson()],

            // 动画
            ['animationPic', 'KVProxy', 'getStaticFragment', 10085, getJsonByKey('content')],

            // 跳转链接
            ['jumpLink', 'KVProxy', 'getStaticFragment', 10044, getJsonByKey('content')],

            // 头条新闻
            ['headline', 'KVProxy', 'getStaticFragment', 10162, getStringByKey('content')],

            // 要闻直播标题
            ['newsLiveTab', 'KVProxy', 'getStaticFragment', 10049, getJsonByKey('content')],

            // 要闻直播标题外链
            ['newsLiveTabLink', 'KVProxy', 'getStaticFragment', 10115, getJsonByKey('content')],

            // 直播 Logo
            ['liveLogo', 'KVProxy', 'getStaticFragment', 10052, getJsonByKey('content')],

            // 证券要闻 3级
            ['stockNews', 'KVProxy', 'getDynamicFragment', '20067', getStringByKey('data')],

            // 证券要闻 4级
            ['stockNewsList', 'KVProxy', 'getDynamicFragment', '20032', getStringByKey('data')],

            // 公司要闻标题
            ['newsTab', 'KVProxy', 'getStaticFragment', 10050, getJsonByKey('content')],

            // 公司要闻
            ['news', 'KVProxy', 'getDynamicFragment', '20068', getStringByKey('data')],

            // 公司要闻
            ['newsList', 'KVProxy', 'getDynamicFragment', '20033', getStringByKey('data')],

            // 牛人解盘标题
            ['answerTab', 'KVProxy', 'getStaticFragment', 10051, getJsonByKey('content')],

            // 牛人解盘子标题
            ['answerSubTab', 'KVProxy', 'getStaticFragment', 10118, getJsonByKey('content')],

            // 牛人解盘
            ['answerList', 'KVProxy', 'getStaticFragment', 10163, getStringByKey('content')],

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
            ['bannerPic', 'KVProxy', 'getRecommendFragment', 30010, getStringByKey('data')],

            // 热点专题标题
            ['subjectTitle', 'KVProxy', 'getStaticFragment', 10076, getJsonByKey('content')],

            // 热点专题
            ['subject', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],

            // 理财超市标题
            ['marketTitle', 'KVProxy', 'getStaticFragment', 10077, getJsonByKey('content')],

            // 理财超市
            ['market', 'KVProxy', 'getStaticFragment', 10080, getStringByKey('content')],

            // 理财速递标题
            ['courierTitle', 'KVProxy', 'getStaticFragment', 10119, getJsonByKey('content')],

            // 理财速递
            ['courier', 'KVProxy', 'getStaticFragment', 10082, getStringByKey('content')],

            // 视频播放项
            ['playItem', 'KVProxy', 'getStaticFragment', 10083, getJsonByKey('content')],

            // 每日论股
            ['dayStock', 'KVProxy', 'getRecommendFragment', 20040, getJsonByKey('data')],

            // 操盘热点标题
            ['hotSpotsTitle', 'KVProxy', 'getStaticFragment', 10067, getJsonByKey('content')],

            // 操盘分析标题
            ['hotSpotsSubTitle1', 'KVProxy', 'getStaticFragment', 10070, getJsonByKey('content')],

            // 热点板块标题
            ['hotSpotsSubTitle2', 'KVProxy', 'getStaticFragment', 10071, getJsonByKey('content')],

            // 操盘分析
            ['marketAnalysis', 'KVProxy', 'getDynamicFragment', '20034', getStringByKey('data')],

            // 热点板块
            ['hotPlate', 'KVProxy', 'getDynamicFragment', '20035', getStringByKey('data')],

            // 行业概念资金流向标题
            ['industryTitle', 'KVProxy', 'getStaticFragment', 10120, getJsonByKey('content')],

            // 行业概念资金流向 tabs 与图片数据
            ['industry', 'KVProxy', 'getStaticFragment', 10087, getJsonByKey('content')],

            // 行业资金流入
            ['hyin', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/zijin_hyin.json', getJson()],

            // 行业资金流出
            ['hyout', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/zijin_hyout.json', getJson()],

            // 概念资金流入
            ['gnin', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/zijin_gnin.json', getJson()],

            // 概念资金流出
            ['gnout', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/zijin_gnout.json', getJson()],

            // 个股资金流向标题
            ['singleStockTitle', 'KVProxy', 'getStaticFragment', 10088, getJsonByKey('content')],

            // 市场雷达
            ['marketRadarTabs', 'KVProxy', 'getStaticFragment', 10089, getJsonByKey('content')],
            ['marketRadar', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/marketradar.json', getJson()],

            // 大单追踪
            ['trackTabs', 'KVProxy', 'getStaticFragment', 10090, getJsonByKey('content')],
            ['track', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/bigtrack.json', getJson()],

            // 5日增减仓
            ['fiveDaysTabs', 'KVProxy', 'getStaticFragment', 10091, getJsonByKey('content')],
            ['fiveDaysBuy', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/fiveday_buy.json', getJson()],
            ['fiveDaysSell', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/fiveday_sell.json', getJson()],

            // 高手学堂标题
            ['schoolTitle', 'KVProxy', 'getStaticFragment', 10069, getJsonByKey('content')],

            // 高手操盘日志标题
            ['schoolSubTitle1', 'KVProxy', 'getStaticFragment', 10072, getJsonByKey('content')],

            // 股民学校标题
            ['schoolSubTitle2', 'KVProxy', 'getStaticFragment', 10073, getJsonByKey('content')],

            // 高手操盘日志
            ['logs', 'KVProxy', 'getDynamicFragment', '20036', getStringByKey('data')],

            // 股民学校
            ['school', 'KVProxy', 'getDynamicFragment', '20037', getStringByKey('data')],

            // 明星分析师标题
            ['starAnalystTitle', 'KVProxy', 'getStaticFragment', 10092, getJsonByKey('content')],

            // 明星分析师数据
            ['starAnalyst', 'KVProxy', 'getStaticFragment', 10093, getJsonByKey('content')],
            ['starSrank', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/star_s_rank.json', getJson()],
            ['starMrank', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/star_m_rank.json', getJson()],
            ['starLrank', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/star_l_rank.json', getJson()],

            // 研报选股标题
            ['stockPickingTitle', 'KVProxy', 'getStaticFragment', 10094, getJsonByKey('content')],

            // 机构荐股池
            ['stockpool', 'KVProxy', 'getStaticFragment', 10095, getJsonByKey('content')],
            [
                'stockpoolData',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_stockpool.json',
                getJson(),
            ],

            // 目标涨幅最大
            ['chgpctest', 'KVProxy', 'getStaticFragment', 10096, getJsonByKey('content')],
            [
                'chgpctestData',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_chgpctest.json',
                getJson(),
            ],

            // 评级调高个股
            ['levelup', 'KVProxy', 'getStaticFragment', 10097, getJsonByKey('content')],
            ['levelupData', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/yb_levelup.json', getJson()],

            // 机构首次关注股
            ['firstfocus', 'KVProxy', 'getStaticFragment', 10098, getJsonByKey('content')],
            [
                'firstfocusData',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_firstfocus.json',
                getJson(),
            ],

            // 机构关注度最高
            ['focusest', 'KVProxy', 'getStaticFragment', 10099, getJsonByKey('content')],
            ['focusestData', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/yb_focusest.json', getJson()],

            // 底部合作链接
            ['cooperation', 'KVProxy', 'getStaticFragment', 10074, getStringByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStructuredFragment', 20036, getJsonByKey('content')],

            // 二维码
            ['qrCode', 'KVProxy', 'getStaticFragment', 10136, getJsonByKey('content')],

            // adHead
            ['adHead', 'KVProxy', 'getAd', 'ad_new_chip/s_all-indexs_180823_ad_qpdggtb.inc.html', getString()],

            // adBody
            ['adBody', 'KVProxy', 'getAd', 'ad_new_chip/s_all_indexs_180823_ad_qpdpcggdb.inc.html', getString()],

            // topAd
            [
                'topAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_stock_index_ad_banner_top_1000x90.inc.html',
                getString(),
            ],

            // leftAsideAd
            [
                'leftAsideAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_stock_index_ad_button_02.inc.html',
                getString(),
            ],

            // hotSpotsAd
            [
                'hotSpotsAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_stock_index_ad_button_03.inc.html',
                getString(),
            ],

            // schoolAd
            ['schoolAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_131011_ad_banner03.inc.html', getString()],

            // rightSideAd0
            [
                'rightSideAd0',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_stock_index_ad_pictext_01.inc.html',
                getString(),
            ],

            // rightSideAd1
            ['rightSideAd1', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_text_01.inc.html', getString()],

            // bottomAd
            ['bottomAd', 'KVProxy', 'getAd', 'ad_new_chip/s_all_index_ad_banner_bottom.inc.html', getString()],
        ];

        const allData = await transfer(ctx, json);

        try {
            allData.bannerPic = allData.bannerPic && handleBannerPicData(allData.bannerPic);

            allData.dayStock = allData.dayStock && handleDayStockData(allData.dayStock);

            const stockNews = [
                ...(allData.stockNews && allData.stockNews.slice(0, 1)),
                ...(allData.stockNewsList && allData.stockNewsList.slice(0, 5)),
                ...(allData.stockNews && allData.stockNews.slice(1, 2)),
                ...(allData.stockNewsList && allData.stockNewsList.slice(5, 10)),
                ...(allData.stockNews && allData.stockNews.slice(2, 3)),
                ...(allData.stockNewsList && allData.stockNewsList.slice(10, 15)),
            ];

            allData.stockNews = stockNews.map(item => ({
                id: item.id,
                url: formatUrl(item.url),
                title: item.title,
            }));

            const news = allData.news.slice(0, 1).concat(allData.newsList.slice(0, 7));

            allData.news = news.map(item => ({
                url: formatUrl(item.url),
                title: item.title,
            }));

            allData.subject =
                allData.subject &&
                allData.subject.slice(0, 3).map(item => ({
                    banner: formatImage(item.thumbnail !== '' ? item.thumbnail : item.banner, 300, 169),
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            allData.marketAnalysis =
                allData.marketAnalysis &&
                allData.marketAnalysis.slice(0, 11).map(item => ({
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            allData.hotPlate =
                allData.hotPlate &&
                allData.hotPlate.slice(0, 11).map(item => ({
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            allData.logs =
                allData.logs &&
                allData.logs.slice(0, 6).map(item => ({
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            allData.school =
                allData.school &&
                allData.school.slice(0, 6).map(item => ({
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            allData.QATabs[3].url = formatUrl(allData.QATabs[3].url);
            allData.QATabs[3].src = formatImage(allData.QATabs[3].src, 60, 60);

            if (allData.hyin)
                allData.hyin.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.hyout)
                allData.hyout.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.gnin)
                allData.gnin.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.gnout)
                allData.gnout.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.marketRadar)
                allData.marketRadar.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.track)
                allData.track.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.fiveDaysBuy)
                allData.fiveDaysBuy.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.hyin)
                allData.fiveDaysSell.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.stockpoolData)
                allData.stockpoolData.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.chgpctestData)
                allData.chgpctestData.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.levelupData)
                allData.levelupData.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.firstfocusData)
                allData.firstfocusData.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });

            if (allData.focusestData)
                allData.focusestData.forEach(item => {
                    item.ybinfo[1] = formatUrl(item.ybinfo[1]);
                });
        } catch (error) {
            logger.error(error);
            ctx.errorCount++;
        }

        // 处理统计数据
        const statisticsData = {
            statisticsHead: allData.statisticsHead,
            statisticsBody: allData.statisticsBody,
        };

        delete allData.statisticsHead;
        delete allData.statisticsBody;

        // 处理广告碎片和静态碎片
        const adData = {};
        const staticData = {};

        for (const item of json) {
            if (item[2] === 'getAd') {
                adData[item[0]] = encodeURIComponent(allData[item[0]]);
                delete allData[item[0]];
            }
            if (item[2] === 'getStaticFragment') {
                if (typeof allData[item[0]] === 'string') {
                    staticData[item[0]] = encodeURIComponent(allData[item[0]]);
                } else {
                    staticData[item[0]] = allData[item[0]];
                }

                delete allData[item[0]];
            }
        }

        await ctx.html('finance_stock_index', {
            allData,
            statisticsData,
            adData,
            staticData,
        });
    },
};
