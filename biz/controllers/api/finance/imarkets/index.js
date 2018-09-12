/* 缓存推荐位信息和信息流信息 */
const { transfer, getJsonByKey } = require('../../../../services/common/common');
const { imarketslist } = require('../../../../services/utils/list');

exports.goldSnapshotsDataCache = {
    path: '/api/gold/snapshots/dataCache',
    method: 'get',
    online: true,
    handler: async ctx => {
        const json = [
            ['allnews', 'KVProxy', 'getDynamicFragment', '20044', getJsonByKey('data')],
        ];
        const allData = await transfer(ctx, json);

        const { topnews, newsstream } = imarketslist(allData.allnews, true);

        allData.topnews = topnews;
        allData.newsstream = newsstream;
        delete allData.allnews;

        ctx.json(allData);
    },
};
