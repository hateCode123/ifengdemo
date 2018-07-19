const request = require('request');

/**
 * 发送get请求
 * @param {Object|string}
 * @return {Promise}
 *
 * @demo1
 * let body = await request.get('http://xxx.com');
 *
 * @demo2
 * let body = await request.get({url : 'http://xxx.com'});
 *
 * @demo3  http://xxx.com?name=zhangsan&age=66
 * let json = {name: 'zhangsan' , age: 66}
 * let body = await request.get({url : 'http://xxx.com',qs: json});
 *
 *
 * @demo4  (json:true 如果结果为json格式字符串，会尝试对结果进行JSON格式化)
 * let body = await request.get({url : 'http://xxx.com',json: true});
 */
exports.get = json => {
    return new Promise((reslove, reject) => {
        try {
            request.get(json, (err, response, body) => {
                if (err) {
                    console.error(err);

                    return reject(err);
                }
                if (json && json.response) {
                    reslove({ response, body });
                } else {
                    reslove(body);
                }
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};

/**
 * 发送post请求
 * @param {Object}
 * @return {Promise}
 *
 * @demo1
 * content-type: application/x-www-form-urlencoded
 * let body = await request.post({url : 'http://xxx.com',form:json});
 *
 * @demo2
 * content-type: application/json
 * let body = await request.post({url : 'http://xxx.com',json:json});
 *
 * @demo3
 * content-type: multipart/form-data
 * let body = await request.post({url : 'http://xxx.com',formData:json});
 */
exports.post = json => {
    return new Promise((reslove, reject) => {
        try {
            request.post(json, (err, response, body) => {
                // console.log(responce);
                if (err) {
                    console.error(err);

                    return reject(err);
                }

                if (json && json.response) {
                    reslove({ response, body });
                } else {
                    reslove(body);
                }
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};

exports.default = request;
