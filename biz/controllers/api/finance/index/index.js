const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const request = require('../../../../common/request');
const { KVProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.getwemediaEAccountImg = {
    path: '/api/finance/index/getwemediaEAccountImg/:wemediaEAccountId/:callback?',
    method: 'get',
    online: true,
    handler: async ctx => {
        const wemediaEAccountId = ctx.params.wemediaEAccountId;

        try {
            const body = await request.get({
                url: `http://local.fhhapi.ifeng.com/baseInfo/account/${wemediaEAccountId}/1`,
                json: true,
            });

            if (ctx.params.callback) {
                ctx.jsonp(body.data);
            } else {
                ctx.json(body.data);
            }
        } catch (err) {
            console.error(err);
            if (ctx.params.callback) {
                return ctx.jsonp(1, '获取数据失败');
            } else {
                return ctx.json(1, '获取数据失败');
            }
        }
    },
};

exports.getInfoIndexList = {
    path: '/api/finance/index/infoIndex/:callback?',
    method: 'get',
    online: true,
    handler: async ctx => {
        const data = await KVProxy.getCustom(ctx, '17007_719_68').then(...handleJson(ctx));

        try {
            for (const item of data) {
                item.url = item.wwwUrl;
            }
        } catch (e) {
            console.error(e);
            console.info(data);
        }

        if (ctx.params.callback) {
            ctx.jsonp(data);
        } else {
            ctx.json(data);
        }
    },
};

exports.getInfoDataList = {
    path: '/api/finance/index/infoData/:key/:callback?',
    method: 'get',
    online: true,
    handler: async ctx => {
        const key = ctx.params.key;
        const data = await KVProxy.getDynamicFragment(ctx, key).then(...handleJson(ctx));

        if (ctx.params.callback) {
            ctx.jsonp(data);
        } else {
            ctx.json(data);
        }
    },
};
