import checkFile from '../bak/checkFileA';
import hex_sha1 from './sha';
import { cookie, ajax, jsonp } from '@ifeng/ui_base';
import CreatFileId from '../bak/creatFileIdA';
import singleUpload from '../bak/singleUploadA';
import uploadLogger from './uploadLogger';

/* eslint-disable */
export const ResumeUpload = function(file, options) {
    this.checkPath = 'query'; // 不需要本地文件验证文件地址
    this.checkPath1 = 'fileInfo'; // 需要本地文件验证文件地址
    this.uploadPath = 'upload'; // 上传文件地址
    this.uploadUrl = 'http://transmission.ifeng.com/';
    this.imageServer = 'http://d.ifengimg.com/q100/';
    this.rinfo = 'http://ugc.ifeng.com/index.php/user/info'; // 查询用户信息
    this.getid = 'http://ugc.ifeng.com/index.php/user/getid'; // 获取rid
    this.fileId = '';
    this.fileStatus = {};
    this.limit = 2 * 1024 * 1024;
    this.xhr = new XMLHttpRequest();
    let isExternal = /external/gi.test(window.location.pathname);

    this.sid = isExternal ? cookie.get('fhhmgrimgsid') : cookie.get('sid');
    this.ugcCallback = null;
    this.rid = '';
    // this.element = ele;
    this.loopCount = 20;
    this.ervalObject = null;

    options = options || {};
    this.type = options.type || 0;
    this.appid = options.appid || 'wemedia';
    this.checkFileSizeAndType = options.checkFileSizeAndType || this.checkFileSizeAndType;
    this.onBeforeUpload = options.onBeforeUpload || this.onBeforeUpload;
    this.successCallback = options.successCallback || this.successCallback;
    this.onFinishedCallback = options.removeUpload || this.onFinishedCallback;
    this.uploadProgressCallback = options.progressCallback || this.uploadProgressCallback;
    this.errorCallback = options.errorCallback || this.errorCallback;
    this.index = options.index;
    this.showBase64 = options.showBase64 || false;
    this.uploading = true;
    this.init(file);
};
ResumeUpload.prototype = {
    init: function(file) {
        this.file = file;
        this.fileName = file.name;
        this.file.id = `FHH_FILE_${this.index}`;

        if (!this.checkFileSizeAndType(file, this.type)) {
            return true;
        }
        console.log('格式大小校验通过');
        this.blockCount =
            this.file.size % this.limit === 0
                ? parseInt(this.file.size % this.limit)
                : parseInt(this.file.size / this.limit + 1); // 最后一块是整块+余数
        if (this.type === 1 && this.showBase64) {
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = e => {
                this.file.base64Url = this.result;
                this.getUgcTaskInfo(this.type, this.startCreate.bind(this));
            };

            return;
        }
        this.getUgcTaskInfo(this.type, this.startCreate.bind(this));
    },
    checkFileSizeAndType: function(file, type) {
        const isInArray = (value, arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (value === arr[i]) {
                    return true;
                }
            }

            return false;
        };

        if (type === 0 || type === 2) {
            // 如果视频资源和音频
            let suffix1 = [
                'mp4',
                'mpeg',
                'wmv',
                'flv',
                'swf',
                'rmvb',
                'avi',
                'mov',
                'rm',
                'asf',
                'mpg',
                '3gp',
                'mkv',
                'f4v',
                'vob',
            ];
            let suffix2 = ['mp3', 'wav', 'wma', 'ogg'];
            let suffix = type === 0 ? suffix1 : suffix2;
            let pos = this.fileName.lastIndexOf('.');
            let lastName = this.fileName.substring(pos + 1).toLowerCase();

            if (!isInArray(lastName, suffix)) {
                // alert('请选择正确的格式');
                const error = {
                    status: 40001,
                    msg: '请选择正确的格式',
                };
                this.errorCallback(error, this.file);
                this.onError(error);
                this.onFinishedCallback();

                return false;
            }

            if (this.file.size > 1000 * 1024 * 1024) {
                // console.log(
                //     '<div style="padding:22px 32px 32px;">上传文件请小于1000M，超出请下载<a href="http://v.ifeng.com/vblog/clientdownload/index.html" style="text-decoration:underline;color:#901D22" target="_blank">客户端</a>上传</div>',
                // );

                const error = {
                    status: 40002,
                    msg: '上传文件请小于1000M，超出请下载客户端',
                };
                this.errorCallback(error, this.file);
                this.onError(error);
                this.onFinishedCallback();

                return false;
            }
        } else if (type === 1) {
            // 如果是图片资源;
            let suffix = ['webp', 'jpg', 'jpeg', 'png', 'gif'];
            let pos = this.fileName.lastIndexOf('.');
            let lastName = this.fileName.substring(pos + 1).toLowerCase();
            if (!isInArray(lastName, suffix)) {
                const error = {
                    status: 40001,
                    msg: '请选择正确的格式',
                };
                this.errorCallback(error, this.file);
                this.onError(error);
                this.onFinishedCallback();
                return false;
            }
            if (this.file.size > 5 * 1024 * 1024) {
                // alert('图片不能大于5M,请重新选择');
                const error = {
                    status: 40003,
                    msg: '图片不能大于5M,请重新选择',
                };
                this.errorCallback(error, this.file);
                this.onError(error);
                this.onFinishedCallback();

                return false;
            }
        }

        return true;
    },
    getUgcTaskInfo: async function(type, callback) {
        if (type === 0 || type === 2) {
            callback({});
        } else if (type === 1) {
            const data = {
                sid: this.sid,
                utype: 0, // 普通用户
                pl: 3, // pc浏览器
                rtype: 3, // 资源类型3图片 0视频 1音频 2普通文件
                title: 'wemedia', // 资源标题
                desc: '',
                tags: 'tags',
                addr: '',
                x: '',
                y: '',
                pid: '203', // 业务类型801 环保举报
                ip: '',
                ctype: 0, // 原创
                rt: 'jsonp',
            };

            try {
                const res = await jsonp(this.getid, {
                    data,
                });

                if (res.code === 0) {
                    // 获取到rid successCb
                    let param = { successCb: res.data.callback, bizId: res.data.rid };
                    console.log(param);

                    callback(param);
                } else {
                    alert(res.message);
                }
            } catch (error) {
                throw error;
            }
        }
    },
    startCreate: function(param) {
        this.oParam = param;
        this.creatChecksum = new CreatFileId(this.file, {
            callback: this.creatFileIdCallback,
            callbackScope: this,
        });
        this.creatChecksum.creat();
        this.onBeforeUpload(this.file);
    },
    creatFileIdCallback: function(checksum) {
        console.log(checksum);
        this.checksum = checksum;
        // 创建一个fileId都这么麻烦
        this.fileId = `${hex_sha1(this.sid + this.appid + this.checksum)}_${this.blockCount}`;

        // 如果是视频资源 需要拿到本地文件地址fileInfo  如果是图片资源 需要拿到cdn图片地址query
        let checkPath = this.oParam === {} ? this.checkPath1 : this.checkPath;
        let param = {
            appid: this.appid,
            fileId: this.fileId,
            blockCount: this.blockCount,
            callback: this.checkFileCallback,
            callbackScope: this,
        };
        let param1 = { ...param, ...this.oParam };

        this.checkFile = new checkFile(this.file, this.uploadUrl + checkPath, param1);
        this.checkFile.runCheck();
    },
    checkFileCallback: function(file, msg, options) {
        const _this = this;
        if (!msg.success) {
            const error = {
                status: 50001,
                msg: '校验文件失败',
            };
            this.errorCallback(error, this.file);
            this.onError(error);
            this.onFinishedCallback();
            uploadLogger({
                name: 'PC_upload_fail<checkFile>',
                desc: 'checkFileCallback returned msg.successs is false',
            });

            return false;
        }
        if (this.type === 0 || this.type === 2) {
            // 视频资源和音频
            if (Number(msg.status.substring(0, 1)) === 1 && msg.fileUrl != null) {
                window.clearInterval(_this.ervalObject);
                _this.uploading = false;
                // _this.uploadProgressCallback('100%', this.file);
                _this.successCallback(msg.fileUrl, _this.file);
                _this.onFinishedCallback();

                return;
            } else if (Number(msg.status.substring(0, 1)) === 1 && msg.fileUrl == null) {
                this.ervalObject = setInterval(() => {
                    // 轮询本地文件url
                    _this.loopCount--;
                    if (_this.loopCount <= 0) {
                        // 轮询记数
                        window.clearInterval(_this.ervalObject);
                        // layer.msg('上传视频失败，请重新上传！');
                        const error = {
                            status: 50002,
                            msg: '文件上传失败',
                        };
                        this.errorCallback(error, this.file);
                        this.onError(error);
                        this.onFinishedCallback();
                        // 失败日志
                        uploadLogger({
                            name: 'PC_upload_fail<polling video finalUrl>',
                            desc: 'more than max polling count',
                        });

                        return;
                    }
                    let icheckFile = new checkFile(_this.file, _this.uploadUrl + _this.checkPath1, {
                        appid: _this.appid,
                        fileId: _this.fileId,
                        blockCount: _this.blockCount,
                        callback: _this.checkFileCallback,
                        callbackScope: _this,
                    });

                    icheckFile.runCheck();
                }, 1000);

                return;
            }
            // 本地上传没有完成,继续上传
            this.toUpload(msg);
        } else {
            // 图片资源
            if (Number(msg.status.substring(0, 1)) === 1) {
                // 文件本地上传已经成功，轮询直到查到cdn资源文件
                this.ervalObject = setInterval(() => {
                    _this.loopCount--;
                    if (_this.loopCount <= 0) {
                        // 轮询记数
                        window.clearInterval(_this.ervalObject);
                        // alert('上传失败，请重新上传！');
                        const error = {
                            status: 50002,
                            msg: '文件上传失败',
                        };
                        this.errorCallback(error, this.file);
                        this.onError(error);
                        this.onFinishedCallback();

                        // 失败日志
                        uploadLogger({
                            name: 'PC_upload_fail<polling picture finalUrl>',
                            desc: 'more then max polling count',
                        });

                        return;
                    }

                    const getRinfo = async () => {
                        try {
                            const resp = await jsonp(_this.rinfo, {
                                data: {
                                    rid: _this.oParam.bizId,
                                    sid: _this.sid,
                                    rtype: 3,
                                    rt: 'jsonp',
                                },
                            });

                            if (resp.data.status === 0 && resp.data.finalpath && resp.data.finalurl) {
                                window.clearInterval(_this.ervalObject);
                                const url = _this.imageServer + resp.data.finalurl.replace(/http[s]?:\/\//, '');

                                _this.uploading = false;
                                _this.successCallback(url, _this.file);
                                _this.uploadProgressCallback('100%', _this.file);
                                _this.onFinishedCallback();
                            }
                        } catch (e) {
                            console.error(e);
                            const error = {
                                status: 50003,
                                msg: '文件信息查询失败',
                            };
                            this.errorCallback(error, this.file);
                            this.onError(error);
                            this.onFinishedCallback();
                            // 失败日志
                            uploadLogger({
                                name: 'PC_upload_fail<polling picture finalurl>',
                                desc: e,
                            });
                            // throw e;
                        }
                    };

                    getRinfo();
                }, 800);

                return;
            }
            // 本地上传没有完成,继续上传
            this.toUpload(msg);
        }
    },
    toUpload: function(msg) {
        console.log('上传中...');
        // 本地上传没有完成,继续上传
        let reg = /[1]/g;

        this.fileStatus = msg.status.substr(1).split('');
        const options = {
            fileStatus: this.fileStatus,
            cutSize: this.limit,
            type: 'html5',
            fileId: this.fileId,
            appid: this.appid,
            fileName: this.fileName,
            blockCount: this.blockCount,
            // loadstartCallback: this.uploadLoadstartCallback.bind(this),
            loadCallback: this.uploadLoadCallback.bind(this),
            errorCallback: this.errorCallback.bind(this),
            progressCallback: this.uploadProgressCallback.bind(this),
            // abortCallback: this.uploadAbortCallback.bind(this),
            // loadendCallback: this.uploadLoadendCallback.bind(this),
        };

        // 图片需要bizId和successCb参数
        let newOption = {};

        if (this.type === 1) {
            newOption = {
                ...options,
                ...{
                    bizId: this.oParam.bizId,
                    successCb: this.oParam.successCb,
                },
            };
        } else {
            newOption = options;
        }
        // console.log(newOption);
        this.singleUpload = new singleUpload(this.file, this.uploadUrl + this.uploadPath, newOption);
        // if (msg.status.substr(1).match(reg) != null) {
        //     this.uploadProgressCallback(msg.status.substr(1).match(reg).length/_this.blockCount);
        // }
        this.singleUpload.xhr.abort = true;
        this.singleUpload.fileUpload();
    },
    uploadLoadCallback: function(file, msg) {
        // upload成功后 最后一次不要查 否则会出问题
        let reg = /0/g;

        if (!reg.test(msg.status)) {
            this.checkFileCallback(file, msg);

            return false;
        }
        this.fileId = `${hex_sha1(this.sid + this.appid + this.checksum)}_${this.blockCount}`;
        // 如果是视频资源 需要拿到本地文件地址  如果是图片资源 需要拿到cdn图片地址
        let checkPath = this.oParam === {} ? this.checkPath1 : this.checkPath;
        const param = {
            appid: this.appid,
            fileId: this.fileId,
            blockCount: this.blockCount,
            callback: this.checkFileCallback,
            callbackScope: this,
        };
        let param1 = { ...param, ...this.oParam };

        this.checkFile = new checkFile(this.file, this.uploadUrl + checkPath, param1);
        this.checkFile.runCheck();
    },
    uploadProgressCallback: function(percentage, file) {
        // 默认上传过程中回调函数

        console.log(percentage);
    },
    successCallback: (url, file) => {
        this.uploading = false;
        if (!url) return;
        window.clearInterval(this.ervalObject);
        console.log('上传成功');
        // 上传的是图片,显示图片预览
    },
    onBeforeUpload: function(file) {},
    errorCallback: function(errors, file) {
        console.log(errors);
    },
    onError: function(errors) {
        throw errors;
    },
    onFinishedCallback: function() {},
    abortUpload: function(callback) {
        if (this.uploading && this.singleUpload) {
            console.log('取消');
            this.singleUpload.xhr.abort = false;
            this.singleUpload.abortUpload();
        }
        if (this.ervalObject) window.clearInterval(this.ervalObject);

        if (callback) callback();
    },
};
/* eslint-enable */

// export const resumeUpload = (files, options) => {
//     console.log('开始上传流程');

//     let index = -1;

//     for (let i = 0; i < files.length; i++) {
//         index++;
//         options.index = index;
//         const file = files[i];

//         // console.log( ResumeUpload(file, options));
//         /* eslint-disable */
//         return new ResumeUpload(file, options);
//     }
// };
