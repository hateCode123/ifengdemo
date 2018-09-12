const logger = require('../../../../common/logger');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');
const { cu } = require('../../../../providers/ucmsapiProxy');

const handler = async ctx => {
    const { params } = ctx;

    if (params.snapshots && params.snapshots !== 'snapshots') return;
    if (params.snapshots && params.snapshots === 'snapshots' && (!params.year || !params.date)) return;

    const json = [
        // 顶部导航接口
        ['nav', 'KVProxy', 'getStructuredFragment', '20002', getStringByKey('content')],
        // 热点专题
        ['hottopic', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],
        // 底部合作链接
        ['cooperation', 'KVProxy', 'getStaticFragment', '10164', getStringByKey('content')],
        // 底部公用版权
        ['footer', 'KVProxy', 'getStaticFragment', '10114', getJsonByKey('content')],
        // adHead
        [
            'adHead',
            'KVProxy',
            'getAd',
            'http://news.ifeng.com/ssi-incs/s_all-indexs_180823_ad_qpdggtb.inc.html/test',
            getString(),
        ],
        // adBody
        [
            'adBody',
            'KVProxy',
            'getAd',
            'http://news.ifeng.com/ssi-incs/s_all_indexs_180823_ad_qpdpcggdb.inc.html/test',
            getString(),
        ],
        // 广告1000*90
        [
            'footerAd',
            'KVProxy',
            'getAd',
            'http://finance.ifeng.com/ssi-incs/s_finance_stock_index_ad_banner_top_1000x90.inc.html/test',
            getString(),
        ],
        // 广告300*600
        [
            'asideAd',
            'KVProxy',
            'getAd',
            'http://finance.ifeng.com/ssi-incs/s_finance_index_140321_ad_button01.inc.html/test',
            getString(),
        ],
        // 广告
        [
            'asideFixedAd',
            'KVProxy',
            'getAd',
            'http://www.ifeng.com/ssi-incs/s_all_2j_index_150514_ad_button01.inc.html/test',
            getString(),
        ],
    ];

    if (!params.snapshots && !params.year && !params.date) {
        json.push(
            // 顶部新闻
            ['topnews', 'KVProxy', 'getStaticFragment', '10165', getStringByKey('content')],
            // 信息流
            ['newsstream', 'KVProxy', 'getDynamicFragment', '20044', getJsonByKey('data')],
        );
    } else {
        // 旧的数据
        json.push(['financeGoldSnapshots', 'KVProxy', 'getCustom', `financeGoldSnapshots${params.year}${params.date}`, getString()]);
    }

    const allData = await transfer(ctx, json);

    // 处理旧数据
    if ('financeGoldSnapshots' in allData) {
        if (typeof allData.financeGoldSnapshots === 'string') {
            const financeGoldSnapshots = JSON.parse(allData.financeGoldSnapshots);

            allData.newsstream = financeGoldSnapshots.newsstream;
            allData.topnews = financeGoldSnapshots.topnews;
            delete allData.financeGoldSnapshots;
        } else {
            return;
        }
    }

    allData.newsstream = typeof allData.newsstream === 'string' ? [] : allData.newsstream;

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

    await ctx.html('finance_imarkets', {
        allData,
        adData,
        staticData,
    });
};

exports.gold = {
    path: '/pc/finance/gold/test',
    method: 'get',
    type: 'html',
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler,
};

exports.snapshots = {
    path: '/pc/finance/gold/:snapshots?/:year?/:date?/test',
    method: 'get',
    type: 'html',
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler,
};
