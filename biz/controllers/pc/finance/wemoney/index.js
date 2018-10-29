const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/wemoney/test',
    method: 'get',
    cache: 0,
    edit: true,
    type: 'html',
    low: true,
    preview: true,
    online: true,
    handler: async ctx => {
        const json = [
            // 统计代码 Head 片段
            ['statisticsHead', 'KVProxy', 'getStaticFragment', 15015, getStringByKey('content')],

            // 统计代码 Body 片段
            ['statisticsBody', 'KVProxy', 'getStaticFragment', 15016, getStringByKey('content')],
            
            // 通用导航
            ['commonNav', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 导航
            ['navigation', 'KVProxy', 'getStaticFragment', 10003, getJson()],

            // 轮播
            ['slider', 'KVProxy', 'getStructuredFragment', 20034, getStringByKey('content')],

            // 广告
            ['adAside1', 'KVProxy', 'getStaticFragment', 10021, getStringByKey('content')],
            ['adAside2', 'KVProxy', 'getStaticFragment', 10022, getStringByKey('content')],
            ['adAside3', 'KVProxy', 'getStaticFragment', 10023, getStringByKey('content')],
            ['adAside4', 'KVProxy', 'getStaticFragment', 10024, getStringByKey('content')],
            // ['adAside5', 'KVProxy', 'getStaticFragment', 10025, getStringByKey('content')],

            // 热门新闻标题
            ['hotNewsTitle', 'KVProxy', 'getStructuredFragment', 20033, getStringByKey('content')],

            // 热门新闻
            ['hotNews', 'KVProxy', 'getStructuredFragment', 20032, getStringByKey('content')],

            // 新闻列表
            ['info', 'KVProxy', 'getStructuredFragment', 20031, getStringByKey('content')],
            
            // 更多新闻链接
            ['moreNews', 'KVProxy', 'getStructuredFragment', 30086, getStringByKey('content')],

            // 版权
            ['copyright', 'KVProxy', 'getStaticFragment', 10121, getStringByKey('content')],
        ];

        const allData = await transfer(ctx, json);

        const statisticsData = {
            statisticsHead: allData.statisticsHead,
            statisticsBody: allData.statisticsBody,
        };

        delete allData.statisticsHead;
        delete allData.statisticsBody;

        await ctx.html('finance_wemoney', {
            allData,
            statisticsData,
        });
    },
};
