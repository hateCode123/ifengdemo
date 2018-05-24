const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const {
    jsonParse,
    handleData,
    handleJson,
    handleJsonByKey,
    handleStringByKey,
} = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/money',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        // 导航静态碎片

        let navigation = KVProxy.getStaticFragment(ctx, 10019).then(...handleJsonByKey(ctx, 'content'));
        let subNavigation = KVProxy.getStaticFragment(ctx, 10020).then(...handleJsonByKey(ctx, 'content'));
        let collapse = KVProxy.getStaticFragment(ctx, 10026).then(...handleJsonByKey(ctx, 'content'));

        let topLinkTable = KVProxy.getStaticFragment(ctx, 10029).then(...handleJson(ctx));
        let market = KVProxy.getStaticFragment(ctx, 10035).then(...handleJson(ctx));
        let jingneiQuanyiHotFunds = KVProxy.getCustom(ctx, 'finance_22005_516_1293').then(...handleJson(ctx)); // 境内 热门权益类

        let newsListDownSlider = KVProxy.getRecommendFragment(ctx, '20013').then(...handleStringByKey(ctx, 'data'));
        let newsListLeft = KVProxy.getRecommendFragment(ctx, '20014').then(...handleStringByKey(ctx, 'data'));

        let jingneijuejinTitle = KVProxy.getStaticFragment(ctx, 10039).then(...handleJsonByKey(ctx, 'content'));
        let marketTitle = KVProxy.getStaticFragment(ctx, 10042).then(...handleJsonByKey(ctx, 'content'));
        let sudiTitle01 = KVProxy.getStaticFragment(ctx, 10045).then(...handleJsonByKey(ctx, 'content'));
        let sudiContent01 = KVProxy.getStaticFragment(ctx, 10048).then(...handleJsonByKey(ctx, 'content'));

        let haiwaitaojinTitle = KVProxy.getStaticFragment(ctx, 10110).then(...handleJsonByKey(ctx, 'content'));
        let sudiTitle02 = KVProxy.getStaticFragment(ctx, 10127).then(...handleJsonByKey(ctx, 'content'));
        let sudiContent02 = KVProxy.getStaticFragment(ctx, 10111).then(...handleJsonByKey(ctx, 'content'));

        let jingneiHuobiHotFunds = KVProxy.getCustom(ctx, 'finance_22005_516_1294').then(...handleJson(ctx)); // 境内 货币
        let haiwaiHotfunds = KVProxy.getCustom(ctx, 'finance_22005_516_1295').then(...handleJson(ctx)); // 海外基金

        let rediantuijianTitle = KVProxy.getStaticFragment(ctx, 10113).then(...handleJsonByKey(ctx, 'content'));

        let rediantuijianTableStock = KVProxy.getCustom(ctx, 'finance_22005_516_1296').then(...handleJson(ctx)); // 热点推荐 股票型
        let rediantuijianTableMix = KVProxy.getCustom(ctx, 'finance_22005_516_1297').then(...handleJson(ctx)); // 热点推荐 混合型
        let rediantuijianTableZhishu = KVProxy.getCustom(ctx, 'finance_22005_516_1298').then(...handleJson(ctx)); // 热点推荐 指数型
        let rediantuijianTableZhaiquan = KVProxy.getCustom(ctx, 'finance_22005_516_1299').then(...handleJson(ctx)); // 热点推荐 债券型
        let rediantuijianTableMoney = KVProxy.getCustom(ctx, 'finance_22005_516_1300').then(...handleJson(ctx)); // 热点推荐 货币型

        let cnlcJijin = KVProxy.getCustom(ctx, 'finance_22005_516_243').then(...handleJson(ctx)); // 分析师答疑 基金
        let cnlcListJijin = KVProxy.getCustom(ctx, 'finance_22005_516_244').then(...handleJson(ctx)); // 分析师答疑列表 基金

        let cnlcTitle = KVProxy.getStaticFragment(ctx, 10047).then(...handleJsonByKey(ctx, 'content'));
        let cnlcP2P = KVProxy.getCustom(ctx, 'finance_22005_516_245').then(...handleJson(ctx)); // 分析师答疑 P2p
        let cnlcListP2P = KVProxy.getCustom(ctx, 'finance_22005_516_249').then(...handleJson(ctx)); // 分析师答疑列表 P2p

        let cnlcTrust = KVProxy.getCustom(ctx, 'finance_22005_516_246').then(...handleJson(ctx)); // 分析师答疑 信托
        let cnlcListTrust = KVProxy.getCustom(ctx, 'finance_22005_516_250').then(...handleJson(ctx)); // 分析师答疑列表 信托

        let cnlcPrivate = KVProxy.getCustom(ctx, 'finance_22005_516_247').then(...handleJson(ctx)); // 分析师答疑 私募
        let cnlcListPrivate = KVProxy.getCustom(ctx, 'finance_22005_516_251').then(...handleJson(ctx)); // 分析师答疑列表 私募

        let cnlcFinance = KVProxy.getCustom(ctx, 'finance_22005_516_248').then(...handleJson(ctx)); // 分析师答疑 银行理财
        let cnlcListFinance = KVProxy.getCustom(ctx, 'finance_22005_516_252').then(...handleJson(ctx)); // 分析师答疑列表 银行理财

        let partnerTitle = KVProxy.getStaticFragment(ctx, 10046).then(...handleJsonByKey(ctx, 'content'));

        let partnerList = KVProxy.getStaticFragment(ctx, 10123).then(...handleStringByKey(ctx, 'content'));

        let bottomWeiXin = KVProxy.getStaticFragment(ctx, 10124).then(...handleStringByKey(ctx, 'content'));

        let bottomProc = KVProxy.getStaticFragment(ctx, 10125).then(...handleStringByKey(ctx, 'content'));

        let bottomLink = KVProxy.getStaticFragment(ctx, 10126).then(...handleStringByKey(ctx, 'content'));

        let banner = KVProxy.getStaticFragment(ctx, 10128).then(...handleStringByKey(ctx, 'content'));
        // 底部公用版权
        let footer = KVProxy.getStaticFragment(ctx, 10114).then(...handleJsonByKey(ctx, 'content'));
        // 页面公用导航
        let nav = KVProxy.getStaticFragment(ctx, 10108).then(...handleJsonByKey(ctx, 'content'));
        // 搜索
        let search = KVProxy.getStaticFragment(ctx, 10129).then(...handleJsonByKey(ctx, 'content'));
        // 幻灯
        let slider = KVProxy.getStaticFragment(ctx, 10130).then(...handleJsonByKey(ctx, 'content'));

        [
            navigation,
            subNavigation,
            collapse,
            topLinkTable,
            market,
            jingneiQuanyiHotFunds,
            newsListDownSlider,
            newsListLeft,
            jingneijuejinTitle,
            marketTitle,
            sudiTitle01,
            sudiContent01,
            haiwaitaojinTitle,
            sudiTitle02,
            sudiContent02,
            jingneiHuobiHotFunds,
            haiwaiHotfunds,
            rediantuijianTitle,
            rediantuijianTableStock,
            rediantuijianTableMix,
            rediantuijianTableZhishu,
            rediantuijianTableZhaiquan,
            rediantuijianTableMoney,
            cnlcJijin,
            cnlcListJijin,
            cnlcTitle,
            cnlcP2P,
            cnlcListP2P,
            cnlcTrust,
            cnlcListTrust,
            cnlcPrivate,
            cnlcListPrivate,
            cnlcFinance,
            cnlcListFinance,
            partnerTitle,
            partnerList,
            bottomWeiXin,
            bottomProc,
            bottomLink,
            banner,
            footer,
            nav,
            search,
            slider,
        ] = await Promise.all([
            navigation,
            subNavigation,
            collapse,
            topLinkTable,
            market,
            jingneiQuanyiHotFunds,
            newsListDownSlider,
            newsListLeft,
            jingneijuejinTitle,
            marketTitle,
            sudiTitle01,
            sudiContent01,
            haiwaitaojinTitle,
            sudiTitle02,
            sudiContent02,
            jingneiHuobiHotFunds,
            haiwaiHotfunds,
            rediantuijianTitle,
            rediantuijianTableStock,
            rediantuijianTableMix,
            rediantuijianTableZhishu,
            rediantuijianTableZhaiquan,
            rediantuijianTableMoney,
            cnlcJijin,
            cnlcListJijin,
            cnlcTitle,
            cnlcP2P,
            cnlcListP2P,
            cnlcTrust,
            cnlcListTrust,
            cnlcPrivate,
            cnlcListPrivate,
            cnlcFinance,
            cnlcListFinance,
            partnerTitle,
            partnerList,
            bottomWeiXin,
            bottomProc,
            bottomLink,
            banner,
            footer,
            nav,
            search,
            slider,
        ]);

        let allData = {
            navigation,
            subNavigation,
            collapse,
            topLinkTable,
            market,
            jingneiQuanyiHotFunds,
            newsListDownSlider,
            newsListLeft,
            jingneijuejinTitle,
            marketTitle,
            sudiTitle01,
            sudiContent01,
            haiwaitaojinTitle,
            sudiTitle02,
            sudiContent02,
            jingneiHuobiHotFunds,
            haiwaiHotfunds,
            rediantuijianTitle,
            rediantuijianTableStock,
            rediantuijianTableMix,
            rediantuijianTableZhishu,
            rediantuijianTableZhaiquan,
            rediantuijianTableMoney,
            cnlcJijin,
            cnlcListJijin,
            cnlcTitle,
            cnlcP2P,
            cnlcListP2P,
            cnlcTrust,
            cnlcListTrust,
            cnlcPrivate,
            cnlcListPrivate,
            cnlcFinance,
            cnlcListFinance,
            partnerTitle,
            partnerList,
            bottomWeiXin,
            bottomProc,
            bottomLink,
            banner,
            footer,
            nav,
            search,
            slider,
        };

        await ctx.html('finance_money', { allData });
    },
};
