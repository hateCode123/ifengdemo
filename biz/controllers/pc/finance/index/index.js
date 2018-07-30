const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/(index)?',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
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

            // Logo
            ['logo', 'KVProxy', 'getStructuredFragment', 20006, getStringByKey('content')],

            // Logo Ad
            ['logoAd', 'KVProxy', 'getStructuredFragment', 20007, getStringByKey('content')],

            // 财经首页导航
            ['navigation', 'KVProxy', 'getStructuredFragment', 20008, getStringByKey('content')],

            // 投顾产品
            ['production', 'KVProxy', 'getStructuredFragment', 20009, getStringByKey('content')],

            // 焦点图
            ['bannerPic', 'KVProxy', 'getSelectedPool', 9, getStringByKey('data')],

            // 头条新闻
            ['headline', 'KVProxy', 'getRecommendFragment', 20003, getJsonByKey('data')],

            // 客户权益
            ['rights', 'KVProxy', 'getStaticFragment', 10018, getStringByKey('content')],

            // 每日要闻
            ['dayNews', 'KVProxy', 'getSelectedPool', 8, getStringByKey('data')],

            // 每日要闻多拼新闻
            ['extraNews', 'KVProxy', 'getStaticFragment', 10011, getStringByKey('content')],

            // 返回连环话数据
            ['comicBook', 'KVProxy', 'getCustom', 'finance_22005_10736_27', getJson()],

            // 大咖说
            ['talking', 'KVProxy', 'getCustom', 'finance_22005_10736_34', getJson()],

            // 财商教育
            ['finance', 'KVProxy', 'getStructuredFragment', 20010, getStringByKey('content')],

            // 炒股大赛
            ['stocks', 'KVProxy', 'getCustom', 'finance_22005_10736_31', getJson()],

            // 财商教育新闻列表
            ['financeList', 'KVProxy', 'getRecommendFragment', 20006, getJsonByKey('data')],

            // 返回财经视频数据
            ['financeVideo', 'KVProxy', 'getSelectedPool', 12, getStringByKey('data')],

            // 研究院
            ['institute', 'KVProxy', 'getCustom', 'finance_22005_10736_32', getJson()],

            // 国子策
            ['lark', 'KVProxy', 'getCustom', '22005_516_36328', getJson()],

            // 专题会议
            ['meeting', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],

            // 底部合作链接
            ['cooperation', 'KVProxy', 'getStaticFragment', 10015, getStringByKey('content')],

            // 理财超市
            ['market', 'KVProxy', 'getStaticFragment', 10014, getStringByKey('content')],

            // 理财速递
            ['courier', 'KVProxy', 'getStructuredFragment', 20011, getStringByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStructuredFragment', 20012, getStringByKey('content')],

            // 二维码
            ['qrCode', 'KVProxy', 'getStructuredFragment', 20013, getStringByKey('content')],

            // topAd
            ['topAd', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_banner_top_1000x90.inc.html', getString()],

            // channelAd
            [
                'channelAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_130318_index_ad_label_pdgm_180x25.inc.html',
                getString(),
            ],

            // dayNewsAd
            [
                'dayNewsAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_150721_ad_jryw_label.inc.html',
                getString(),
            ],

            // extraNewsAd
            [
                'extraNewsAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_150721_ad_jryw18.inc.html',
                getString(),
            ],

            // middleAd
            ['middleAd', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_170410_ad_banner01.inc.html', getString()],

            // financeVideoAd
            [
                'financeVideoAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_150721_ad_slide02.inc.html',
                getString(),
            ],

            // meetingAd
            [
                'meetingAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_131011_ad_label_rdzt.inc.html',
                getString(),
            ],

            // meetingListAd
            [
                'meetingListAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_140321_ad_ruanxing_redian06.inc.html',
                getString(),
            ],

            // marketAd
            ['marketAd', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_170410_lccsbkbq.inc.html', getString()],

            // courierAd
            [
                'courierAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_ad_170410_lcsdbkbq.inc.html',
                getString(),
            ],

            // asideAd1
            ['asideAd1', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_140321_ad_button01.inc.html', getString()],

            // asideAd2
            [
                'asideAd2',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_170417_ad_rectangle_02.inc.html',
                getString(),
            ],

            // asideAd3
            ['asideAd3', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_131011_ad_banner03.inc.html', getString()],

            // asideAd4
            ['asideAd4', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_text_01.inc.html', getString()],

            // asideAd5
            [
                'asideAd5',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_170417_ad_rectangle_04.inc.html',
                getString(),
            ],

            // asideAd6
            [
                'asideAd6',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_170417_ad_rectangle_05.inc.html',
                getString(),
            ],

            // asideAd7
            [
                'asideAd7',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_170417_ad_rectangle_06.inc.html',
                getString(),
            ],

            // infoAd
            ['infoAd', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_170410_tuwen01.inc.html', getString()],

            // hardAd
            ['hardAd', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_170410_ad_banner06.inc.html', getString()],

            // bottomAd
            [
                'bottomAd',
                'KVProxy',
                'getAd',
                '/test/ssi-incs/s_finance_index_ad_banner_bottom_1000x90.inc.html',
                getString(),
            ],

            // floatAd1
            ['floatAd1', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_interstitial.inc.html', getString()],

            // floatAd2
            ['floatAd2', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_floatmedia.inc.html', getString()],

            // floatAd3
            ['floatAd3', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_couplet.inc.html', getString()],

            // floatAd4
            ['floatAd4', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_floatpause.inc.html', getString()],

            // floatAd5
            ['floatAd5', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_media.inc.html', getString()],

            // floatAd6
            ['floatAd6', 'KVProxy', 'getAd', '/test/ssi-incs/s_finance_index_ad_popunder.html', getString()],
        ];

        const allData = await transfer(ctx, json);

        allData.bannerPic =
            allData.bannerPic &&
            allData.bannerPic.slice(0, 5).map(item => ({
                url: item.url,
                thumbnails: item.thumbnails && item.thumbnails.image ? item.thumbnails.image[0].url : '',
                title: item.title,
            }));

        allData.dayNews = allData.dayNews.slice(0, 12).map(item => ({
            url: item.url,
            title: item.title,
        }));

        const comicBook = allData.comicBook.list[0];

        allData.comicBook = {
            url: comicBook.url,
            thumbnails:
                comicBook.thumbnails && JSON.parse(comicBook.thumbnails).image[0]
                    ? JSON.parse(comicBook.thumbnails).image[0].url
                    : '',
            title: comicBook.title,
            date: comicBook.newsTime.split(' ')[0],
        };

        const talkingTitle = allData.talking.list[0];
        const talking = allData.talking.list.slice(1, 7).map(item => ({
            url: item.url,
            title: item.title,
        }));

        allData.talking = [
            {
                url: talkingTitle.url,
                title: talkingTitle.title,
                name: talkingTitle.wemediaEAccountName,
                img:
                    talkingTitle.thumbnails && JSON.parse(talkingTitle.thumbnails).image[0]
                        ? JSON.parse(talkingTitle.thumbnails).image[0].url
                        : '',
            },
        ].concat(talking);

        allData.stocks =
            allData.stocks.list &&
            allData.stocks.list.slice(0, 6).map(item => ({
                url: item.url,
                title: item.title,
            }));
        allData.financeVideo = allData.financeVideo
            ? allData.financeVideo.slice(0, 3).map(item => ({
                  url: item.url,
                  thumbnails: item.thumbnails && item.thumbnails.image ? item.thumbnails.image[0].url : '',
                  title: item.title,
              }))
            : [
                  {
                      url: '',
                      thumbnails: '',
                      title: '',
                  },
              ];

        const institute = allData.institute.list[0];

        allData.institute = {
            url: institute.url,
            thumbnails:
                institute.thumbnails && institute.thumbnails !== ''
                    ? JSON.parse(institute.thumbnails).image[0].url
                    : '',
            title: institute.title,
        };

        const lark = allData.lark;

        allData.lark = {
            url: lark.url,
            thumbnails: lark.thumbnails && lark.thumbnails !== '' ? JSON.parse(lark.thumbnails).image[0].url : '',
            title: lark.title,
        };

        const statisticsData = {
            statisticsHead: allData.statisticsHead,
            statisticsBody: allData.statisticsBody,
        };

        delete allData.statisticsHead;
        delete allData.statisticsBody;

        await ctx.html('finance_index', {
            allData,
            statisticsData,
        });
    },
};
