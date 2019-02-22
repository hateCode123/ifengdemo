import hex_sha1 from '../src/sha';
import uploadLogger from '../src/uploadLogger';

/**
 * 单文件分段上传
 * @param  {File}   file     需要上传的文件对象
 * @param  {String} url      上传地址
 * @param  {Object} options  上传需要的附加参数 ------------- 以下全是
 *      @param  {Number} begin    文件起始位置
 *      @param  {Number} cutSize  上传块大小
 *      @param  {String} type     上传类型？需要询问一下陈勇这个的用处
 *      @param  {String} checksum 文件校验码
 *      @param  {String} appid    应用的 id ？需要询问一下陈勇
 *      @param  {String} appcode  应用的 编码 ？需要询问一下陈勇
 *      @param  {String} uid      uid
 */
/* eslint-disable */
const singleUpload = function(file, url, options) {
    this.init(file, url, options);
};

singleUpload.prototype = {
    init: function(file, url, options) {
        this.file = file;
        this.url = url;
        this.cutSize = options.cutSize || 512 * 1024;
        this.fileStatus = options.fileStatus;
        this.abort = true;
        this.reg = /[1]/g;
        this.initPostParams(options);
        this.initCallback(options);
        this.xhr = new XMLHttpRequest();
        this.xhr2 = new XMLHttpRequest();
        this.errorNum = 0;
        this.sendNum = 0;
        this.postingIndex = new Array();
        this.flieStatsusEidt();
    },
    //
    flieStatsusEidt: function() {
        console.log(this.fileStatus);
        this.statusList = [];
        for (let i = 1; i <= this.fileStatus.length; i++) {
            if (Number(this.fileStatus[i - 1]) === 0) {
                this.statusList.push(i);
            }
        }
        console.log('flieStatsusEidt---', this.statusList);
    },
    // 初始化需要提交的参数
    initPostParams: function(options) {
        this.postParams = {
            appId: options.appid, // 应用 id
            fileId: options.fileId, // 传入的文件id
            blockCount: options.blockCount,
            fileName: options.fileName,
            bizId: options.bizId,
            successCb: options.successCb,
            blockId: '',
        };
    },
    // 设置文件开始位置
    setBegin: function(begin) {
        this.begin = begin || 0;
    },

    // 设置文件结束位置
    setEnd: function(begin, cutSize) {
        let fileSize = this.file.size;
        let end = '';

        if (begin + cutSize >= fileSize) {
            this.postParams.lb = true;

            return fileSize;
        } else {
            this.postParams.lb = false;

            return begin + cutSize;
        }
    },

    // 空函数
    emptyFn: function() {
        return true;
    },
    // 初始化回调
    initCallback: function(options) {
        this.loadstartCallback = options.loadstartCallback || this.emptyFn;
        this.loadCallback = options.loadCallback || this.emptyFn;
        this.errorCallback = options.errorCallback || this.emptyFn;
        this.progressCallback = options.progressCallback || this.emptyFn;
        this.abortCallback = options.abortCallback || this.emptyFn;
        this.loadendCallback = options.loadendCallback || this.emptyFn;
    },
    // 上传文件
    fileUpload: function() {
        this.send(this.postParams);
    },
    // 切割文件
    getBlob: function(begin, end) {
        let file = this.file;

        return file.slice
            ? file.slice(begin, end)
            : file.webkitSlice
                ? file.webkitSlice(begin, end)
                : file.mozSlice(begin, end);
    },
    // 取消上传
    abortUpload: function() {
        console.log('停止上传');
        console.log(this.file);
        this.abort = false;
    },
    // 对数字进行转换的函数，具体转换啥了的问问陈勇
    /* eslint-disable */
    toByte: function(origin) {
        let n = Number(origin);
        let n0 = 0;
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let n4 = (n >> 24) & 0xff;
        let n5 = (n >> 16) & 0xff;
        let n6 = (n >> 8) & 0xff;
        let n7 = (n >> 0) & 0xff;
        n4 = this.toSignInt(n4);
        n5 = this.toSignInt(n5);
        n6 = this.toSignInt(n6);
        n7 = this.toSignInt(n7);
        let ascString =
            String.fromCharCode(n0) +
            String.fromCharCode(n1) +
            String.fromCharCode(n2) +
            String.fromCharCode(n3) +
            String.fromCharCode(n4) +
            String.fromCharCode(n5) +
            String.fromCharCode(n6) +
            String.fromCharCode(n7);
        return ascString;
    },
    // 对数字进行转换的函数，具体转换啥了的问问陈勇
    toSignInt: function(num) {
        if (num > 127) {
            num = num - 128 * 2;
        }
        return num;
    },
    send: function(oParam) {
        let index = this.statusList.shift(); // 删除第一个值，并返回这个值

        console.log('index---', index);
        console.log(this.xhr.abort);

        if (!this.abort || index === undefined) {
            return false;
        }
        if (this.errorNum >= 5 || this.sendNum >= this.fileStatus.length + 15) {
            this.errorCallback(this.xhr, this.file, this);

            return false;
        }
        this.sendNum++;
        let fd = new FormData();
        // 循环调用每次取其中的一片
        let begin = (index - 1) * this.cutSize;
        let end = begin + this.cutSize;

        end = end > this.file.size ? this.file.size : end;
        let blockSize = end - begin;
        let r_size = 512 * 1024;

        r_size = r_size >= blockSize ? blockSize : r_size;
        let iReader = new FileReader();

        if (!iReader.readAsBinaryString) {
            uploadLogger({
                name: 'PC_upload_fail<browser is too old>',
                desc: `${window.navigator.userAgent}readAsBinarayString is illegal`,
                fileId: oParam.fileId,
            });

            return;
        }
        console.log(this.getBlob(begin, begin + r_size));
        iReader.readAsBinaryString(this.getBlob(begin, begin + r_size));
        let currentBlockId = '';

        iReader.onload = e => {
            currentBlockId = hex_sha1(e.target.result + this.toByte(blockSize));
            fd.append('fileId', oParam.fileId);
            fd.append('appId', oParam.appId);
            fd.append('blockIndex', index);
            fd.append('bizId', oParam.bizId || new Date().getTime());
            if (oParam.successCb) fd.append('successCb', oParam.successCb);
            fd.append('blockId', currentBlockId);
            fd.append('blockCount', oParam.blockCount);
            fd.append('blockContent', this.getBlob(begin, end), oParam.fileName);
            /* eslint-disable */
            console.log(
                'fileId--' +
                    oParam.fileId +
                    '--appId--' +
                    oParam.appId +
                    '--blockIndex--' +
                    index +
                    '--blockId--' +
                    currentBlockId +
                    '--blockCount--' +
                    oParam.blockCount,
            );
            /* eslint-enable */
            this.xhr.onload = () => {
                if (this.xhr.status === 200) {
                    console.log(this.xhr.responseText);
                    /* eslint-disable */
                    let response = JSON.parse(this.xhr.responseText);
                    /* eslint-enable */
                    if (response.success === true) {
                        console.log(this.fileStatus, 'send');
                        let successNum = response.status.substr(1).match(this.reg).length;
                        const progress = `${(successNum / oParam.blockCount) * 100}%`;

                        this.progressCallback(progress, this.file);
                        if (successNum >= this.fileStatus.length - 1 || index >= this.fileStatus.length - 2) {
                            this.loadCallback(this.file, response);
                            this.abort = false;

                            return;
                        }
                        this.send(oParam);
                    } else if (this.abort) {
                        this.errorNum++;
                        this.statusList.push(index);
                        this.send(oParam);
                    }
                }
            };
            this.xhr.onerror = () => {
                this.errorNum++;
                this.statusList.push(index);
                this.send(oParam);
            };

            this.xhr.open('POST', this.url, true);
            try {
                this.xhr.send(fd);
            } catch (err) {
                this.errorNum++;
                uploadLogger({
                    name: 'PC_upload_fail<singleUpload>',
                    desc: err,
                    fileId: oParam.fileId,
                });
                this.send(oParam);
            }
        };
    },
};
export default singleUpload;
