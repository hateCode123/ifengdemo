const { transfer, getJsonByKey, getStringByKey } = require('../../../../../services/common/common');
const { filterRecommendData, singlePicList, formatData } = require('../../../../../services/utils/utils');

exports.list = {
    path: '/pc/finance/hk/test',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
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
            ['nav', 'KVProxy', 'getStructuredFragment', 20002, getStringByKey('content')],

            // 搜索
            ['search', 'KVProxy', 'getStructuredFragment', 20005, getStringByKey('content')],

            // Logo
            ['logo', 'KVProxy', 'getStructuredFragment', 30005, getStringByKey('content')],

            // 财经首页导航
            ['navigation', 'KVProxy', 'getStructuredFragment', 30007, getStringByKey('content')],

            // 底部合作链接
            ['cooperation', 'KVProxy', 'getStaticFragment', 25002, getStringByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStructuredFragment', 20036, getStringByKey('content')],

            // 左侧对联广告
            ['ad_couplet_left', 'KVProxy', 'getStructuredFragment', 30039, getStringByKey('content')],

            // 右侧对联广告
            ['ad_couplet_right', 'KVProxy', 'getStructuredFragment', 30040, getStringByKey('content')],

            // 顶部通栏广告01
            ['ad_top', 'KVProxy', 'getStructuredFragment', 30010, getStringByKey('content')],

            // 页面主体通栏广告02
            ['ad_content_02', 'KVProxy', 'getStructuredFragment', 30011, getStringByKey('content')],

            // 页面主体右侧广告03
            ['ad_content_R_side_03', 'KVProxy', 'getStructuredFragment', 30012, getStringByKey('content')],

            // 页面主体右侧广告03
            ['ad_content_04', 'KVProxy', 'getStructuredFragment', 30013, getStringByKey('content')],

            // 顶部通栏广告01
            ['ad_bottom', 'KVProxy', 'getStructuredFragment', 30014, getStringByKey('content')],

            // 顶部三大指数iframe1
            ['top3Frame', 'KVProxy', 'getStructuredFragment', 30015, getStringByKey('content')],

            // 顶部港股通资金通栏iframe2
            ['tophktFrame', 'KVProxy', 'getStructuredFragment', 30016, getStringByKey('content')],

            // 新股上市,涡轮涨幅排名，牛熊证涨幅排名iframe3
            ['xgss_Frame', 'KVProxy', 'getStructuredFragment', 30017, getStringByKey('content')],

            // 指数iframe4
            ['zs_Frame', 'KVProxy', 'getStructuredFragment', 30018, getStringByKey('content')],

            // 指数iframe5
            ['xgsswl_Frame', 'KVProxy', 'getStructuredFragment', 30019, getStringByKey('content')],

            // 港股涡轮iframe6
            ['ggwl_Frame', 'KVProxy', 'getStructuredFragment', 30020, getStringByKey('content')],

            // 五大牛熊证资金流入流出iframe7
            ['wdnxzzjlrlc_Frame', 'KVProxy', 'getStructuredFragment', 30021, getStringByKey('content')],

            // 轮播图推荐位
            ['banner_pic', 'KVProxy', 'getRecommendFragment', 55014, getJsonByKey('data')],

            // 港股头条头三条推荐位
            ['hk_tt_recommend', 'KVProxy', 'getRecommendFragment', 55015, getJsonByKey('data')],

            // 港股头条信息流(排重推荐位)
            ['hk_tt_withoutR', 'KVProxy', 'getDynamicFragment', '1-69-35248-', getJsonByKey('data')],

            // 打新攻略信息流(做单图处理)
            ['hk_dzgl_singlePic', 'KVProxy', 'getDynamicFragment', '1-69-35250-', getJsonByKey('data')],

            // 新股点评信息流
            ['hk_xgdp', 'KVProxy', 'getDynamicFragment', '1-69-35252-', getJsonByKey('data')],

            // 新股评级信息流(做单图处理)
            ['hk_xgpj', 'KVProxy', 'getDynamicFragment', '1-69-35251-', getJsonByKey('data')],

            // 热点专题信息流(做单图处理)
            ['hk_rdzt', 'KVProxy', 'getDynamicFragment', '1-69-35256-', getJsonByKey('data')],

            // 上市公司信息流(做单图处理)
            ['hk_ssgs', 'KVProxy', 'getDynamicFragment', '1-69-35255-', getJsonByKey('data')],

            // 港股要闻信息流
            ['hk_ggyw', 'KVProxy', 'getDynamicFragment', '1-69-41-', getJsonByKey('data')],

            // 美股要闻信息流
            ['hk_mgyw', 'KVProxy', 'getDynamicFragment', '1-69-35259-', getJsonByKey('data')],

            // 机构动态信息流(做单图处理)
            ['hk_jgdt', 'KVProxy', 'getDynamicFragment', '1-69-35260-', getJsonByKey('data')],

            // 港股学堂信息流(做单图处理)
            ['hk_ggxt', 'KVProxy', 'getDynamicFragment', '1-69-35253-', getJsonByKey('data')],

            // 名家有话说信息流(做单图处理)
            ['hk_mjyhs', 'KVProxy', 'getDynamicFragment', '1-69-35258-', getJsonByKey('data')],

            // 轮证资讯信息流
            ['hk_lzzx', 'KVProxy', 'getDynamicFragment', '1-69-35249-', getJsonByKey('data')],
        ];

        const allData = await transfer(ctx, json);

        allData.hk_tt_withoutR = formatData(filterRecommendData(allData.hk_tt_recommend, allData.hk_tt_withoutR), 9, false, 100, 62);

        allData.hk_dzgl_singlePic = singlePicList(formatData(allData.hk_dzgl_singlePic, 4, true, 100, 62));

        allData.hk_xgdp = formatData(allData.hk_xgdp, 6, true);

        allData.hk_xgpj = singlePicList(formatData(allData.hk_xgpj, 4, true, 100, 62));

        allData.hk_rdzt = singlePicList(formatData(allData.hk_rdzt, 4, true, 100, 62));

        allData.hk_ssgs = singlePicList(formatData(allData.hk_ssgs, 4, true, 100, 62));

        allData.hk_ggyw = allData.hk_ggyw.slice(0, 8);

        allData.hk_mgyw = allData.hk_mgyw.slice(0, 8);

        allData.hk_jgdt = singlePicList(formatData(allData.hk_jgdt, 4, true, 100, 62));

        allData.hk_ggxt = singlePicList(formatData(allData.hk_ggxt, 4, true, 100, 62));

        allData.hk_mjyhs = singlePicList(formatData(allData.hk_mjyhs, 4, true, 100, 62));

        allData.hk_lzzx = singlePicList(allData.hk_lzzx.slice(0, 8));

        // 处理广告碎片和静态碎片
        const staticData = {};

        for (const item of json) {
            if (item[2] === 'getStaticFragment') {
                if (typeof allData[item[0]] === 'string') {
                    staticData[item[0]] = encodeURIComponent(allData[item[0]]);
                } else {
                    staticData[item[0]] = allData[item[0]];
                }

                delete allData[item[0]];
            }
        }

        // 处理统计数据
        const statisticsData = {
            statisticsHead: allData.statisticsHead,
            statisticsBody: allData.statisticsBody,
        };

        delete allData.statisticsHead;
        delete allData.statisticsBody;

        await ctx.html('finance_hk', {
            allData,
            statisticsData,
            staticData,
        });
    },
};
