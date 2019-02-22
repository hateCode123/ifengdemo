import hex_sha1 from '../src/sha.js';
import uploadLogger from '../src/uploadLogger.js';
import { ajax } from '@ifeng/ui_base';

/* eslint-disable */
/**
 * 校验文件：
 * @param  {Object} file    文件对象
 * @param  {String} url     请求校验地址
 * @param  {Object} options 可选参数-------------以下为options中的参数
 * @param  {String} checksum 根据文件生成的校验和id
 * @param  {String} appid 应用的id 具体是啥需要问陈勇
 * @param  {String} appcode 应用的code 具体是啥需要问陈勇
 * @param  {String} uid 用户id 具体如何取要看现有凤凰的系统。
 */
window.checkFile = function(file, url, options) {
    this.file = file;
    this.url = url;
    this.params = this.initParam(options);
    this.callback = options.callback;
    this.callbackScope = options.callbackScope;
    this.options = options;
};

checkFile.prototype = {
    initParam: function(options) {
        // 根据options筛选校验需要的参数
        return {
            fileId: options.fileId, // 根据uid，appid，checksum之和生成的校验码。
            appId: options.appid, // 应用的id
            blockCount: options.blockCount,
            bizId: options.bizId,
            successCb: options.successCb,
        };
    },

    // 执行校验请求。
    runCheck: async function() {
        const _this = this;

        try {
            const res = await ajax(this.url, {
                data: this.params,
            });

            console.log('result=', res);
            _this.callback.call(_this.callbackScope, _this.file, res, _this.options);
        } catch (error) {
            const errorState = `XMLHttpRequest.status=${XMLHttpRequest.status}&XMLHttpRequest.readyState=${
                XMLHttpRequest.readyState
            }&textStatus=${error}`;

            uploadLogger({
                name: 'PC_upload_fail<checkFile>',
                desc: errorState,
                fileId: _this.params.fileId,
            });
            throw error;
        }
    },
};
export default checkFile;
