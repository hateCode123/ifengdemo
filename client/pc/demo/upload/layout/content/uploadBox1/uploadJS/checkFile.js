import hex_sha1 from './sha.js';
import uploadLogger from './uploadLogger.js';
import { ajax } from '@ifeng/ui_base';

/* eslint-disable */
(function() {
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
    window.checkFile = (file, url, options) => {
        this.file = file;
        this.url = url;
        this.params = this.initParam(options);
        this.callback = options.callback;
        this.callbackScope = options.callbackScope;
        this.options = options;
    };

    checkFile.prototype = {
        initParam: options => {
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
        runCheck: async () => {
            const _this = this;
            // $.ajax({
            //     async: false,
            //     url: this.url,
            //     data: this.params,
            //     dataType: 'json',
            //     success: function(msg) {
            //         _this.callback.call(_this.callbackScope, _this.file, msg, _this.options);
            //     },
            //     error: function(XMLHttpRequest, textStatus, errorThrown) {
            //         errorState =
            //             'XMLHttpRequest.status=' +
            //             XMLHttpRequest.status +
            //             '&XMLHttpRequest.readyState=' +
            //             XMLHttpRequest.readyState +
            //             '&textStatus=' +
            //             textStatus;
            //         //checkFile 失败日志
            //         uploadLogger({
            //             name: 'PC_upload_fail<checkFile>',
            //             desc: errorState,
            //             fileId: _this.params.fileId,
            //         });
            //     },
            // });

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
            }
        },
    };
})();
module.exports = checkFile;
