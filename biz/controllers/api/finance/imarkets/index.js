/* 缓存推荐位信息和信息流信息 */
const { transfer, getJsonByKey, getStringByKey } = require('../../../../services/common/common');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');

exports.goldSnapshotsDataCache = {
    path: '/api/gold/snapshots/dataCache',
    method: 'get',
    online: false,
    handler: async ctx => {
        const json = [
            // 顶部新闻
            ['topnews', 'KVProxy', 'getStaticFragment', '10165', getStringByKey('content')],
            // 信息流
            ['newsstream', 'KVProxy', 'getDynamicFragment', '20044', getJsonByKey('data')],
        ];
        const allData = await transfer(ctx, json);

        allData.newsstream = typeof allData.newsstream === 'string' ? [] : allData.newsstream;
        ctx.json(allData);
    },
};
