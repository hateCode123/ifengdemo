const Timers = require('../../common/utils/timers');
const logger = require('../../common/logger');
const config = require('../../configs');
const { KVProxy, SearchProxy } = require('../../providers/ucmsapiProxy');
const { tracer } = require('../../common/jaeger');
const Tars = require('@tars/stream');

/**
 * 使用该方法替代JSON.parse(),统计JSON.parse耗时
 * @param {String} jsonStr json格式字符串
 * @param {Object} ctx http请求上下文
 * @return {Object}
 */
const jsonParse = (jsonStr, ctx, parent) => {
    let context = {};

    if (config.default.statistics) {
        context.start = Timers.time();
    }
    if (config.default.statisticsJaeger) {
        context.child = tracer._tracer.startSpan('JSON.parse()', { childOf: parent || ctx.span });
    }

    let json = JSON.parse(jsonStr);

    if (config.default.statistics) {
        let endTime = Timers.timeEnd(context.start);
        ctx.parseTime.push(endTime);
    }
    if (config.default.statisticsJaeger) {
        context.child.finish();
    }
    return json;
};

/**
 * @param {Object} ctx http请求上下文
 * @param {String|Boolean} jsonParseStatus true:rpc响应数据进行JSON.parse,false: rpc响应数据不处理
 * @param {String|Boolean} key 取rpc返回的json数据，key键对应的值返回
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @param {Boolean} jsStatus rpc响应数据是js字符串，对js代码进行try catch 包裹后返回，
 * @return {Function}
 */

const success = (ctx, jsonParseStatus, key, singleType = false, jsStatus = false) => {
    return result => {
        // 统计rpc时间
        if (config.default.statistics) {
            if (singleType) {
                ctx.rpcTimeList[0].push(result.response.costtime);
            } else {
                ctx.rpcTimeList[1].push(result.response.costtime);
            }
        }

        let back = null;

        try {
            if (jsonParseStatus) {
                back = jsonParse(result.response.return, ctx, result.span);
                if (key) {
                    back = back[key];
                    if (!jsStatus) {
                        back = jsonParse(back, ctx, result.span);
                    }
                }
            } else {
                // 不需要JSON.parse 直接返回
                back = result.response.return;
            }
        } catch (err) {
            logger.error(`Something error with: ${result.callInfo}`);
            logger.error(err);
        }

        // jaeger trance 结束
        if (config.default.statisticsJaeger) {
            result.span.finish();
        }

        return back;
    };
};

/**
 * @param {Object} ctx http请求上下文
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @return {Function}
 */
const error = (ctx, singleType = false) => {
    // console.log('error.response.costtime:', result.response.costtime);
    // console.log('error.response:', result.response.error);

    return result => {
        // console.log('success.response.costtime:', result.response.costtime);
        // console.log('success.response:', result.response.return);

        if (config.default.statistics) {
            if (singleType) {
                ctx.rpcTimeList[0].push(result.response.costtime);
            } else {
                ctx.rpcTimeList[1].push(result.response.costtime);
            }
        }

        return null;
    };
};

/**
 * @param {Object} ctx http请求上下文
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @return {Array}
 */
const handleData = (ctx, singleType = false) => {
    return [success(ctx, false, '', singleType), error(ctx, singleType)];
};

/**
 * @param {Object} ctx http请求上下文
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @return {Array}
 */
const handleJson = (ctx, singleType = false) => {
    return [success(ctx, true, '', singleType), error(ctx, singleType)];
};

/**
 * @param {Object} ctx http请求上下文
 * @param {String|Boolean} key 取rpc返回的json数据，key键对应的值返回
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @return {Array}
 */
const handleJsonByKey = (ctx, key, singleType = false) => {
    return [success(ctx, true, key, singleType, false), error(ctx, singleType)];
};

/**
 * @param {Object} ctx http请求上下文
 * @param {String|Boolean} key 取rpc返回的json数据，key键对应的值返回 ，一般为字符串
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @return {Array}
 */
const handleJs = (ctx, key, singleType = false) => {
    return [success(ctx, true, key, singleType, true), error(ctx, singleType)];
};

