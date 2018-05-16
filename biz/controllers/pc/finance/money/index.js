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
        const jingneiQuanyiHotFunds = KVProxy.getCustom('finance_22005_516_1293').then(...handleJson(ctx)); // 境内 热门权益类

        const newsListDownSlider = KVProxy.getRecommendFragment('20013').then(...handleJsonByKey(ctx, 'data'));
        const newsListLeft = KVProxy.getRecommendFragment('20014').then(...handleJsonByKey(ctx, 'data'));

        const jingneijuejinTitle = KVProxy.getStaticFragment(10039).then(...handleJsonByKey(ctx, 'content'));
        const marketTitle = KVProxy.getStaticFragment(10042).then(...handleJsonByKey(ctx, 'content'));
        const sudiTitle01 = KVProxy.getStaticFragment(10045).then(...handleJsonByKey(ctx, 'content'));
        const sudiContent01 = KVProxy.getStaticFragment(10048).then(...handleJsonByKey(ctx, 'content'));

        const haiwaitaojinTitle = KVProxy.getStaticFragment(10110).then(...handleJsonByKey(ctx, 'content'));
        const sudiTitle02 = KVProxy.getStaticFragment(10127).then(...handleJsonByKey(ctx, 'content'));
        const sudiContent02 = KVProxy.getStaticFragment(10111).then(...handleJsonByKey(ctx, 'content'));

        const jingneiHuobiHotFunds = KVProxy.getCustom('finance_22005_516_1294').then(...handleJson(ctx)); // 境内 货币
        const haiwaiHotfunds = KVProxy.getCustom('finance_22005_516_1295').then(...handleJson(ctx)); // 海外基金

        const rediantuijianTitle = KVProxy.getStaticFragment(10113).then(...handleJsonByKey(ctx, 'content'));

        const rediantuijianTableStock = KVProxy.getCustom('finance_22005_516_1296').then(...handleJson(ctx)); // 热点推荐 股票型
        const rediantuijianTableMix = KVProxy.getCustom('finance_22005_516_1297').then(...handleJson(ctx)); // 热点推荐 混合型
        const rediantuijianTableZhishu = KVProxy.getCustom('finance_22005_516_1298').then(...handleJson(ctx)); // 热点推荐 指数型
        const rediantuijianTableZhaiquan = KVProxy.getCustom('finance_22005_516_1299').then(...handleJson(ctx)); // 热点推荐 债券型
        const rediantuijianTableMoney = KVProxy.getCustom('finance_22005_516_1300').then(...handleJson(ctx)); // 热点推荐 货币型

        const cnlcJijin = KVProxy.getCustom('finance_22005_516_243').then(...handleJson(ctx)); // 分析师答疑 基金
        const cnlcListJijin = KVProxy.getCustom('finance_22005_516_244').then(...handleJson(ctx)); // 分析师答疑列表 基金

        const cnlcTitle = KVProxy.getStaticFragment(10047).then(...handleJsonByKey(ctx, 'content')); 
        const cnlcP2P = KVProxy.getCustom('finance_22005_516_245').then(...handleJson(ctx)); // 分析师答疑 P2p
        const cnlcListP2P = KVProxy.getCustom('finance_22005_516_249').then(...handleJson(ctx)); // 分析师答疑列表 P2p

        const cnlcTrust = KVProxy.getCustom('finance_22005_516_246').then(...handleJson(ctx)); // 分析师答疑 信托
        const cnlcListTrust = KVProxy.getCustom('finance_22005_516_250').then(...handleJson(ctx)); // 分析师答疑列表 信托

        const cnlcPrivate = KVProxy.getCustom('finance_22005_516_247').then(...handleJson(ctx)); // 分析师答疑 私募
        const cnlcListPrivate = KVProxy.getCustom('finance_22005_516_251').then(...handleJson(ctx)); // 分析师答疑列表 私募

        const cnlcFinance = KVProxy.getCustom('finance_22005_516_248').then(...handleJson(ctx)); // 分析师答疑 银行理财
        const cnlcListFinance = KVProxy.getCustom('finance_22005_516_252').then(...handleJson(ctx)); // 分析师答疑列表 银行理财

        const partnerTitle = KVProxy.getStaticFragment(10046).then(...handleJsonByKey(ctx, 'content')); 

        const partnerList = KVProxy.getStaticFragment(10123).then(...handleJsonByKey(ctx, 'content'));

        const bottomWeiXin = KVProxy.getStaticFragment(10124).then(...handleJsonByKey(ctx, 'content'));

        const bottomProc = KVProxy.getStaticFragment(10125).then(...handleJsonByKey(ctx, 'content'));

        const bottomLink = KVProxy.getStaticFragment(10126).then(...handleJsonByKey(ctx, 'content'));

        const banner = KVProxy.getStaticFragment(10128).then(...handleJsonByKey(ctx, 'content'));
        // 底部公用版权
        const footer = KVProxy.getStaticFragment(10114).then(...handleJsonByKey(ctx, 'content'));
        // 页面公用导航
        const nav = KVProxy.getStaticFragment(10108).then(...handleJsonByKey(ctx, 'content'));
        // 搜索
        const search = KVProxy.getStaticFragment(10129).then(...handleJsonByKey(ctx, 'content'));
        // 幻灯
        const slider = KVProxy.getStaticFragment(10130).then(...handleJsonByKey(ctx, 'content'));
 

        const otherData = await Promise.all([
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

        const allData = {
            navigation: otherData[0],
            subNavigation: otherData[1],
            collapse: otherData[2],
            topLinkTable: otherData[3],
            market: otherData[4],
            jingneiQuanyiHotFunds: otherData[5],
            newsListDownSlider: otherData[6],
            newsListLeft: otherData[7],
            jingneijuejinTitle: otherData[8],
            marketTitle: otherData[9],
            sudiTitle01: otherData[10],
            sudiContent01: otherData[11],
            haiwaitaojinTitle: otherData[12],
            sudiTitle02: otherData[13],
            sudiContent02: otherData[14],
            jingneiHuobiHotFunds: otherData[15],
            haiwaiHotfunds: otherData[16],
            rediantuijianTitle: otherData[17],
            rediantuijianTableStock: otherData[18],
            rediantuijianTableMix: otherData[19],
            rediantuijianTableZhishu: otherData[20],
            rediantuijianTableZhaiquan: otherData[21],
            rediantuijianTableMoney: otherData[22],
            cnlcJijin: otherData[23],
            cnlcListJijin: otherData[24],
            cnlcTitle: otherData[25],
            cnlcP2P: otherData[26],
            cnlcListP2P: otherData[27],
            cnlcTrust: otherData[28],
            cnlcListTrust: otherData[29],
            cnlcPrivate: otherData[30],
            cnlcListPrivate: otherData[31],
            cnlcFinance: otherData[32],
            cnlcListFinance: otherData[33],
            partnerTitle: otherData[34],
            partnerList: otherData[35],
            bottomWeiXin: otherData[36],
            bottomProc: otherData[37],
            bottomLink: otherData[38],
            banner: otherData[39],
            footer: otherData[40],
            nav: otherData[41],
            search: otherData[42],
            slider: otherData[43],
        };

        await ctx.html('finance_money', { allData });
    },
};
