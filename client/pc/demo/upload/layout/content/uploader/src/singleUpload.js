import hex_sha1 from './sha';
import uploadLogger from './uploadLogger';

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
class SingleUpload {
    constructor(file, url, options) {
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
    }
    // 空函数
    emptyFn() {
        return true;
    }
    // 生成未上传文件的数组 例[1, 1, 1, 0, 0, 0]
    flieStatsusEidt() {
        // console.log(this.fileStatus);
        this.statusList = [];
        for (let i = 1; i <= this.fileStatus.length; i++) {
            if (Number(this.fileStatus[i - 1]) === 0) {
                this.statusList.push(i);
            }
        }
        // console.log('flieStatsusEidt---', this.statusList);
        // 例[4, 5, 6]
    }
    // 初始化需要提交的参数
    initPostParams(options) {
        this.postParams = {
            appId: options.appid, // 应用 id
            fileId: options.fileId, // 传入的文件id
            blockCount: options.blockCount, // 文件块数
            fileName: options.fileName,
            bizId: options.bizId,
            successCb: options.successCb,
            blockId: '',
        };
        console.log(this.postParams);
    }
    // 初始化回调
    initCallback(options) {
        this.loadstartCallback = options.loadstartCallback || this.emptyFn;
        this.loadCallback = options.loadCallback || this.emptyFn;
        this.errorCallback = options.errorCallback || this.emptyFn;
        this.progressCallback = options.progressCallback || this.emptyFn;
        this.abortCallback = options.abortCallback || this.emptyFn;
        this.loadendCallback = options.loadendCallback || this.emptyFn;
    }
    // 上传文件
    fileUpload() {
        this.send(this.postParams);
    }
    // 切割文件
    getBlob(begin, end) {
        const file = this.file;
        let func = '';

        if (!file.slice) {
            if (file.webkitSlice) {
                func = file.webkitSlice(begin, end);
            } else {
                func = file.mozSlice(begin, end);
            }
        } else {
            func = file.slice(begin, end);
        }

        return func;
    }
    // 取消上传
    abortUpload() {
        console.log('停止上传');
        this.xhr.abort = false;
        this.abort = false;
    }
    // 对数字进行转换的函数，具体转换啥了的问问陈勇
    toByte(origin) {
        const n = Number(origin);
        const n0 = 0;
        const n1 = 0;
        const n2 = 0;
        const n3 = 0;
        let n4 = (n >> 24) & 0xff;
        let n5 = (n >> 16) & 0xff;
        let n6 = (n >> 8) & 0xff;
        let n7 = (n >> 0) & 0xff;

        n4 = this.toSignInt(n4);
        n5 = this.toSignInt(n5);
        n6 = this.toSignInt(n6);
        n7 = this.toSignInt(n7);
        const ascString =
            String.fromCharCode(n0) +
            String.fromCharCode(n1) +
            String.fromCharCode(n2) +
            String.fromCharCode(n3) +
            String.fromCharCode(n4) +
            String.fromCharCode(n5) +
            String.fromCharCode(n6) +
            String.fromCharCode(n7);

        return ascString;
    }
    // 对数字进行转换的函数，具体转换啥了的问问陈勇
    toSignInt(num) {
        if (num > 127) {
            num -= 128 * 2;
        }

        return num;
    }
    send(oParam) {
        const index = this.statusList.shift(); // 删除第一个值，并返回这个值

        if (!this.abort || index === undefined) {
            return false;
        }
        if (this.errorNum >= 5 || this.sendNum >= this.fileStatus.length + 15) {
            console.log('上传失败');
            this.errorCallback(this.xhr, this.file, this);

            return false;
        }
        this.sendNum++;
        const fd = new FormData();
        // 循环调用每次取其中的一片
        const begin = (index - 1) * this.cutSize;
        let end = begin + this.cutSize;

        end = end > this.file.size ? this.file.size : end;
        const blockSize = end - begin;
        let r_size = 512 * 1024;

        r_size = r_size >= blockSize ? blockSize : r_size;
        const iReader = new FileReader();

        if (!iReader.readAsBinaryString) {
            uploadLogger({
                name: 'PC_upload_fail<browser is too old>',
                desc: `${window.navigator.userAgent}readAsBinarayString is illegal`,
                fileId: oParam.fileId,
            });

            return;
        }
        // console.log(this.getBlob(begin, begin + r_size));
        iReader.readAsBinaryString(this.getBlob(begin, begin + r_size));
        let currentBlockId = '';

        iReader.onload = e => {
            currentBlockId = hex_sha1(e.target.result + this.toByte(blockSize));
            // 组装form表单参数
            fd.append('fileId', oParam.fileId);
            fd.append('appId', oParam.appId);
            fd.append('blockIndex', index);
            fd.append('bizId', oParam.bizId || new Date().getTime());
            if (oParam.successCb) fd.append('successCb', oParam.successCb);
            fd.append('blockId', currentBlockId);
            fd.append('blockCount', oParam.blockCount);
            fd.append('blockContent', this.getBlob(begin, end), oParam.fileName);
            console.log(
                `fileId--${oParam.fileId}--appId--${
                    oParam.appId
                }--blockIndex--${index}--blockId--${currentBlockId}--blockCount--${oParam.blockCount}`,
            );
            this.xhr.onload = () => {
                if (this.xhr.status === 200) {
                    const response = JSON.parse(this.xhr.responseText);

                    if (response.success === true) {
                        console.log('send status ==', response.status);
                        const successNum = response.status.substr(1).match(this.reg).length;
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
                throw err;
            }
        };
    }
}

export default SingleUpload;
