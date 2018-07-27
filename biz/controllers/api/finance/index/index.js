const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const request = require('../../../../common/request');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.getCustomList = {
    path: '/api/finance/index/customList/:callback',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, '17007_719_68').then(...handleJson(ctx));

        ctx.jsonp(data);
    },
};

exports.getMacroList = {
    path: '/api/finance/index/macroList/:callback',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_24').then(...handleJson(ctx));

        ctx.jsonp(data);
    },
};

exports.getStockList = {
    path: '/api/finance/index/stockList/:callback',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_30').then(...handleJson(ctx));

        ctx.jsonp(data);
    },
};

exports.getImarketsList = {
    path: '/api/finance/index/imarketsList/:callback',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_25').then(...handleJson(ctx));

        ctx.jsonp(data);
    },
};

exports.getCompanyList = {
    path: '/api/finance/index/companyList/:callback',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_29').then(...handleJson(ctx));

        ctx.jsonp(data);
    },
};

exports.getWemoneyList = {
    path: '/api/finance/index/wemoneyList/:callback',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_26').then(...handleJson(ctx));

        ctx.jsonp(data);
    },
};
