// const redis = require('../../../../common/redis');
// const logger = require('../../../../common/logger');
// const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');
const { formatImage, formatUrl } = require('@ifeng/public_method');
const logger = require('../../../../common/logger');

exports.financeWemoney = {
    path: '/pc/finance/money/test',
    method: 'get',
    edit: true,
    type: 'html',
    low: true,
    preview: true,
    online: true,
    handler: async ctx => {
        const json = [
            ['nav', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            ['navigation', 'KVProxy', 'getStaticFragment', 10019, getJsonByKey('content')],

            ['subNavigation', 'KVProxy', 'getStaticFragment', 15024, getStringByKey('content')],

            ['bannerLogo', 'KVProxy', 'getStaticFragment', 15029, getStringByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStaticFragment', 10129, getJsonByKey('content')],

            ['newsListDownSlider', 'KVProxy', 'getSelectedPool', 11, getStringByKey('data')],

            ['market', 'KVProxy', 'getStaticFragment', 15026, getStringByKey('content')],
            
            ['marketTitle', 'KVProxy', 'getStaticFragment', 15030, getJsonByKey('content')],
            
            ['topLinkTable', 'KVProxy', 'getStaticFragment', 15027, getStringByKey('content')],

            ['sudiContent01', 'KVProxy', 'getStaticFragment', 10048, getJsonByKey('content')],
            ['sudiContent02', 'KVProxy', 'getStaticFragment', 10111, getJsonByKey('content')],

            // 境内 权益
            ['jingneiQuanyiHotFunds', 'KVProxy', 'getCustom', 'finance_22005_516_1293', getJson()],

            // 境内 货币
            ['jingneiHuobiHotFunds', 'KVProxy', 'getCustom', 'finance_22005_516_1294', getJson()],

            // 海外基金
            ['haiwaiHotfunds', 'KVProxy', 'getCustom', 'finance_22005_516_1295', getJson()],

            // 热点推荐 股票型
            ['rediantuijianTableStock', 'KVProxy', 'getCustom', 'finance_22005_516_1296', getJson()],

            //  热点推荐 混合型
            ['rediantuijianTableMix', 'KVProxy', 'getCustom', 'finance_22005_516_1297', getJson()],

            // 热点推荐 指数型
            ['rediantuijianTableZhishu', 'KVProxy', 'getCustom', 'finance_22005_516_1298', getJson()],

            // 热点推荐 债券型
            ['rediantuijianTableZhaiquan', 'KVProxy', 'getCustom', 'finance_22005_516_1299', getJson()],

            // 热点推荐 货币型
            ['rediantuijianTableMoney', 'KVProxy', 'getCustom', 'finance_22005_516_1300', getJson()],

            ['slider', 'KVProxy', 'getSelectedPool', 10, getStringByKey('data')],

            ['topCollapse', 'KVProxy', 'getStaticFragment', 10160, getJsonByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStaticFragment', 10131, getJsonByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStructuredFragment', 20036, getJsonByKey('content')],

            // adHead
            ['adHead', 'KVProxy', 'getAd', 'ad_new_chip/s_all-indexs_180823_ad_qpdggtb.inc.html', getString()],

            // adBody
            ['adBody', 'KVProxy', 'getAd', 'ad_new_chip/s_all_indexs_180823_ad_qpdpcggdb.inc.html', getString()],

            // topAd
            ['topAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_ad_banner_top_1000x90.inc.html', getString()],

            // infoAd
            ['infoAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_stock_index_ad_button_02.inc.html', getString()],

            // hardAd
            [
                'hardAd',
                'KVProxy',
                'getAd',
                'adchip_finance/s_finance_stock_index_ad_banner_top_1000x90.inc.html',
                getString(),
            ],
            ['partnerlist', 'KVProxy', 'getStaticFragment', 15025, getStringByKey('content')],

            ['bottom', 'KVProxy', 'getStaticFragment', 15028, getStringByKey('content')],
            // bottomAd
            ['bottomAd', 'KVProxy', 'getAd', 'ad_new_chip/s_all_index_ad_banner_bottom.inc.html', getString()],
        ];

        const allData = await transfer(ctx, json);

        try {
            const __slider = allData.slider && allData.slider.slice(0, 5);

            allData.slider = [...__slider].map(a => ({
                thumbnailsCount: a.thumbnailsCount,
                thumbnails: a.thumbnails,
                title: a.title,
                // src: a.src && a.src !== '' ? formatImage(a.src, 400, 180) : '',
                url: a.url ? formatUrl(a.url) : '',
                ...a,
            }));
        } catch (error) {
            logger.error(error);
        }

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
        await ctx.html('finance_money', {
            allData,
            adData,
            staticData,
        });
    },
};
