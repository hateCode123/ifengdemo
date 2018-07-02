// const redis = require('../../../../common/redis');
// const logger = require('../../../../common/logger');
// const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/money',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        //     const Tars = require('@tars/stream');

        //     let jsons = [
        //         ['newsListDownSlider', 'KVProxy', 'getDynamicFragment', 10009, getJsonByKey('data')],
        //     ['slider', 'KVProxy', 'getDynamicFragment', 10008, getJson()],
        // ]

        //     let all = await transfer(ctx,jsons);
        //     return ctx.body = all;

        let json = [
            ['nav', 'KVProxy', 'getStructuredFragment', 20002, getJsonByKey('content')],

            ['navigation', 'KVProxy', 'getStaticFragment', 10019, getJsonByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStaticFragment', 10129, getJsonByKey('content')],

            ['newsListDownSlider', 'KVProxy', 'getDynamicFragment', 10009, getStringByKey('data')],

            // 境内 权益
            ['jingneiQuanyiHotFunds', 'KVProxy', 'getCustom', 'finance_22005_516_1293', getJson()],

            // 境内 货币
            ['jingneiHuobiHotFunds', 'KVProxy', 'getCustom', 'finance_22005_516_1294', getJson()],

            // 海外基金
            ['haiwaiHotfunds', 'KVProxy', 'getCustom', 'finance_22005_516_1295', getJson()],

            // 热点推荐 股票型
            ['rediantuijianTableStock', 'KVProxy', 'getCustom', 'finance_22005_516_1296', getJson()],

            //  热点推荐 混合型
            ['rediantuijianTableMix', 'KVProxy', 'getCustom', 'finance_22005_516_1297', getJson()],

            // 热点推荐 指数型
            ['rediantuijianTableZhishu', 'KVProxy', 'getCustom', 'finance_22005_516_1298', getJson()],

            // 热点推荐 债券型
            ['rediantuijianTableZhaiquan', 'KVProxy', 'getCustom', 'finance_22005_516_1299', getJson()],

            // 热点推荐 货币型
            ['rediantuijianTableMoney', 'KVProxy', 'getCustom', 'finance_22005_516_1300', getJson()],

            ['slider', 'KVProxy', 'getDynamicFragment', 10008, getJsonByKey('data')],

            ['topCollapse', 'KVProxy', 'getStaticFragment', 10160, getJsonByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStaticFragment', 10131, getJsonByKey('content')],

            // Logo Ad
            ['topAd', 'KVProxy', 'getStaticFragment', 10027, getJson()],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],

            ['bottomAd', 'KVProxy', 'getStaticFragment', 10027, getJson()],
        ];

        let allData = await transfer(ctx, json);

        await ctx.html('finance_money', {
            allData,
        });
    },
};
