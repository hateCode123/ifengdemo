const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { handleAdDataAndStaticData } = require('../../../../services/utils/utils');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');
const {
    handleHeadlinePicData,
    handleFinanceListPicData,
    handleFinanceVideoData,
} = require('../../../../common/transform');
const { formatImage, formatUrl } = require('@ifeng/public_method');
const moment = require('moment');

exports.list = {
    path: '/pc/finance/(index)?',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    preview: true,
    online: true,
    async_chips: [
        ['customList:信息流首页数据', 'KVProxy', 'getCustom', '17007_719_68'],
        ['macroList:信息流宏观数据', 'KVProxy', 'getDynamicFragment', 20038],
        ['stockList:信息流股票数据', 'KVProxy', 'getDynamicFragment', 20032],
        ['imarketsList:信息流imarkets数据', 'KVProxy', 'getDynamicFragment', 20040],
        ['companyList:信息流港股数据', 'KVProxy', 'getDynamicFragment', 60128],
        ['wemoneyList:信息流wemoney数据', 'KVProxy', 'getDynamicFragment', 20039],
    ],
    handler: async ctx => {
        const json = [
            // 统计代码 Head 片段
            ['statisticsHead:统计代码 Head 片段', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],

            // 统计代码 Body 片段
            ['statisticsBody:统计代码 Body 片段', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],

            // 通用导航
            ['nav:通用导航', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 搜索
            ['search:搜索', 'KVProxy', 'getStructuredFragment', 20005, getStringByKey('content')],

            // Logo
            ['logo:Logo', 'KVProxy', 'getStructuredFragment', 20006, getStringByKey('content')],

            // Logo Ad
            ['logoAd:Logo Ad', 'KVProxy', 'getStructuredFragment', 20007, getStringByKey('content')],

            // 财经首页导航
            ['navigation:财经首页导航', 'KVProxy', 'getStructuredFragment', 20008, getStringByKey('content')],

            // 投顾产品
            ['production:投顾产品', 'KVProxy', 'getStructuredFragment', 20009, getStringByKey('content')],

            // 焦点图
            ['bannerPic:焦点图', 'KVProxy', 'getSelectedPool', 9, getStringByKey('data')],

            // 焦点图广告权益
            ['bannerPicAd:焦点图广告权益', 'KVProxy', 'getStructuredFragment', 30028, getStringByKey('content')],

            // 头条新闻
            ['headline:头条新闻', 'KVProxy', 'getRecommendFragment', 20003, getJsonByKey('data')],

            // 客户权益
            ['rights:客户权益', 'KVProxy', 'getStaticFragment', 10018, getStringByKey('content')],

            // 今日要闻
            ['dayNews:今日要闻', 'KVProxy', 'getSelectedPool', 8, getStringByKey('data')],

            // 今日要闻多拼新闻
            ['extraNews:今日要闻多拼新闻', 'KVProxy', 'getStaticFragment', 10011, getStringByKey('content')],

            // 返回连环话数据
            ['comicBook:返回连环话数据', 'KVProxy', 'getDynamicFragment', '20027', getStringByKey('data')],

            // 大咖说
            ['talking:大咖说', 'KVProxy', 'getDynamicFragment', '1-75024-', getStringByKey('data')],

            // 财商教育
            ['finance:财商教育', 'KVProxy', 'getStructuredFragment', 20010, getStringByKey('content')],

            // 炒股大赛战报
            ['stocks:炒股大赛战报', 'KVProxy', 'getDynamicFragment', '40028', getStringByKey('data')],

            // 炒股大赛新闻
            ['stocksNews:炒股大赛新闻', 'KVProxy', 'getDynamicFragment', '1-67-75025-', getStringByKey('data')],

            // 财商教育新闻列表
            ['financeList:财商教育新闻列表', 'KVProxy', 'getRecommendFragment', 20006, getJsonByKey('data')],

            // 返回财经视频数据
            ['financeVideo:财经视频数据', 'KVProxy', 'getRecommendFragment', 55016, getStringByKey('data')],

            // 研究院
            ['institute:研究院', 'KVProxy', 'getDynamicFragment', '20030', getStringByKey('data')],

            // 国子策
            ['lark:国子策', 'KVProxy', 'getDynamicFragment', '20031', getStringByKey('data')],

            // 专题会议
            ['meeting:专题会议', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],

            // 信息流标题
            ['infoTitle:信息流标题', 'KVProxy', 'getStructuredFragment', 45005, getStringByKey('content')],

            // 底部合作链接
            ['cooperation:底部合作链接', 'KVProxy', 'getStaticFragment', 10015, getStringByKey('content')],

            // 理财超市
            ['market:理财超市', 'KVProxy', 'getStaticFragment', 10080, getStringByKey('content')],

            // 理财速递
            ['courier:理财速递', 'KVProxy', 'getStaticFragment', 10082, getStringByKey('content')],

            // 底部公用版权
            ['footer:底部公用版权', 'KVProxy', 'getStructuredFragment', 20036, getStringByKey('content')],

            // 二维码
            ['qrCode:二维码', 'KVProxy', 'getStructuredFragment', 20013, getStringByKey('content')],

            // adHead
            ['adHead', 'KVProxy', 'getAd', 'ad_new_chip/s_all-indexs_180823_ad_qpdggtb.inc.html', getString()],

            // adBody
            ['adBody', 'KVProxy', 'getAd', 'ad_new_chip/s_all_indexs_180823_ad_qpdpcggdb.inc.html', getString()],

            // topAd
            ['topAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_banner_top_1000x90.inc.html', getString()],

            // channelAd
            [
                'channelAd:channelAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_130318_index_ad_label_pdgm_180x25.inc.html',
                getString(),
            ],

            // dayNewsAd
            [
                'dayNewsAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_150721_ad_jryw_label.inc.html',
                getString(),
            ],

            // extraNewsAd
            [
                'extraNewsAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_150721_ad_jryw18.inc.html',
                getString(),
            ],

            // middleAd
            ['middleAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_170410_ad_banner01.inc.html', getString()],

            // financeVideoAd
            [
                'financeVideoAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_150721_ad_slide02.inc.html',
                getString(),
            ],

            // meetingAd
            [
                'meetingAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_131011_ad_label_rdzt.inc.html',
                getString(),
            ],

            // meetingListAd
            [
                'meetingListAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_140321_ad_ruanxing_redian06.inc.html',
                getString(),
            ],

            // marketAd
            ['marketAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_170410_lccsbkbq.inc.html', getString()],

            // courierAd
            [
                'courierAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_ad_170410_lcsdbkbq.inc.html',
                getString(),
            ],

            // asideAd1
            ['asideAd1', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_140321_ad_button01.inc.html', getString()],

            // asideAd2
            [
                'asideAd2',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_170417_ad_rectangle_02.inc.html',
                getString(),
            ],

            // asideAd3
            ['asideAd3', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_131011_ad_banner03.inc.html', getString()],

            // asideAd4
            ['asideAd4', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_text_01.inc.html', getString()],

            // asideAd5
            [
                'asideAd5',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_170417_ad_rectangle_04.inc.html',
                getString(),
            ],

            // asideAd6
            [
                'asideAd6',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_170417_ad_rectangle_05.inc.html',
                getString(),
            ],

            // asideAd7
            [
                'asideAd7',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_index_170417_ad_rectangle_06.inc.html',
                getString(),
            ],

            // infoAd
            ['infoAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_170410_tuwen01.inc.html', getString()],

            // hardAd
            ['hardAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_170410_ad_banner06.inc.html', getString()],

            // bottomAd
            ['bottomAd', 'KVProxy', 'getAd', 'ad_new_chip/s_all_index_ad_banner_bottom.inc.html', getString()],

            // floatAd1
            ['floatAd1', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_interstitial.inc.html', getString()],

            // floatAd2
            ['floatAd2', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_floatmedia.inc.html', getString()],

            // floatAd3
            ['floatAd3', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_couplet.inc.html', getString()],

            // floatAd4
            ['floatAd4', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_floatpause.inc.html', getString()],

            // floatAd5
            ['floatAd5', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_media.inc.html', getString()],

            // floatAd6
            ['floatAd6', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_popunder.html', getString()],
        ];
        // for (const item of json) {
        //     console.log(item[0]);
        // }
        const allData = await transfer(ctx, json);

        try {
            allData.headline = allData.headline && handleHeadlinePicData(allData.headline);

            const currentTime = moment().unix();

            const bannerPicAd =
                allData.bannerPicAd &&
                allData.bannerPicAd
                    .filter(item => item.isShow && (item.deadline ? moment(item.deadline).unix() > currentTime : true))
                    .map(item => ({
                        index: item.index,
                        url: formatUrl(item.url),
                        thumbnails: item.img ? formatImage(item.img, 400, 230) : '',
                        title: item.title,
                    }));

            const bannerPic =
                allData.bannerPic &&
                allData.bannerPic
                    .filter(item => item.thumbnails && item.thumbnails.image && item.thumbnails.image[0])
                    .slice(0, 5 - bannerPicAd.length)
                    .map(item => ({
                        url: formatUrl(item.url),
                        thumbnails:
                            item.thumbnails && item.thumbnails.image && item.thumbnails.image[0]
                                ? formatImage(item.thumbnails.image[0].url, 400, 230)
                                : '',
                        title: item.title,
                    }));

            bannerPicAd.forEach(item => {
                bannerPic.splice(item.index - 1, 0, item);
            });

            allData.bannerPic = bannerPic;

            const mainNews =
                allData.dayNews &&
                allData.dayNews
                    .filter(item => item.selectedLevel === '2')
                    .slice(0, 2)
                    .map(item => ({
                        url: formatUrl(item.url),
                        title: item.title,
                    }));

            const otherNews =
                allData.dayNews &&
                allData.dayNews
                    .filter(item => item.selectedLevel !== '2')
                    .slice(0, 12 - mainNews.length)
                    .map(item => ({
                        url: formatUrl(item.url),
                        title: item.title,
                    }));

            allData.dayNews = [mainNews[0], ...otherNews.slice(0, 5), mainNews[1], ...otherNews.slice(5)];

            const comicBook = allData.comicBook && allData.comicBook[0];

            allData.comicBook = {
                url: formatUrl(comicBook.url),
                thumbnails:
                    comicBook.thumbnails && comicBook.thumbnails.image && comicBook.thumbnails.image[0]
                        ? formatImage(comicBook.thumbnails.image[0].url, 198, 120)
                        : '',
                title: comicBook.title,
                date: comicBook.newsTime.split(' ')[0],
            };

            const talkingTitle = allData.talking && allData.talking[0];
            const talking =
                allData.talking &&
                allData.talking.slice(1, 4).map(item => ({
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            allData.talking = [
                {
                    url: formatUrl(talkingTitle.url),
                    title: talkingTitle.title,
                    wemediaEAccountId: talkingTitle.wemediaEAccountId,
                },
            ].concat(talking);

            allData.financeList = allData.financeList && handleFinanceListPicData(allData.financeList);

            const stocks =
                allData.stocks &&
                allData.stocks.map(item => ({
                    url: formatUrl(item.url),
                    title: item.title,
                }));

            const stocksNews =
                allData.stocksNews &&
                allData.stocksNews
                    .filter(item => (item.base62Id !== allData.stocks[0] ? allData.stocks[0].base62Id : ''))
                    .slice(0, 3)
                    .map(item => ({
                        url: formatUrl(item.url),
                        title: item.title,
                    }));

            allData.stocks = [...stocks, ...stocksNews];

            allData.financeVideo = allData.financeVideo && handleFinanceVideoData(allData.financeVideo);

            const institute = allData.institute && allData.institute[0];

            allData.institute = {
                url: institute ? formatUrl(institute.url) : '',
                thumbnails:
                    institute && institute.thumbnails && institute.thumbnails.image && institute.thumbnails.image[0]
                        ? formatImage(institute.thumbnails.image[0].url, 300, 169)
                        : '',
                title: institute ? institute.title : '',
            };

            const lark = allData.lark && allData.lark[0];

            allData.lark = {
                url: lark ? formatUrl(lark.url) : '',
                thumbnails:
                    lark && lark.thumbnails && lark.thumbnails.image && lark.thumbnails.image[0]
                        ? formatImage(lark.thumbnails.image[0].url, 300, 169)
                        : '',
                title: lark ? lark.title : '',
            };

            allData.meeting =
                allData.meeting &&
                allData.meeting.slice(0, 7).map(item => ({
                    banner: formatImage(item.thumbnail !== '' ? item.thumbnail : item.banner, 300, 141),
                    title: item.title,
                    url: formatUrl(item.url),
                }));

            if (allData.qrCode) {
                allData.qrCode.url = formatImage(allData.qrCode.url, 120, 164);
            }
        } catch (error) {
            logger.error(error);
            ctx.errorCount++;
        }

        const adDataAndStaticData = handleAdDataAndStaticData(ctx, json, allData);

        await ctx.html('finance_index', {
            allData,
            statisticsData: adDataAndStaticData.statisticsData,
            adData: adDataAndStaticData.adData,
            staticData: adDataAndStaticData.staticData,
        });
    },
};
