const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/money',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        // 导航静态碎片

        const navigation = KVProxy.getStaticFragment(10019).then(...handleJsonByKey(ctx, 'content'));
        const subNavigation = KVProxy.getStaticFragment(10020).then(...handleJsonByKey(ctx, 'content'));
        const collapse = KVProxy.getStaticFragment(10026).then(...handleJsonByKey(ctx, 'content'));

        const topLinkTable = KVProxy.getStaticFragment(10029).then(...handleJson(ctx));
        const market = KVProxy.getStaticFragment(10035).then(...handleJson(ctx));
        const test = KVProxy.getCustom('finance_22005_516_1293').then(...handleJson(ctx));

        const newsListDownSlider = KVProxy.getRecommendFragment('20013').then(...handleJsonByKey(ctx, 'data'));
        const newsListLeft = KVProxy.getRecommendFragment('20014').then(...handleJsonByKey(ctx, 'data'));

        const jingneijuejinTitle = KVProxy.getStaticFragment(10039).then(...handleJsonByKey(ctx, 'content'));
        const marketTitle = KVProxy.getStaticFragment(10042).then(...handleJsonByKey(ctx, 'content'));
        const sudiTitle01 = KVProxy.getStaticFragment(10045).then(...handleJsonByKey(ctx, 'content'));
        const sudiContent01=  KVProxy.getStaticFragment(10048).then(...handleJsonByKey(ctx, 'content'));
        const otherData = await Promise.all([
            navigation,
            subNavigation,
            collapse,
            topLinkTable,
            market,
            test,
            newsListDownSlider,
            newsListLeft,
            jingneijuejinTitle,
            marketTitle,
            sudiTitle01,
            sudiContent01
        ]);

        const allData = {
            navigation: otherData[0],
            subNavigation: otherData[1],
            collapse: otherData[2],
            topLinkTable: otherData[3],
            market: otherData[4],
            test: otherData[5],
            newsListDownSlider: otherData[6],
            newsListLeft: otherData[7],
            jingneijuejinTitle: otherData[8],
            marketTitle: otherData[9],
            sudiTitle01: otherData[10],
            sudiContent01: otherData[11]
        };

        await ctx.html('finance_money', { allData });
    },
};