/**
 * @param {Object} ctx http请求上下文
 * @param {String|Boolean} key 取rpc返回的json数据，key键对应的值返回 ，一般为字符串
 * @param {Boolean} singleType 因为rpc请求有单个执行的，有多个并行执行的，为了统计rpc响应时间,当单个执行rpc请求时请传入true
 * @return {Array}
 */
const handleStringByKey = (ctx, key, singleType = false) => {
    return [success(ctx, true, key, singleType, true), error(ctx, singleType)];
};

const promiseAll = async json => {
    let allData = {};
    let mykeys = [];
    let myvalues = [];

    for (let key in json) {
        myvalues.push(json[key]);
        mykeys.push(key);
    }

    let arr = await Promise.all(myvalues);
    for (let i = 0; i < arr.length; i++) {
        allData[mykeys[i]] = arr[i];
    }
    return allData;
};


const transfer = async (ctx, json) => {

    let obj = {};
    let keys = {};
    let funcs = {};
    let backData = {}

    for (const item of json) {
        backData[item[0]] = [];
        keys[item[3]] = item[0];
        funcs[item[3]] = item[4];
        let key = item[1] + '.' + item[2];
        if (!obj[key]) {
            obj[key] = { keys: [], ids: [], handles: [] };
        }
        obj[key].keys.push(item[0]);
        obj[key].ids.push(item[3]);
        obj[key].handles.push(item[4]);
    }
    console.log(keys);
    let allp = [];
    for (const i in obj) {
        let ids = getIds(obj[i].ids);
    
        allp.push(KVProxy[getAction(i)](ctx, ids).then((result)=>{
            if (config.default.statistics) {
                ctx.rpcTimeList[1].push(result.response.costtime);
            }
             // jaeger trance 结束
            if (config.default.statisticsJaeger) {
                result.span.finish();
            }
            return result.response.return.value;
        },(result)=>{
            if (config.default.statistics) {
                ctx.rpcTimeList[1].push(result.response.costtime);
            }
             // jaeger trance 结束
             if (config.default.statisticsJaeger) {
                result.span.finish();
            }
            logger.error(`Something error with: ${result.callInfo}`);
            logger.errror(result.response.error);
            return [];
        }));
    }
    let data = await Promise.all(allp);

    let allData = {};
    for (const item of data) {
        allData = Object.assign(allData, item);
    }

    for (const i in allData) {
        console.log(keys[i],i);
        backData[keys[i]] =  funcs[i](ctx,allData[i]);
    }

    return backData;
};

function getIds(arr) {
    let map = {
        number: Tars.Int32,
        string: Tars.String
    };
    let type = typeof arr[0];
    const ids = new Tars.List(map[type]);
    console.log(arr);
    arr = [...new Set(arr)];

    for (const item of arr) {
        ids.push(item);
    }

    return ids;
}


function getString(key){
    return function (ctx, data){
        return data;
    }
}

function getJson(key){
    return function (ctx, data){
        return jsonParse(data,ctx)
    }
}


function getJsonByKey(key){
    return function (ctx, data){
        let json =  jsonParse(data,ctx)
        json = jsonParse(json[key],ctx);
        return json;
    }
}

function getStringByKey(key){
    return function (ctx, data){
        let json =  jsonParse(data,ctx)
        return json[key];
    }
}

function getAction(action) {
    let key = {
        'KVProxy.getAd': 'getAds',
        'KVProxy.getCategory': 'getCategories',
        'KVProxy.getCustom': 'getCustoms',
        'KVProxy.getDocument': 'getDocuments',
        'KVProxy.getRecommendFragment': 'getRecommendFragments',
        'KVProxy.getSsiFragment': 'getSsiFragments',
        'KVProxy.getStaticFragment': 'getStaticFragments',
        'KVProxy.getStructuredFragment': 'getStructuredFragments',
        'KVProxy.getVideo': 'getVideos',
    };
    return key[action];
}

// 导出处理函数
module.exports = {
    jsonParse,
    success,
    error,
    handleData,
    handleJson,
    handleJsonByKey,
    handleJs,
    handleStringByKey,
    promiseAll,
    transfer,
    getJson,
    getJsonByKey,
    getStringByKey
};
