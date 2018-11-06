/* 缓存推荐位信息和信息流信息 */
const { transfer, getJsonByKey } = require('../../../../services/common/common');
const { formatList } = require('../../../../services/utils/list');

exports.goldSnapshotsDataCache = {
    path: '/api/gold/snapshots/dataCache',
    method: 'get',
    online: true,
    handler: async ctx => {
        const json = [
            ['topnews:推荐位', 'KVProxy', 'getRecommendFragment', 55069, getJsonByKey('data')],
            ['newsstream:信息流', 'KVProxy', 'getDynamicFragment', 20044, getJsonByKey('data')],
        ];
        const allData = await transfer(ctx, json);

        allData.topnews = formatList(allData.topnews);
        allData.newsstream = formatList(allData.newsstream.slice(0, 40));

        ctx.json(allData);
    },
};
