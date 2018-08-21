const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../providers/ucmsapiProxy');
const { transfer, getJson, getJsonByKey, getStringByKey, getString } = require('../../../services/common/common');
const { checkDomain, formatImage, handleUrl } = require('../../../services/utils/utils');

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
            ['mapping', 'KVProxy', 'getStructuredFragment', '20030', getStringByKey('content')],

            // 栏目信息对应表
            ['footer', 'KVProxy', 'getStructuredFragment', '20012', getStringByKey('content')],

            // 唐驳虎
            ['Column1', 'KVProxy', 'getDynamicFragment', '20045', getStringByKey('data')],

            // 凤凰军评
            ['Column2', 'KVProxy', 'getDynamicFragment', '20046', getStringByKey('data')],

            // 兰台说史
            ['Column3', 'KVProxy', 'getDynamicFragment', '20047', getStringByKey('data')],

            // 军机处
            ['Column4', 'KVProxy', 'getDynamicFragment', '20048', getStringByKey('data')],

            // 国子策
            ['Column5', 'KVProxy', 'getDynamicFragment', '20049', getStringByKey('data')],

            // 政能亮
            ['Column6', 'KVProxy', 'getDynamicFragment', '20050', getStringByKey('data')],

            // 政对面
            ['Column7', 'KVProxy', 'getDynamicFragment', '20051', getStringByKey('data')],

            // 大鱼漫画
            ['Column8', 'KVProxy', 'getDynamicFragment', '20052', getStringByKey('data')],

            // 连环话
            ['Column9', 'KVProxy', 'getDynamicFragment', '20053', getStringByKey('data')],

            // 在人间
            ['Column10', 'KVProxy', 'getDynamicFragment', '20054', getStringByKey('data')],

            // FUN来了
            ['Column11', 'KVProxy', 'getDynamicFragment', '20055', getStringByKey('data')],

            // 风眼
            ['Column12', 'KVProxy', 'getDynamicFragment', '20056', getStringByKey('data')],

            // 洞见
            ['Column13', 'KVProxy', 'getDynamicFragment', '20057', getStringByKey('data')],

            // 非常道
            ['Column14', 'KVProxy', 'getDynamicFragment', '20058', getStringByKey('data')],

            // 国学大讲堂
            ['Column15', 'KVProxy', 'getDynamicFragment', '20059', getStringByKey('data')],

            // 凰家评测
            ['Column16', 'KVProxy', 'getDynamicFragment', '20060', getStringByKey('data')],

            // 微服私房
            ['Column17', 'KVProxy', 'getDynamicFragment', '20061', getStringByKey('data')],

            // 表白星饰
            ['Column18', 'KVProxy', 'getDynamicFragment', '20062', getStringByKey('data')],

            // 时髦尖货
            ['Column19', 'KVProxy', 'getDynamicFragment', '20063', getStringByKey('data')],

            // 公映礼
            ['Column20', 'KVProxy', 'getDynamicFragment', '20064', getStringByKey('data')],

            // idolife星生活
            ['Column21', 'KVProxy', 'getDynamicFragment', '20065', getStringByKey('data')],

            // 上升星座
            ['Column22', 'KVProxy', 'getDynamicFragment', '20066', getStringByKey('data')],
        ];

        const data = await transfer(ctx, json);

        let allData = {};
        const array = [];

        try {
            for (const [key, value] of Object.entries(data)) {
                const arr = {
                    name: data.mapping[key],
                };

                if (key.includes('Column')) {
                    if (value.length > 0) {
                        arr.url = handleUrl(value[0].url);
                        arr.title = value[0].title;
                        const thumbnails =
                            value[0].thumbnails && value[0].thumbnails.image && value[0].thumbnails.image[0].url;

                        if (checkDomain(thumbnails)) {
                            arr.thumbnails = formatImage(thumbnails, 240, 135);
                        } else {
                            arr.thumbnails = thumbnails;
                        }
                    }

                    array.push(arr);
                }
            }

            allData = {
                search: data.search,
                footer: data.footer,
                content: array,
            };
        } catch (error) {
            logger.error(error);
        }

        await ctx.html('original_index', {
            allData,
        });
    },
};
