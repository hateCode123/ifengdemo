import checkFile from './checkFile';
import hex_sha1 from './sha';
import { cookie, ajax, jsonp } from '@ifeng/ui_base';
import CreatFileId from './creatFileId';
import singleUpload from './singleUpload';
import uploadLogger from './uploadLogger';
/**
 * 参数       类型        名称                      默认值       是否必须
 * @param  {Object}     options
 * @param  {Number}     options.type              0           否        资源类型  0视频 1图片
 * @param  {String}     options.appid             'wemedia'   否        标记上传渠道
 * @param  {Function}   options.onBeforeUpload                否        上传之前操作回调函数
 * @param  {Function}   options.successCallback               否        上传成功回调
 * @param  {Function}   options.errorCallback                 否        上传失败回调函数
 * @param  {Function}   options.progressCallback              否        上传过程中回调函数
 * @param  {Boolean}    options.showBase64        false       否        上传过程是否显示base64Url
 */
class ResumeUpload {
    constructor(file, options) {
        this.checkPath = 'query'; // 不需要本地文件验证文件地址
        this.checkPath1 = 'fileInfo'; // 需要本地文件验证文件地址
        this.uploadPath = 'upload'; // 上传文件地址
        this.uploadUrl = 'http://transmission.ifeng.com/'; // 上传视频和音频
        this.imageServer = 'http://d.ifengimg.com/q100/'; // 上传图片的cdn地址
        this.rinfo = 'http://ugc.ifeng.com/index.php/user/info'; // 查询用户信息
        this.getid = 'http://ugc.ifeng.com/index.php/user/getid'; // 获取rid
        this.fileId = ''; // fileId文件唯一标识
        this.fileStatus = {}; // 上传文件的状态
        this.limit = 2 * 1024 * 1024; // 2m
        this.xhr = new XMLHttpRequest();
        const isExternal = /external/gi.test(window.location.pathname);

        this.sid = isExternal ? cookie.get('fhhmgrimgsid') : cookie.get('sid');
        this.ugcCallback = null;
        this.rid = '';
        // this.element = ele;
        this.loopCount = 20;
        this.ervalObject = null;

        options = options || {};
        this.type = options.type || 0; // 0 视频 1 图片 2 音频
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
        this.abortUploadCb = options.abortUpload || this.emptyFn;
        this.init(file);
    }
    // 初始化
    init(file) {
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
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = e => {
                console.log(this.result);
                this.file.base64Url = this.result;
                this.getUgcTaskInfo(this.type, this.startCreate.bind(this));
            };

            return;
        }
        this.getUgcTaskInfo(this.type, this.startCreate.bind(this));
    }
    // 校验文件的大小与格式
    checkFileSizeAndType(file, type) {
        // 工具函数，判断某项是否在数组内
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
            const suffix1 = [
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
            const suffix2 = ['mp3', 'wav', 'wma', 'ogg'];
            const suffix = type === 0 ? suffix1 : suffix2;
            const pos = this.fileName.lastIndexOf('.');
            const lastName = this.fileName.substring(pos + 1).toLowerCase();

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
                // 大于1g推荐使用客户端的处理
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
            const suffix = ['webp', 'jpg', 'jpeg', 'png', 'gif'];
            const pos = this.fileName.lastIndexOf('.');
            const lastName = this.fileName.substring(pos + 1).toLowerCase();

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
    }
    // 上传图片 获取ugs任务信息
    async getUgcTaskInfo(type, callback) {
        if (type === 0 || type === 2 || type === 3) {
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

                    callback(param);
                } else {
                    alert(res.message);
                }
            } catch (error) {
                throw error;
            }
        }
    }
    // 开始上传流程
    startCreate(param) {
        this.oParam = param;
        this.creatChecksum = new CreatFileId(this.file, {
            callback: this.creatFileIdCallback,
            callbackScope: this,
        });
        this.creatChecksum.creat();
        this.onBeforeUpload(this.file); // 上传之前回调, 需要考虑这个回调放在这里是否合理
    }
    // 创建fileId
    creatFileIdCallback(checksum) {
        this.checksum = checksum;
        // 创建一个fileId都这么麻烦
        this.fileId = `${hex_sha1(this.sid + this.appid + this.checksum)}_${this.blockCount}`;

        // 如果是视频资源 需要拿到本地文件地址(checkPath1)fileInfo  如果是图片资源 需要拿到cdn图片地址(checkPath)query
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
    }
    // 校验文件的回调
    checkFileCallback(file, msg, options) {
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
                window.clearInterval(this.ervalObject);
                this.uploading = false;
                this.uploadProgressCallback('100%', this.file);
                this.successCallback(msg.fileUrl, this.file);
                this.onFinishedCallback();

                return;
            } else if (Number(msg.status.substring(0, 1)) === 1 && msg.fileUrl == null) {
                this.ervalObject = setInterval(() => {
                    // 轮询本地文件url
                    this.loopCount--;
                    if (this.loopCount <= 0) {
                        // 轮询记数
                        window.clearInterval(this.ervalObject);
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
                    let icheckFile = new checkFile(this.file, this.uploadUrl + this.checkPath1, {
                        appid: this.appid,
                        fileId: this.fileId,
                        blockCount: this.blockCount,
                        callback: this.checkFileCallback,
                        callbackScope: this,
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
                    this.loopCount--;
                    if (this.loopCount <= 0) {
                        // 轮询记数
                        window.clearInterval(this.ervalObject);
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
                            const resp = await jsonp(this.rinfo, {
                                data: {
                                    rid: this.oParam.bizId,
                                    sid: this.sid,
                                    rtype: 3,
                                    rt: 'jsonp',
                                },
                            });

                            if (resp.data.status === 0 && resp.data.finalpath && resp.data.finalurl) {
                                window.clearInterval(this.ervalObject);
                                const url = this.imageServer + resp.data.finalurl.replace(/http[s]?:\/\//, '');

                                this.uploading = false;
                                this.successCallback(url, this.file);
                                this.uploadProgressCallback('100%', this.file);
                                this.onFinishedCallback();
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
    }
    toUpload(msg) {
        console.log('上传中...');
        // 本地上传没有完成,继续上传
        let reg = /[1]/g;

        this.fileStatus = msg.status.substr(1).split(''); // 截掉第一位并转化为数组
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
    }
    uploadLoadCallback(file, msg) {
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
    }
    uploadProgressCallback(percentage, file) {
        // 默认上传过程中回调函数

        console.log(percentage);
    }
    successCallback(url, file) {
        this.uploading = false;
        if (!url) return;
        window.clearInterval(this.ervalObject);
        console.log('上传成功');
        // 上传的是图片,显示图片预览
    }
    onBeforeUpload(file) {}
    errorCallback(errors, file) {
        console.log(errors);
    }
    onError(errors) {
        console.log(errors);
    }
    onFinishedCallback() {}
    abortUpload(callback) {
        if (this.uploading && this.singleUpload) {
            console.log('终止上传');
            this.singleUpload.xhr.abort = false;
            this.singleUpload.abortUpload();
        }
        if (this.ervalObject) window.clearInterval(this.ervalObject);
        // 终止上传后的各种回调
        if (callback) {
            callback();
        } else if (this.abortUploadCb) {
            this.abortUploadCb();
        }
        this.onFinishedCallback();
    }
    emptyFn() {
        return true;
    }
}

export default ResumeUpload;
