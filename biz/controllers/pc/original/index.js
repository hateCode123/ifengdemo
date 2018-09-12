const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../services/common/common');
const { formatImage, formatUrl } = require('@ifeng/public_method');

exports.list = {
    path: '/pc/original/(index)?',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    low: true,
    preview: true,
    online: false,
    handler: async ctx => {
        const json = [
            // 搜索
            ['search', 'KVProxy', 'getStructuredFragment', '20005', getStringByKey('content')],

            // 底部公用版权
            ['footer', 'KVProxy', 'getStructuredFragment', '20036', getStringByKey('content')],

            // 唐驳虎
            ['Column1', 'KVProxy', 'getDynamicFragment', '3-35189-', getStringByKey('data')],

            // 凤凰军评
            ['Column2', 'KVProxy', 'getDynamicFragment', '14-35085-', getStringByKey('data')],

            // 兰台说史
            ['Column3', 'KVProxy', 'getDynamicFragment', '15-35076-', getStringByKey('data')],

            // 军机处
            ['Column4', 'KVProxy', 'getDynamicFragment', '14-35084-', getStringByKey('data')],

            // 国子策
            ['Column5', 'KVProxy', 'getDynamicFragment', '1-82-', getStringByKey('data')],

            // 政能亮
            ['Column6', 'KVProxy', 'getDynamicFragment', '21-35136-', getStringByKey('data')],

            // 政对面
            ['Column7', 'KVProxy', 'getDynamicFragment', '21-35137-', getStringByKey('data')],

            // 大鱼漫画
            ['Column8', 'KVProxy', 'getDynamicFragment', '3-35188-', getStringByKey('data')],

            // 连环话
            ['Column9', 'KVProxy', 'getDynamicFragment', '1-68-', getStringByKey('data')],

            // 在人间
            ['Column10', 'KVProxy', 'getDynamicFragment', '3-35203-', getStringByKey('data')],

            // FUN来了
            ['Column11', 'KVProxy', 'getDynamicFragment', '3-35207-', getStringByKey('data')],

            // 风眼
            ['Column12', 'KVProxy', 'getDynamicFragment', '5-35057-', getStringByKey('data')],

            // 洞见
            ['Column13', 'KVProxy', 'getDynamicFragment', '17-35105-', getStringByKey('data')],

            // 非常道
            ['Column14', 'KVProxy', 'getDynamicFragment', '4-20079-', getStringByKey('data')],

            // 国学大讲堂
            ['Column15', 'KVProxy', 'getDynamicFragment', '20-35098-', getStringByKey('data')],

            // 凰家评测
            ['Column16', 'KVProxy', 'getDynamicFragment', '5-35058-', getStringByKey('data')],

            // 微服私房
            ['Column17', 'KVProxy', 'getDynamicFragment', '2-35001-35009-', getStringByKey('data')],

            // 表白星饰
            ['Column18', 'KVProxy', 'getDynamicFragment', '2-35003-35016-', getStringByKey('data')],

            // 时髦尖货
            ['Column19', 'KVProxy', 'getDynamicFragment', '2-35001-35008-', getStringByKey('data')],

            // 公映礼
            ['Column20', 'KVProxy', 'getDynamicFragment', '4-20081-', getStringByKey('data')],

            // idolife星生活
            ['Column21', 'KVProxy', 'getDynamicFragment', '4-20080-', getStringByKey('data')],

            // 上升星座
            ['Column22', 'KVProxy', 'getDynamicFragment', '4-20078-', getStringByKey('data')],
        ];

        const data = await transfer(ctx, json);

        const mapping = {
            Column1: '唐驳虎',
            Column2: '凤凰军评',
            Column3: '兰台说史',
            Column4: '军机处',
            Column5: '国子策',
            Column6: '政能亮',
            Column7: '政对面',
            Column8: '大鱼漫画',
            Column9: '连环话',
            Column10: '在人间',
            Column11: 'FUN来了',
            Column12: '风眼',
            Column13: '洞见',
            Column14: '非常道',
            Column15: '国学大讲堂',
            Column16: '凰家评测',
            Column17: '微服私房',
            Column18: '表白星饰',
            Column19: '时髦尖货',
            Column20: '公映礼',
            Column21: 'idolife星生活',
            Column22: '上升星座',
        };

        const array = [];
        const listUrl = '//test.finance.ifeng.com/shanklist/original/';

        for (const [key, value] of Object.entries(data)) {
            try {
                const arr = {
                    name: mapping[key],
                };

                if (key.includes('Column')) {
                    if (value.length > 0) {
                        arr.url = `${listUrl}${value[0].searchPath}`;
                        arr.title = value[0].title;
                        const thumbnails =
                            value[0].thumbnails && value[0].thumbnails.image && value[0].thumbnails.image[0].url;

                        arr.thumbnails = formatImage(thumbnails, 240, 135);

                        array.push(arr);
                    }
                }
            } catch (error) {
                logger.error(error);
                ctx.errorCount++;
            }
        }

        const allData = {
            search: data.search,
            footer: data.footer,
            content: array,
        };

        await ctx.html('original_index', {
            allData,
        });
    },
};
