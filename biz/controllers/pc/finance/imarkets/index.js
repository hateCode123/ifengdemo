const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');
const { formatList } = require('../../../../services/utils/list');

const handler = async ctx => {
    const { params } = ctx;

    if (params.snapshots && params.snapshots !== 'snapshots') return;
    if (params.snapshots && params.snapshots === 'snapshots' && (!params.year || !params.date)) return;

    const json = [
        // 统计代码
        ['statisticsHead', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],
        ['statisticsBody', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],
        // 顶部导航接口
        ['nav', 'KVProxy', 'getStructuredFragment', '20002', getStringByKey('content')],
        // 热点专题
        ['hottopic', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],
        // 底部合作链接
        ['cooperation', 'KVProxy', 'getStaticFragment', '10164', getStringByKey('content')],
        // 底部公用版权
        ['footer', 'KVProxy', 'getStaticFragment', '10114', getJsonByKey('content')],
        // adHead
        ['adHead', 'KVProxy', 'getAd', 'ad_new_chip/s_all-indexs_180823_ad_qpdggtb.inc.html', getString()],
        // adBody
        ['adBody', 'KVProxy', 'getAd', 'ad_new_chip/s_all_indexs_180823_ad_qpdpcggdb.inc.html', getString()],
        // 广告1000*90
        ['footerAd', 'KVProxy', 'getAd', 'ad_new_chip/s_all_index_ad_banner_bottom.inc.html', getString()],
        // 广告300*600
        ['asideAd', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_140321_ad_button01.inc.html', getString()],
        // 广告
        ['asideFixedAd', 'KVProxy', 'getAd', 'ad_new_chip/s_all_2j_index_150514_ad_button01.inc.html', getString()],
    ];

    if (!params.snapshots && !params.year && !params.date) {
        // 信息流
        json.push(
            ['topnews', 'KVProxy', 'getRecommendFragment', 55069, getJsonByKey('data')],
            ['newsstream', 'KVProxy', 'getDynamicFragment', 20044, getJsonByKey('data')],
        );
    } else {
        // 旧的数据
        json.push(['financeGoldSnapshots', 'KVProxy', 'getCustom', `financeGoldSnapshots${params.year}${params.date}`, getString()]);
    }

    const allData = await transfer(ctx, json);

    // 处理新数据
    if ('topnews' in allData && 'newsstream' in allData) {
        allData.newsstream = formatList(allData.newsstream.slice(0, 36));
        allData.topnews = formatList(allData.topnews, true);
    }

    // 处理旧数据
    if ('financeGoldSnapshots' in allData) {
        if (typeof allData.financeGoldSnapshots === 'string') {
            const financeGoldSnapshots = JSON.parse(allData.financeGoldSnapshots);

            allData.newsstream = formatList(financeGoldSnapshots.newsstream);
            allData.topnews = formatList(financeGoldSnapshots.topnews, true);
            delete allData.financeGoldSnapshots;
        } else {
            return;
        }
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

    await ctx.html('finance_imarkets', {
        allData,
        adData,
        staticData,
        statisticsData: {
            statisticsHead: allData.statisticsHead,
            statisticsBody: allData.statisticsBody,
        },
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
