/**
 * 路由重写,主要用于根据 移动端/pc端 和底页id进行模板选择
 * 如果项目中不需要，可以删除(删除时请同时删除入口文件app.js中的引用)
 */
const rewrite = require('koa-rewrite');
const logger = require('./common/logger');
const { isPC } = require('./common/utils/browser');
const { KVProxy } = require('./providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('./services/common/common');

module.exports = async (ctx, next) => {
    logger.debug(ctx.url);
    logger.debug(ctx.header);
    let type = '';
    const deviceType = ctx.headers['devicetype'] ? ctx.headers['devicetype'] : 'pc';

    // 底页面 rewrite
    // if (/^\/r\//.test(ctx.url)) {
    //     let id = ctx.url.match(/r\/([0-9]+)/)[1];
    //     let docData = {};

    //     docData = await KVProxy.getDocument(parseInt(id)).then(...handleJson(ctx, true));
    //     ctx.docData = docData;

    //     type = docData.type;
    //     logger.debug(`docData.type：${docData.type}`);

    //     type = 'content';

    //     let partten = deviceType === 'pc' ? `/${type}$1` : `/mobile/${type}$1`;

    //     return await rewrite(/\/r(.*)/, partten)(ctx, next);
    // }

    if (/(^\/pc\/)/.test(ctx.url)) {
        return await next();
    }

    if (/(^\/mobile\/)/.test(ctx.url)) {
        return await rewrite('/mobile/(.*)', '/pc/$1')(ctx, next);
    }

    if (/(^\/api\/)|(^\/heartbeat)/.test(ctx.url)) {
        return await next();
    }

    if (deviceType === 'pc') {
        return await rewrite(/(.*)/, '/pc$1')(ctx, next);
    }

    if (deviceType === 'phone') {
        // return await rewrite(/(.*)/, '/mobile$1')(ctx, next);
        return await rewrite(/(.*)/, '/pc$1')(ctx, next);
    }

    return await next();
};

// {
//     "_index": "testing-shank-web-channel-test0-2018.05",
//     "_type": "doc",
//     "_id": "AWNn7w7Qo25kgn3moEQA",
//     "_score": 1,
//     "_source": {
//       "@timestamp": "2018-05-16T07:51:45.211Z",
//       "beat": {
//         "hostname": "shank-web-channel-test0-2848318605-gxlt7",
//         "name": "shank-web-channel-test0-2848318605-gxlt7",
//         "version": "5.5.1"
//       },
//       "input_type": "log",
//       "json": {
//         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//         "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
//         "cache-control": "max-age=0",
//         "connection": "close",
//         "cookie": "prov=cn010; city=010; weather_city=bj; region_ip=210.51.19.x; region_ver=1.2; userid=1525684191784_qvm0um4718; if_mid=1525684191784_qvm0um4718; UM_distinctid=1633de76c3658e-0173d05ed99bd6-3a614f0b-1fa400-1633de76c37867; __gads=ID=82c13027461ef33c:T=1525751989:S=ALNI_MZfoZjYr_b9YPzJeSMh4LQHSUnaEQ; vjuids=-63e4f418.1633deab460.0.0b76c2d80da25; is_game_v=1; BDTUJIAID=5998752b865b44dad0619749954b38ca; TEMP_USER_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI1YWY5NDU1NGM4NzM5IiwidGltZSI6MTUyNjI4NTY1Mn0.dSH8aJTYDO-j_17JD-Na8qzRpmSXiouZaiDLsLJaieU; vjlast=1525752182.1526351383.13; selCityName=%E5%8C%97%E4%BA%AC; _ga=GA1.2.1027978340.1526351384; READ_TAG=y",
//         "devicetype": "pc",
//         "dnt": "1",
//         "domain": "test0.web-content.shank.ifeng.com",
//         "host": "test0.web-channel.shank.ifeng.com",
//         "hostname": "shank-web-channel-test0-2848318605-gxlt7",
//         "level": 20,
//         "msg": "",
//         "name": "app",
//         "pid": 1,
//         "requesturl": "test0.web-content.shank.ifeng.com/pc/finance/index",
//         "time": "2018-05-16T07:51:42.679Z",
//         "upgrade-insecure-requests": "1",
//         "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
//         "v": 0,
//         "x-forwarded-for": "172.30.156.158",
//         "x-forwarded-host": "test0.web-channel.shank.ifeng.com",
//         "x-forwarded-port": "30080",
//         "x-forwarded-proto": "http",
//         "x-original-uri": "/pc/finance/index",
//         "x-real-ip": "172.30.156.158",
//         "x-scheme": "http"
//       },
//       "offset": 4181,
//       "source": "/data/logs/out.log",
//       "type": "log"
//     },
//     "fields": {
//       "@timestamp": [
//         1526457105211
//       ],
//       "json.time": [
//         1526457102679
//       ]
//     }
//   }
