const Timers = require('../../common/utils/timers');
const logger = require('../../common/logger');
const config = require('../../configs');
const { KVProxy, SearchProxy } = require('../../providers/ucmsapiProxy');
const { tracer } = require('../../common/jaeger');
const Tars = require('@tars/stream');
const _ = require('lodash');
const os = require('os');
const hostname = os.hostname();
// const { schemaCheck } = require('../../services/jsonschema/validate');
const schemaCheck = null;
const KVTableEnum = {
    'KVProxy.getStructuredFragment': 'structured_fragment',
    'KVProxy.getStaticFragment': 'static_fragment',
    'KVProxy.getDynamicFragment': 'dynamic_fragment',
    'KVProxy.getSsiFragment': 'ssi_fragment',
    'KVProxy.getRecommendFragment': 'recommend_fragment',
    'KVProxy.getCustom': 'custom',
    'KVProxy.getAd': 'ad',
    'KVProxy.getCategory': 'category',
    'KVProxy.getDocument': 'documents',
    'KVProxy.getVideo': 'video',
    'KVProxy.getSelectedPool': 'selected_pool',
    'KVProxy.getListByWemediaEAccountId': 'WEMEDIA_ACCOUNT',
};

/**
 * 使用该方法替代JSON.parse(),统计JSON.parse耗时
 * @param {String} jsonStr json格式字符串
 * @param {Object} ctx http请求上下文
 * @return {Object}
 */
const jsonParse = (jsonStr, ctx, parent) => {
    if (!jsonStr || typeof jsonStr === 'object') {
        return jsonStr;
    }

    const context = {};

    if (config.default.statistics) {
        context.start = Timers.time();
    }
    // if (config.default.statisticsJaeger) {
    //     context.child = tracer.startSpan('JSON.parse()', { childOf: parent || ctx.span });
    // }

    let json = null;

    try {
        json = JSON.parse(jsonStr);
    } catch (error) {
        ctx.errorCount++;
        console.log(jsonStr);
        console.log(error);
        json = jsonStr;
    }

    if (config.default.statistics) {
        const endTime = Timers.timeEnd(context.start);

        ctx.parseTimeList.push(endTime);
    }
    // if (config.default.statisticsJaeger) {
    //     context.child.finish();
    // }

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
            ctx.errorCount++;
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
        ctx.errorCount++;
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
    const allData = {};
    const mykeys = [];
    const myvalues = [];

    for (const key in json) {
        myvalues.push(json[key]);
        mykeys.push(key);
    }

    const arr = await Promise.all(myvalues);

    for (let i = 0; i < arr.length; i++) {
        allData[mykeys[i]] = arr[i];
    }

    return allData;
};

// const transfer = async (ctx, json) => {
//     let obj = {};
//     let keys = {};
//     let funcs = {};
//     let backData = {};

//     for (const item of json) {
//         backData[item[0]] = [];
//         keys[item[3]] = item[0];
//         funcs[item[3]] = item[4];
//         let key = item[1] + '.' + item[2];
//         if (!obj[key]) {
//             obj[key] = { keys: [], ids: [], handles: [] };
//         }
//         obj[key].keys.push(item[0]);
//         obj[key].ids.push(item[3]);
//         obj[key].handles.push(item[4]);
//     }

//     let allp = [];
//     for (const i in obj) {
//         let ids_group = _.chunk(obj[i].ids, 30);
//         for (const iterator of ids_group) {
//             let ids = getIds(iterator);
//             allp.push(
//                 KVProxy[getAction(i)](ctx, ids).then(
//                     result => {
//                         try {
//                             if (config.default.statistics) {
//                                 ctx.rpcTimeList[1].push(result.response.costtime);
//                             }
//                             // jaeger trance 结束
//                             if (config.default.statisticsJaeger) {
//                                 result.span.finish();
//                             }
//                             if (config.default.statisticsProm) {
//                                 ctx.p_rpc.observe(
//                                     {
//                                         url: ctx.originalUrl.replace(/\?.*/, ''),
//                                         rpc_func: result.callInfo.replace('[object Object]', ''),
//                                     },
//                                     result.response.costtime,
//                                 );
//                             }
//                         } catch (error) {
//                             logger.error(error);
//                         }

//                         return result.response.return.value;
//                     },
//                     result => {
//                         try {
//                             if (config.default.statistics) {
//                                 ctx.rpcTimeList[1].push(result.response.costtime);
//                             }
//                             // jaeger trance 结束
//                             if (config.default.statisticsJaeger) {
//                                 result.span.finish();
//                             }
//                             if (config.default.statisticsProm) {
//                                 ctx.p_rpc.observe(
//                                     {
//                                         url: ctx.originalUrl.replace(/\?.*/, ''),
//                                         rpc_func: result.callInfo.replace('[object Object]', ''),
//                                     },
//                                     result.response.costtime,
//                                 );
//                             }
//                         } catch (error) {
//                             logger.error(error);
//                         }
//                         logger.error(`Something error with: ${result.callInfo}`);
//                         logger.error(result.response.error);
//                         return [];
//                     },
//                 ),
//             );
//         }
//     }
//     let data = await Promise.all(allp);

