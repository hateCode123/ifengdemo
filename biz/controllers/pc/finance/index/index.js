const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/index',
    domain: 'finance.ifeng.com/index.shtml',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    handler: async ctx => {
        const json = [
            // 通用导航
            ['nav', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStaticFragment', 10129, getJsonByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStaticFragment', 10131, getJsonByKey('content')],

            // Logo Ad
            ['logoAd', 'KVProxy', 'getStaticFragment', 10132, getJsonByKey('content')],

            // 财经首页导航
            ['navigation', 'KVProxy', 'getStaticFragment', 10002, getJsonByKey('content')],

            // 投顾产品
            ['production', 'KVProxy', 'getStaticFragment', 10017, getJsonByKey('content')],

            // 焦点图
            ['bannerPic', 'KVProxy', 'getSelectedPool', 9, getStringByKey('data')],

            // 头条新闻
            ['headline', 'KVProxy', 'getRecommendFragment', 20003, getJsonByKey('data')],

            // 客户权益
            ['rights', 'KVProxy', 'getStaticFragment', 10018, getJsonByKey('content')],

            // 每日要闻
            ['dayNews', 'KVProxy', 'getSelectedPool', 8, getStringByKey('data')],

            // 每日要闻多拼新闻
            ['extraNews', 'KVProxy', 'getStaticFragment', 10011, getStringByKey('content')],

            // 返回连环话数据
            ['comicBook', 'KVProxy', 'getCustom', 'finance_22005_10736_27', getJson()],

            // 大咖说
            ['talking', 'KVProxy', 'getCustom', 'finance_22005_10736_34', getJson()],

            // 财商教育
            ['finance', 'KVProxy', 'getStaticFragment', 10009, getJsonByKey('content')],

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
            ['courier', 'KVProxy', 'getStaticFragment', 10016, getJsonByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],

            // 二维码
            ['qrCode', 'KVProxy', 'getStaticFragment', 10135, getJsonByKey('content')],
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

        await ctx.html('finance_index', {
            allData,
        });
    },
};
