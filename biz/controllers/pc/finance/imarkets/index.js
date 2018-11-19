const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../../services/common/common');
const { formatList } = require('../../../../services/utils/list');
const { handleAdDataAndStaticData } = require('../../../../services/utils/utils');
const handler = async ctx => {
    const { params } = ctx;

    if (params.snapshots && params.snapshots !== 'snapshots') return;
    if (params.snapshots && params.snapshots === 'snapshots' && (!params.year || !params.date)) return;

    const json = [
        ['statisticsHead:统计代码（头）', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],
        ['statisticsBody:统计代码（尾）', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],
        ['nav:顶部导航', 'KVProxy', 'getStructuredFragment', '20002', getStringByKey('content')],
        ['hottopic:热点专题', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],
        ['cooperation:底部合作链接', 'KVProxy', 'getStaticFragment', '10164', getStringByKey('content')],
        ['footer:底部公用版权', 'KVProxy', 'getStructuredFragment', 20012, getJsonByKey('content')],
        ['adHead:广告（头）', 'KVProxy', 'getAd', 'ad_new_chip/s_all-indexs_180823_ad_qpdggtb.inc.html', getString()],
        ['adBody:广告（尾）', 'KVProxy', 'getAd', 'ad_new_chip/s_all_indexs_180823_ad_qpdpcggdb.inc.html', getString()],
        // 广告1000*90
        ['footerAd:底部广告', 'KVProxy', 'getAd', 'ad_new_chip/s_all_index_ad_banner_bottom.inc.html', getString()],
        // 广告300*600
        ['asideAd:侧栏广告', 'KVProxy', 'getAd', 'adchip_finance/s_finance_index_140321_ad_button01.inc.html', getString()],
        // 广告
        ['asideFixedAd:悬浮广告', 'KVProxy', 'getAd', 'ad_new_chip/s_all_2j_index_150514_ad_button01.inc.html', getString()],
    ];

    if (!params.snapshots && !params.year && !params.date) {
        // 信息流
        json.push(
            ['topnews:推荐位', 'KVProxy', 'getRecommendFragment', 55069, getJsonByKey('data')],
            ['newsstream:信息流', 'KVProxy', 'getDynamicFragment', 20044, getJsonByKey('data')],
        );
    } else {
        // 旧的数据
        json.push(['financeGoldSnapshots:旧数据', 'KVProxy', 'getCustom', `financeGoldSnapshots${params.year}${params.date}`, getString()]);
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

    const adDataAndStaticData = handleAdDataAndStaticData(ctx, json, allData);

    await ctx.html('finance_imarkets', {
        allData,
        statisticsData: adDataAndStaticData.statisticsData,
        adData: adDataAndStaticData.adData,
        staticData: adDataAndStaticData.staticData,
    });
};

exports.gold = {
    path: '/pc/finance/gold',
    method: 'get',
    type: 'html',
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler,
};

exports.snapshots = {
    path: '/pc/finance/gold/:snapshots?/:year?/:date?',
    method: 'get',
    type: 'html',
    edit: true,
    low: true,
    preview: true,
    online: true,
    handler,
};
