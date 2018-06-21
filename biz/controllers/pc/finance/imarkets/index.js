const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy, getCustom } = require('../../../../providers/ucmsapiProxy');
const {
    promiseAll,
    jsonParse,
    handleData,
    handleJson,
    handleJsonByKey,
    handleJs,
    handleStringByKey,
} = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/imarkets',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    handler: async ctx => {
        // 页面公用导航
        const json = {
            // 顶部导航接口WW
            nav: KVProxy.getStaticFragment(ctx, 10108).then(...handleJsonByKey(ctx, 'content')),
            // 顶部新闻
            topnews: KVProxy.getStaticFragment(ctx, 10165).then(...handleJsonByKey(ctx, 'content')),
            // 信息流
            newsstream: KVProxy.getCustom(ctx, 'finance_22005_10736_33').then(...handleJson(ctx)),
            // 热点专题
            hottopic: KVProxy.getCustom(ctx, 'cmpp_topic_list_finance').then(...handleJson(ctx)),
            // 底部合作链接
            cooperation: KVProxy.getStaticFragment(ctx, 10164).then(...handleJs(ctx, 'content')),
            // 底部公用版权
            footer: KVProxy.getStaticFragment(ctx, 10114).then(...handleJsonByKey(ctx, 'content')),
        };

        const allData = await promiseAll(json);
        await ctx.html('finance_imarkets', {
            allData,
        });
    },
};
