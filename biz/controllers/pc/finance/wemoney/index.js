const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/wemoney',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        //通用导航
        let commonNav = KVProxy.getStaticFragment(10108).then(...handleJsonByKey(ctx, 'content'));

        // 导航
        let navigation = KVProxy.getStaticFragment(10003).then(...handleJson(ctx));

        // 轮播
        let slider = KVProxy.getStaticFragment(10006).then(...handleJsonByKey(ctx, 'content'));

        // 广告
        let adAside1 = KVProxy.getStaticFragment(10021).then(...handleJson(ctx));
        let adAside2 = KVProxy.getStaticFragment(10022).then(...handleJson(ctx));
        let adAside3 = KVProxy.getStaticFragment(10023).then(...handleJson(ctx));
        let adAside4 = KVProxy.getStaticFragment(10024).then(...handleJson(ctx));
        let adAside5 = KVProxy.getStaticFragment(10025).then(...handleJson(ctx));

        // 热门新闻标题
        let hotNewsTitle = KVProxy.getStaticFragment(10122).then(...handleJsonByKey(ctx, 'content'));

        // 热门新闻
        let hotNews = KVProxy.getStaticFragment(10005).then(...handleJsonByKey(ctx, 'content'));

        // 新闻列表
        let info = KVProxy.getStaticFragment(10007).then(...handleJsonByKey(ctx, 'content'));

        // 版权
        let copyright = KVProxy.getStaticFragment(10121).then(...handleJsonByKey(ctx, 'content'));

        // console.log("11111 : ", otherData)

        [
            commonNav,
            navigation,
            slider,
            info,
            hotNewsTitle,
            hotNews,
            adAside1,
            adAside2,
            adAside3,
            adAside4,
            adAside5,
            copyright,
        ] = await Promise.all([
            commonNav,
            navigation,
            slider,
            info,
            hotNewsTitle,
            hotNews,
            adAside1,
            adAside2,
            adAside3,
            adAside4,
            adAside5,
            copyright,
        ]);

        const allData = {
            commonNav,
            navigation,
            slider,
            info,
            hotNewsTitle,
            hotNews,
            adAside1,
            adAside2,
            adAside3,
            adAside4,
            adAside5,
            copyright,
        };

        await ctx.html('finance_wemoney', {
            allData,
        });
    },
};
