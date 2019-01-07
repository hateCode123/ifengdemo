/**
 * 创建一个ajax请求，该请求返回一个promise对象
 * @param {String} url 请求地址
 * @param {Object} options 扩展参数，参数内容如下
 *   @param {Object} data 需要传给服务器的参数，
 *   注意：参数会进行encodeURIComponent编码
 *   @param {String} type ajax 请求类别 默认为 get，可选值为 get | post
 *   @param {String} dataType ajax 返回值类型，默认为 json，可选值为 json | text
 *   @param {Number || Boolean} cache 只能是数字类型，如果是false，则不会拼接该参数
 *   @param {Number} timeout 超时时间，默认为10000毫秒
 *   @param {Boolean} async 请求是否异步，默认为true，异步请求，一般不建议改动该值
 */

// import history from '../history';
// import { APIHOST } from '../config';
// import { logoutWithoutOffline } from '../common/models/user';

import { requestResponseHandler } from './index';

import { ajax } from '@ifeng/ui_base';

export default async function request(url, options) {
    const result = await ajax(url, {
        ...options,
    });

    try {
        console.log('result=', result);

        // return requestResponseHandler(result);
        return result;
    } catch (error) {
        console.error('request error url = ', url, ', error is ', error);
        throw error;
    }
}
