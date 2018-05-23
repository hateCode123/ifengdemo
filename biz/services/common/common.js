const Timers = require('../../common/utils/timers');
const logger = require('../../common/logger');
const config = require('../../configs');
const { KVProxy, SearchProxy } = require('../../providers/ucmsapiProxy');
const { tracer } = require('../../common/jaeger');
/**
 * 使用该方法替代JSON.parse(),统计JSON.parse耗时
 * @param {String} jsonStr json格式字符串
 * @param {Object} ctx http请求上下文
 * @return {Object}
 */
const jsonParse = (jsonStr, ctx, parent) => {
    const child = tracer._tracer.startSpan('JSON.parse()', { childOf: parent });
    if (config.default.statistics) {
        const start = Timers.time();
        let json = JSON.parse(jsonStr);
        let endTime = Timers.timeEnd(start);
        ctx.parseTime.push(endTime);
        // child.log({ event: 'json_parse_end', json_parse_time: endTime });
        child.finish();
        return json;
    } else {
        // child.log({ event: 'json_parse_end' });
        // child.finish();
        // return JSON.parse(jsonStr);
    }
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
        // const parent = tracer._tracer.startSpan('parent', { childOf: result.span });
        // parent.log({ event: 'parent' });

        //     // const child1 = tracer._tracer.startSpan('child1', { childOf: child });
        //     // child1.log({ event: 'child1'});
        //     //     const child2 = tracer._tracer.startSpan('child2', { childOf: child1 });
        //     //     child2.log({ event: 'child2'});
        //     //     child2.finish();
        //     // child1.finish();
        // let data = jsonParse(result.response.return,ctx,parent);
        // data= jsonParse(data.content,ctx,parent)
        // parent.finish();
        // result.span.finish();
        // return data 

        //console.log(result.response)
        // console.log('success.response.costtime:', result.response.costtime);
        // console.log('success.response:');

        // 统计rpc时间
        if (config.default.statistics) {
            // if (singleType) {
            //     ctx.rpcTimeList[0].push(result.response.costtime);
            // } else {
            //     ctx.rpcTimeList[1].push(result.response.costtime);
            // }
        }

        try {
            // 不需要JSON.parse 直接返回
            if (!jsonParseStatus) {
                result.span.finish();
                return result.response.return;
            }
            if (typeof result.response.return === 'string') {
                result.response.return = jsonParse(result.response.return, ctx, result.span);
            }

            if (key) {
                if (jsStatus) {
                    result.span.finish();
                    return result.response.return[key];
                }
                if (typeof result.response.return[key] === 'string') {
                    try {
                      
                        let data = jsonParse(result.response.return[key], ctx, result.span);
                        result.span.finish();
                        return data;
                    } catch (err) {
                        logger.error(`Something error with: ${result.callInfo}`);
                        logger.error(err);
                        logger.error('1111111111');

                        result.span.finish();
                        return result.response.return[key];
                    }
                }

                result.span.finish();
                return result.response.return[key];
            }

            result.span.finish();
            return result.response.return;
        } catch (err) {
            logger.error(`Something error with: ${result.callInfo}`);
            logger.error(err);
            result.span.finish();
            return null;
        }
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

const KVProxyWrapper = ctx => {
    ctx.spanrpc = tracer._tracer.startSpan('KVProxy_rpc', { childOf: ctx.span });
    return KVProxy;
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
    KVProxyWrapper,
};