//     let allData = {};
//     for (const item of data) {
//         allData = Object.assign(allData, item);
//     }

//     for (const i in allData) {
//         backData[keys[i]] = funcs[i](ctx, allData[i]);
//     }

//     return backData;
// };

const getIds = arr => {
    // console.log(arr);
    const ids = new Tars.List(Tars.String);

    arr = [...new Set(arr)];
    for (const item of arr) {
        ids.push(String(item));
    }

    return ids;
};

const getString = key => {
    return (ctx, data) => {
        return data;
    };
};

const getJson = key => {
    return (ctx, data, span) => {
        try {
            return jsonParse(data, ctx, span);
        } catch (error) {
            ctx.errorCount++;
            console.error(data);
            console.error(error);

            return null;
        }
    };
};

const getJsonByKey = key => {
    return (ctx, data, span) => {
        let json = jsonParse(data, ctx, span);

        try {
            json = jsonParse(json[key], ctx, span);

            return json;
        } catch (error) {
            ctx.errorCount++;
            console.error(error);
            console.error(json[key]);
            console.error(data);
        }

        return json[key];
    };
};

const getStringByKey = key => {
    return (ctx, data, span) => {
        try {
            const json = jsonParse(data, ctx, span);

            return json[key];
        } catch (error) {
            ctx.errorCount++;
            console.error(error);
            console.error(data);

            return null;
        }
    };
};

const getAction = key => {
    return KVTableEnum[key] || 'other';
};

const transfer = async (ctx, json) => {
    const obj = {};
    const backData = {};

    const map = new Tars.Map(Tars.String, Tars.List(Tars.String));

    for (const item of json) {
        let kv_key = item[0].split(':')[0];

        backData[kv_key] = [];
        const key = getAction(`${item[1]}.${item[2]}`);

        if (!obj[key]) {
            obj[key] = {};
        }
        if (!obj[key][item[3]]) {
            obj[key][item[3]] = [{ name: kv_key, handle: item[4], schemaKey: item[5] }];
        } else {
            obj[key][item[3]].push({ name: kv_key, handle: item[4], schemaKey: item[5] });
        }
    }

    for (const key in obj) {
        const tarList = new Tars.List(Tars.String);

        for (const item of Object.keys(obj[key])) {
            tarList.push(String(item));
        }
        map.set(key, tarList);
    }
    let result = '';
    const rpc_span = null;

    try {
        if (config.default.statisticsJaeger && ctx.spanrpc) {
            const carrier = {};

            // const carrier = new Tars.Map(Tars.String, Tars.String);
            tracer.inject(rpc_span, 'text_map', carrier);

            // logger.info(`${ctx.uuid}: ${JSON.stringify(carrier)}`);

            // 如果有span ，则传递给 tars
            result = await KVProxy.getAllWithTracer(ctx, json, map, JSON.stringify(carrier));
        } else {
            result = await KVProxy.getAll(ctx, json, map);
        }

        //
    } catch (error) {
        ctx.errorCount++;
        // logger.error(error);

        return backData;
    } finally {
        if (config.default.statistics && result.response) {
            ctx.rpcTimeList[1].push(result.response.costtime || 0);
        }
        // jaeger trance 结束
        if (config.default.statisticsJaeger && result.span) {
            result.span.finish();
        }
        if (config.default.statisticsProm && result.response) {
            ctx.p_rpc.observe(
                {
                    url: ctx.urlinfo.path,
                    rpc_func: result.callInfo.replace('[object Object]', ''),
                    hostname,
                },
                result.response.costtime || 0,
            );
        }
    }
    // console.dir(result.response.return.value, {depth: null});

    for (const key in result.response.return.value) {
        const kvObj = result.response.return.value[key].value;

        for (const id in kvObj) {
            for (const item of obj[key][id]) {

                const itemkey = item.name;

                // console.log(itemkey);
                const handle = item.handle;
                const schemaKey = item.schemaKey;

                // 全页预览处理
                if (ctx.urlinfo.preview && id === ctx.request.body.id) {
                    let data = decodeURIComponent(ctx.request.body.data);

                    try {
                        try {
                            backData[itemkey] = JSON.parse(JSON.parse(data));
                        } catch (error) {
                            ctx.errorCount++;
                            backData[itemkey] = JSON.parse(data);
                        }
                    } catch (error) {
                        ctx.errorCount++;
                        backData[itemkey] = data;
                    }
                } else {
                    backData[itemkey] = handle(ctx, kvObj[id], ctx.spanrpc);
                }

                // kv数据schema处理
                if (schemaKey && schemaCheck) {
                    backData[itemkey] = schemaCheck(backData[itemkey], schemaKey, ctx);
                }
            }
        }
    }

    return backData;
};

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
    getString,
    getJsonByKey,
    getStringByKey,
};
