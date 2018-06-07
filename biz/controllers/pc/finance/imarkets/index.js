const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
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
    handler: async ctx => {
        // 页面公用导航
        const json = {
            // 顶部导航接口
            nav: KVProxy.getStaticFragment(ctx, 10108).then(...handleJsonByKey(ctx, 'content'))
        };

        const allData = await promiseAll(json);
        await ctx.html('finance_imarkets', {
            allData,
        });
    },
};
