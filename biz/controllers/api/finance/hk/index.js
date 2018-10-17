const Joi = require('joi');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { handleJson } = require('../../../../services/common/common');

/**
 * 根据股票名称获取相关新闻、公司要闻、公司公告
 * @param {String} getDataType 获取数据类型，为getCompanyNews时获取相关新闻或公司要闻，为getCompanyNotice时获取公司公告
 * @param {String} stockName 公司名称
 * @param {String} current 当前页数
 * @param {String} pageSize 当前页条数
 * @param {String} callback jsonp请求回调函数名
 */
exports.getCompanyNews = {
    path: '/api/finance/hk/:getDataType/:stockName/:current/:pageSize/:callback?',
    method: 'get',
    type: 'jsonp',
    cdncache: 120,
    online: true,
    schema: Joi.object().keys({
        stockName: Joi.string()
            .min(1)
            .required(),
        current: Joi.number()
            .min(1)
            .required(),
        pageSize: Joi.number()
            .min(1)
            .required(),
    }),
    handler: async ctx => {
        const { getDataType, stockName, current, pageSize } = ctx.params;

        let queryParams = {
            query: {},
            pagination: {
                current,
                pageSize,
            },
            cache: true,
            cacheSec: 120,
        };

        if (getDataType === 'getCompanyNews') {
            queryParams = {
                query: {
                    searchPath: '1-',
                    status: '1',
                    title: `"${stockName}"`,
                },
                pagination: {
                    current,
                    pageSize,
                },
                cache: true,
                cacheSec: 120,
            };
        }
        if (getDataType === 'getCompanyNotice') {
            queryParams = {
                query: {
                    searchPath: '1-',
                    status: '1',
                    title: `"${stockName}"&"公告"`,
                },
                pagination: {
                    current,
                    pageSize,
                },
                cache: true,
                cacheSec: 120,
            };
        }

        const res = await SearchProxy.listByQueryStr(ctx, JSON.stringify(queryParams)).then(...handleJson(ctx));

        const { list = [] } = res;

        const returnList = [];

        list.forEach(item => {
            returnList.push({
                title: item.title,
                url: item.url,
                newsTime: item.newsTime,
            });
        });

        res.list = returnList;

        if (ctx.params.callback) {
            ctx.jsonp(res);
        } else {
            ctx.json(res);
        }
    },
};

// 获取港股要闻接口
exports.getHKFocusNews = {
    path: '/api/finance/hk/getHKNewsList/:callback?',
    method: 'get',
    type: 'jsonp',
    cdncache: 120,
    online: true,
    handler: async ctx => {
        const res = await KVProxy.getDynamicFragment(ctx, '40036').then(...handleJson(ctx));

        const { data = [] } = res;

        const returnList = [];

        data.forEach(item => {
            returnList.push({
                title: item.title,
                url: item.url,
                newsTime: item.newsTime,
            });
        });

        res.data = returnList;

        if (ctx.params.callback) {
            ctx.jsonp(res);
        } else {
            ctx.json(res);
        }
    },
};
