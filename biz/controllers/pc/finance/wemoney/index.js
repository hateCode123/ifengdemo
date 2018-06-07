const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/wemoney',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        let json = [
            // 通用导航
            ['commonNav', 'KVProxy', 'getStaticFragment', 10108, getJsonByKey('content')],

            // 导航
            ['navigation', 'KVProxy', 'getStaticFragment', 10003, getJson()],

            // 轮播
            ['slider', 'KVProxy', 'getStaticFragment', 10006, getJsonByKey('content')],

            // 广告
            ['adAside1', 'KVProxy', 'getStaticFragment', 10021, getJson()],
            ['adAside2', 'KVProxy', 'getStaticFragment', 10022, getJson()],
            ['adAside3', 'KVProxy', 'getStaticFragment', 10023, getJson()],
            ['adAside4', 'KVProxy', 'getStaticFragment', 10024, getJson()],
            ['adAside5', 'KVProxy', 'getStaticFragment', 10025, getJson()],

            // 热门新闻标题
            ['hotNewsTitle', 'KVProxy', 'getStaticFragment', 10122, getJsonByKey('content')],

            // 热门新闻
            ['hotNews', 'KVProxy', 'getStaticFragment', 10005, getJsonByKey('content')],

            // 新闻列表
            ['info', 'KVProxy', 'getStaticFragment', 10007, getJsonByKey('content')],

            // 版权
            ['copyright', 'KVProxy', 'getStaticFragment', 10121, getStringByKey('content')],
        ];

        let allData = await transfer(ctx, json);
        await ctx.html('finance_wemoney', {
            allData,
        });
    },
};
