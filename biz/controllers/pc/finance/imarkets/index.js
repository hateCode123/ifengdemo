const logger = require('../../../../common/logger');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/imarkets',
    method: 'get',
    type: 'html',
    edit: true,
    low: true,
    preview: true,
    handler: async ctx => {
        const json = [
            // 顶部导航接口WW
            ['nav', 'KVProxy', 'getStructuredFragment', '20002', getStringByKey('content')],
            // 顶部新闻
            ['topnews', 'KVProxy', 'getStaticFragment', '10165', getStringByKey('content')],
            // 信息流
            ['newsstream', 'KVProxy', 'getCustom', 'finance_22005_10736_33', getJson()],
            // 热点专题
            ['hottopic', 'KVProxy', 'getCustom', 'cmpp_topic_list_finance', getJson()],
            // 底部合作链接
            ['cooperation', 'KVProxy', 'getStaticFragment', '10164', getStringByKey('content')],
            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', '10114', getJsonByKey('content')],
        ];

        const allData = await transfer(ctx, json);

        await ctx.html('finance_imarkets', {
            allData,
        });
    },
};
