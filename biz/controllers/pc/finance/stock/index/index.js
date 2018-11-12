const redis = require('../../../../../common/redis');
const logger = require('../../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getString, getStringByKey } = require('../../../../../services/common/common');
const { handleFinanceListData, handleBannerPicData, handleDayStockData } = require('../../../../../common/transform');
const { formatImage, formatUrl } = require('@ifeng/public_method');
const { handleAdDataAndStaticData } = require('../../../../../services/utils/utils');

exports.list = {
    path: '/pc/finance/stock',
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
            ['statisticsHead:统计代码 Head 片段', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],

            // 统计代码 Body 片段
            ['statisticsBody:统计代码 Body 片段', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],

            // 页面公用导航
            ['nav:页面公用导航', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 搜索
            ['search:搜索', 'KVProxy', 'getStructuredFragment', 20005, getJsonByKey('content')],

            // Logo
            ['logo:Logo', 'KVProxy', 'getStructuredFragment', 20037, getJsonByKey('content')],

            // Logo Ad
            ['logoAd:Logo Ad', 'KVProxy', 'getStructuredFragment', 20038, getJsonByKey('content')],

            // 股票导航
            ['navigation:股票导航', 'KVProxy', 'getStructuredFragment', 20039, getJsonByKey('content')],

            // 股票子导航
            ['subNavigation:股票子导航', 'KVProxy', 'getStructuredFragment', 20040, getJsonByKey('content')],

            // 股票显示
            [
                'stockPlate:股票显示',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/caterank.json',
                getJson(),
            ],

            // 动画
            ['animationPic:动画', 'KVProxy', 'getStructuredFragment', 20041, getJsonByKey('content')],

            // 跳转链接
            ['jumpLink:跳转链接', 'KVProxy', 'getStructuredFragment', 20042, getJsonByKey('content')],

            // 头条新闻
            ['headline:头条新闻', 'KVProxy', 'getStaticFragment', 10162, getStringByKey('content')],

            // 要闻直播标题
            ['newsLiveTab:要闻直播标题', 'KVProxy', 'getStructuredFragment', 20043, getJsonByKey('content')],

            // 要闻直播标题外链
            ['newsLiveTabLink:要闻直播标题外链', 'KVProxy', 'getStructuredFragment', 20044, getJsonByKey('content')],

            // 直播 Logo
            ['liveLogo:直播 Logo', 'KVProxy', 'getStructuredFragment', 20045, getJsonByKey('content')],

            // 证券要闻 2级
            ['stockNews:证券要闻 2级', 'KVProxy', 'getDynamicFragment', '20067', getStringByKey('data')],

            // 证券要闻 4级
            ['stockNewsList:证券要闻 3级', 'KVProxy', 'getDynamicFragment', '20032', getStringByKey('data')],

            // 公司要闻标题
            ['newsTab:公司要闻标题', 'KVProxy', 'getStructuredFragment', 20046, getJsonByKey('content')],

            // 公司要闻
            ['news:公司要闻', 'KVProxy', 'getDynamicFragment', '20068', getStringByKey('data')],

            // 公司要闻列表
            ['newsList:公司要闻列表', 'KVProxy', 'getDynamicFragment', '20033', getStringByKey('data')],

            // 牛人解盘标题
            ['answerTab:牛人解盘标题', 'KVProxy', 'getStructuredFragment', 20047, getJsonByKey('content')],

            // 牛人解盘子标题
            ['answerSubTab:牛人解盘子标题', 'KVProxy', 'getStructuredFragment', 20048, getJsonByKey('content')],

            // 牛人解盘
            ['answerList:牛人解盘', 'KVProxy', 'getStaticFragment', 10163, getStringByKey('content')],

            // 视频抓牛股标题
            ['cattleStocksTitle:视频抓牛股标题', 'KVProxy', 'getStructuredFragment', 20049, getJsonByKey('content')],

            // 涨跌排行榜标题
            ['rankTitle:涨跌排行榜标题', 'KVProxy', 'getStructuredFragment', 20050, getJsonByKey('content')],

            // 资金流向标题
            ['fundsFlowTitle:资金流向标题', 'KVProxy', 'getStructuredFragment', 20051, getJsonByKey('content')],

            // 自选股登录标题
            ['customStocksTitle:自选股登录标题', 'KVProxy', 'getStructuredFragment', 20052, getJsonByKey('content')],

            // 分析师答疑标题
            // ['QATitle:分析师答疑标题', 'KVProxy', 'getStructuredFragment', 20053, getJsonByKey('content')],

            // 分析师列表
            // ['QATabs:分析师列表', 'KVProxy', 'getStructuredFragment', 20054, getJsonByKey('content')],

            // 财商教育
            ['finance:财商教育', 'KVProxy', 'getStructuredFragment', 20010, getStringByKey('content')],

            // 财商教育新闻列表
            ['financeList:财商教育新闻列表', 'KVProxy', 'getRecommendFragment', 20006, getJsonByKey('data')],

            // 轮播图
            ['bannerPic:轮播图', 'KVProxy', 'getRecommendFragment', 30010, getStringByKey('data')],

            // 热点专题标题
            ['subjectTitle:热点专题标题', 'KVProxy', 'getStructuredFragment', 20055, getJsonByKey('content')],

            // 热点专题
            ['subject:热点专题', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],

            // 投教学堂标题
            ['marketTitle:投教学堂标题', 'KVProxy', 'getStructuredFragment', 20056, getJsonByKey('content')],

            // 投教学堂
            ['market:投教学堂', 'KVProxy', 'getStaticFragment', 10080, getStringByKey('content')],

            // 理财速递标题
            ['courierTitle:理财速递标题', 'KVProxy', 'getStructuredFragment', 20057, getJsonByKey('content')],

            // 理财速递
            ['courier:理财速递', 'KVProxy', 'getStaticFragment', 10082, getStringByKey('content')],

            // 视频播放项
            ['playItem:视频播放项', 'KVProxy', 'getStructuredFragment', 20058, getJsonByKey('content')],

            // 每日论股
            ['dayStock:每日论股', 'KVProxy', 'getRecommendFragment', 20040, getJsonByKey('data')],

            // 操盘热点标题
            ['hotSpotsTitle:操盘热点标题', 'KVProxy', 'getStructuredFragment', 20059, getJsonByKey('content')],

            // 操盘分析标题
            ['hotSpotsSubTitle1:操盘分析标题', 'KVProxy', 'getStructuredFragment', 20060, getJsonByKey('content')],

            // 热点板块标题
            ['hotSpotsSubTitle2:热点板块标题', 'KVProxy', 'getStructuredFragment', 20061, getJsonByKey('content')],

            // 操盘分析
            ['marketAnalysis:操盘分析', 'KVProxy', 'getDynamicFragment', '20034', getStringByKey('data')],

            // 热点板块
            ['hotPlate:热点板块', 'KVProxy', 'getDynamicFragment', '20035', getStringByKey('data')],

            // 行业概念资金流向标题
            ['industryTitle:行业概念资金流向标题', 'KVProxy', 'getStructuredFragment', 20062, getJsonByKey('content')],

            // 行业概念资金流向 tabs 与图片数据
            [
                'industry:行业概念资金流向 tabs 与图片数据',
                'KVProxy',
                'getStructuredFragment',
                20063,
                getJsonByKey('content'),
            ],

            // 行业资金流入
            [
                'hyin:行业资金流入',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/zijin_hyin.json',
                getJson(),
            ],

            // 行业资金流出
            [
                'hyout:行业资金流出',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/zijin_hyout.json',
                getJson(),
            ],

            // 概念资金流入
            [
                'gnin:概念资金流入',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/zijin_gnin.json',
                getJson(),
            ],

            // 概念资金流出
            [
                'gnout:概念资金流出',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/zijin_gnout.json',
                getJson(),
            ],

            // 个股资金流向标题
            ['singleStockTitle:个股资金流向标题', 'KVProxy', 'getStructuredFragment', 20064, getJsonByKey('content')],

            // 市场雷达
            ['marketRadarTabs:市场雷达tab', 'KVProxy', 'getStructuredFragment', 20065, getJsonByKey('content')],
            [
                'marketRadar:市场雷达',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/marketradar.json',
                getJson(),
            ],

            // 大单追踪
            ['trackTabs:大单追踪tab', 'KVProxy', 'getStructuredFragment', 20066, getJsonByKey('content')],
            ['track:大单追踪', 'KVProxy', 'getSsiFragment', 'finance.ifeng.com/app/json/zq/bigtrack.json', getJson()],

            // 5日增减仓
            ['fiveDaysTabs:5日增减仓tab', 'KVProxy', 'getStructuredFragment', 20067, getJsonByKey('content')],
            [
                'fiveDaysBuy:5日增减仓',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/fiveday_buy.json',
                getJson(),
            ],
            [
                'fiveDaysSell:5日增减仓',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/fiveday_sell.json',
                getJson(),
            ],

            // 高手学堂标题
            ['schoolTitle:高手学堂标题', 'KVProxy', 'getStructuredFragment', 20068, getJsonByKey('content')],

            // 高手操盘日志标题
            ['schoolSubTitle1:高手操盘日志标题', 'KVProxy', 'getStructuredFragment', 20069, getJsonByKey('content')],

            // 股民学校标题
            ['schoolSubTitle2:股民学校标题', 'KVProxy', 'getStructuredFragment', 20070, getJsonByKey('content')],

            // 高手操盘日志
            ['logs:高手操盘日志', 'KVProxy', 'getDynamicFragment', '20036', getStringByKey('data')],

            // 股民学校
            ['school:股民学校', 'KVProxy', 'getDynamicFragment', '20037', getStringByKey('data')],

            // 明星分析师标题
            ['starAnalystTitle:明星分析师标题', 'KVProxy', 'getStructuredFragment', 20071, getJsonByKey('content')],

            // 明星分析师数据
            ['starAnalyst:明星分析师数据', 'KVProxy', 'getStructuredFragment', 20072, getJsonByKey('content')],
            [
                'starSrank:明星分析师数据',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/star_s_rank.json',
                getJson(),
            ],
            [
                'starMrank:明星分析师数据',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/star_m_rank.json',
                getJson(),
            ],
            [
                'starLrank:明星分析师数据',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/star_l_rank.json',
                getJson(),
            ],

            // 研报选股标题
            ['stockPickingTitle:研报选股标题', 'KVProxy', 'getStructuredFragment', 20073, getJsonByKey('content')],

            // 机构荐股池
            ['stockpool:机构荐股池', 'KVProxy', 'getStructuredFragment', 20074, getJsonByKey('content')],
            [
                'stockpoolData:机构荐股池',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_stockpool.json',
                getJson(),
            ],

            // 目标涨幅最大
            ['chgpctest:目标涨幅最大', 'KVProxy', 'getStructuredFragment', 20075, getJsonByKey('content')],
            [
                'chgpctestData:目标涨幅最大',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_chgpctest.json',
                getJson(),
            ],

            // 评级调高个股
            ['levelup:评级调高个股', 'KVProxy', 'getStructuredFragment', 20076, getJsonByKey('content')],
            [
                'levelupData:评级调高个股',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_levelup.json',
                getJson(),
            ],

            // 机构首次关注股
            ['firstfocus:机构首次关注股', 'KVProxy', 'getStructuredFragment', 20077, getJsonByKey('content')],
            [
                'firstfocusData:机构首次关注股',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_firstfocus.json',
                getJson(),
            ],

            // 机构关注度最高
            ['focusest:机构关注度最高', 'KVProxy', 'getStructuredFragment', 20078, getJsonByKey('content')],
            [
                'focusestData:机构关注度最高',
                'KVProxy',
                'getSsiFragment',
                'finance.ifeng.com/app/json/zq/yb_focusest.json',
                getJson(),
            ],

            // 底部合作链接
            ['cooperation:底部合作链接', 'KVProxy', 'getStaticFragment', 10074, getStringByKey('content')],

            // 底部公用版权
            ['footer:底部公用版权', 'KVProxy', 'getStructuredFragment', 20036, getJsonByKey('content')],

            // 二维码
            ['qrCode:二维码', 'KVProxy', 'getStructuredFragment', 20079, getJsonByKey('content')],

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
            allData.financeList = allData.financeList && handleFinanceListData(allData.financeList);

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

            if (allData.QATabs && allData.QATabs.allData) {
                allData.QATabs.allData.url = formatUrl(allData.QATabs.allData.url);
                allData.QATabs.allData.src = formatImage(allData.QATabs.allData.image, 60, 60);
            }

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

            if (allData.qrCode) {
                allData.qrCode.url = formatImage(allData.qrCode.url, 110, 144);
            }
        } catch (error) {
            logger.error(error);
            ctx.errorCount++;
        }

        const adDataAndStaticData = handleAdDataAndStaticData(ctx, json, allData);

        await ctx.html('finance_stock_index', {
            allData,
            statisticsData: adDataAndStaticData.statisticsData,
            adData: adDataAndStaticData.adData,
            staticData: adDataAndStaticData.staticData,
        });
    },
};
