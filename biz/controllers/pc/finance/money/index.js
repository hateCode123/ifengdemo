const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey } = require('../../../../services/common/common');

exports.financeWemoney = {
    path: '/pc/finance/money',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        let json = [
            // 导航静态碎片
            ['navigation', 'KVProxy', 'getStaticFragment', 10019, getJsonByKey('content')],
            ['subNavigation', 'KVProxy', 'getStaticFragment', 10020, getJsonByKey('content')],
            ['collapse', 'KVProxy', 'getStaticFragment', 10026, getJsonByKey('content')],

            ['topLinkTable', 'KVProxy', 'getStaticFragment', 10029, getJson()],
            ['market', 'KVProxy', 'getStaticFragment', 10035, getJson()],

            // 境内 热门权益类
            ['jingneiQuanyiHotFunds', 'KVProxy', 'getCustom', 'finance_22005_516_1293', getJson()],

            ['newsListDownSlider', 'KVProxy', 'getRecommendFragment', 20013, getStringByKey('data')],
            ['newsListLeft', 'KVProxy', 'getRecommendFragment', 20014, getStringByKey('data')],

            ['jingneijuejinTitle', 'KVProxy', 'getStaticFragment', 10039, getJsonByKey('content')],
            ['marketTitle', 'KVProxy', 'getStaticFragment', 10042, getJsonByKey('content')],
            ['sudiTitle01', 'KVProxy', 'getStaticFragment', 10045, getJsonByKey('content')],
            ['sudiContent01', 'KVProxy', 'getStaticFragment', 10048, getJsonByKey('content')],

            ['haiwaitaojinTitle', 'KVProxy', 'getStaticFragment', 10110, getJsonByKey('content')],
            ['sudiTitle02', 'KVProxy', 'getStaticFragment', 10127, getJsonByKey('content')],
            ['sudiContent02', 'KVProxy', 'getStaticFragment', 10111, getJsonByKey('content')],

            // 境内 货币
            ['jingneiHuobiHotFunds', 'KVProxy', 'getCustom', 'finance_22005_516_1294', getJson()],

            // 海外基金
            ['haiwaiHotfunds', 'KVProxy', 'getCustom', 'finance_22005_516_1295', getJson()],

            ['rediantuijianTitle', 'KVProxy', 'getStaticFragment', 10113, getJsonByKey('content')],

            // 热点推荐 股票型
            ['rediantuijianTableStock', 'KVProxy', 'getCustom', 'finance_22005_516_1296', getJson()],

            // 热点推荐 混合型
            ['rediantuijianTableMix', 'KVProxy', 'getCustom', 'finance_22005_516_1297', getJson()],

            // 热点推荐 指数型
            ['rediantuijianTableZhishu', 'KVProxy', 'getCustom', 'finance_22005_516_1298', getJson()],

            // 热点推荐 债券型
            ['rediantuijianTableZhaiquan', 'KVProxy', 'getCustom', 'finance_22005_516_1299', getJson()],

            // 热点推荐 货币型
            ['rediantuijianTableMoney', 'KVProxy', 'getCustom', 'finance_22005_516_1300', getJson()],

            // 分析师答疑 基金
            ['cnlcJijin', 'KVProxy', 'getCustom', 'finance_22005_516_243', getJson()],

            // 分析师答疑列表 基金
            ['cnlcListJijin', 'KVProxy', 'getCustom', 'finance_22005_516_244', getJson()],

            ['cnlcTitle', 'KVProxy', 'getStaticFragment', 10047, getJsonByKey('content')],

            // 分析师答疑 P2p
            ['cnlcP2P', 'KVProxy', 'getCustom', 'finance_22005_516_245', getJson()],

            // 分析师答疑列表 P2p
            ['cnlcListP2P', 'KVProxy', 'getCustom', 'finance_22005_516_249', getJson()],

            // 分析师答疑 信托
            ['cnlcTrust', 'KVProxy', 'getCustom', 'finance_22005_516_246', getJson()],

            // 分析师答疑列表 信托
            ['cnlcListTrust', 'KVProxy', 'getCustom', 'finance_22005_516_250', getJson()],

            // 分析师答疑 私募
            ['cnlcPrivate', 'KVProxy', 'getCustom', 'finance_22005_516_247', getJson()],

            // 分析师答疑列表 私募
            ['cnlcListPrivate', 'KVProxy', 'getCustom', 'finance_22005_516_251', getJson()],

            // 分析师答疑 银行理财
            ['cnlcFinance', 'KVProxy', 'getCustom', 'finance_22005_516_248', getJson()],

            // 分析师答疑列表 银行理财
            ['cnlcListFinance', 'KVProxy', 'getCustom', 'finance_22005_516_252', getJson()],

            ['partnerTitle', 'KVProxy', 'getStaticFragment', 10046, getJsonByKey('content')],

            ['partnerList', 'KVProxy', 'getStaticFragment', 10123, getStringByKey('content')],

            ['bottomWeiXin', 'KVProxy', 'getStaticFragment', 10124, getStringByKey('content')],

            ['bottomProc', 'KVProxy', 'getStaticFragment', 10125, getStringByKey('content')],

            ['bottomLink', 'KVProxy', 'getStaticFragment', 10126, getStringByKey('content')],

            ['banner', 'KVProxy', 'getStaticFragment', 10128, getStringByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStaticFragment', 10114, getJsonByKey('content')],

            // 页面公用导航
            ['nav', 'KVProxy', 'getStaticFragment', 10108, getJsonByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStaticFragment', 10129, getJsonByKey('content')],

            // 幻灯
            ['slider', 'KVProxy', 'getStaticFragment', 10130, getJsonByKey('content')],
        ];
        let allData = await transfer(ctx, json);
        await ctx.html('finance_money', { allData });
    },
};
