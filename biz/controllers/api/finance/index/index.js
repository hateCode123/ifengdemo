const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const request = require('../../../../common/request');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.getCustomList = {
    path: '/c/api/finance/index/customList',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, '17007_719_76').then(...handleJson(ctx));

        ctx.json(data);
    },
};

exports.getMacroList = {
    path: '/c/api/finance/index/macroList',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_24').then(...handleJson(ctx));

        ctx.json(data);
    },
};

exports.getStockList = {
    path: '/c/api/finance/index/stockList',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_30').then(...handleJson(ctx));

        ctx.json(data);
    },
};

exports.getImarketsList = {
    path: '/c/api/finance/index/imarketsList',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_25').then(...handleJson(ctx));

        ctx.json(data);
    },
};

exports.getCompanyList = {
    path: '/c/api/finance/index/companyList',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_29').then(...handleJson(ctx));

        ctx.json(data);
    },
};

exports.getWemoneyList = {
    path: '/c/api/finance/index/wemoneyList',
    method: 'get',
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, 'finance_22005_10736_26').then(...handleJson(ctx));

        ctx.json(data);
    },
};