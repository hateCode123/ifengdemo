/* eslint-disable */
import hex_sha1 from '../src/sha.js';
import uploadLogger from '../src/uploadLogger.js';
// 为了打印生成文件id消耗的时间而声明的变量。
let startTime = {};
let endTime = {};

/**
 * 根据文件生成id
 * @param  {File}     file     文件对象
 * @param  {Object}   options  扩展参数以下为options项--------
 * @param  {Number}   begin    文件截取起始位置，默认为0
 * @param  {Number}   cutsize  文件截取尺寸，默认为512*1024
 * @param  {Function} callback 回调函数，用于送出计算出来的id，默认为空，起始那就没意义了
 * @param  {Object}   callbackScope    回调函数的作用域，默认为window
 */
const CreatFileId = function(file, options) {
    this.file = file;
    this.begin = options.begin || 0;
    this.cutsize = options.cutsize || 512 * 1024;
    this.callback = options.callback || function() {};
    this.callbackScope = options.callbackScope || window;
};

CreatFileId.prototype = {
    /**
     * 生成一个文件id
     * @param  {Number} customBegin   自定义文件截取起始位置
     * @param  {Number} customCutsize 自定义文件截取长度
     */
    creat: function(customBegin, customCutsize) {
        // 存储开始创建id的时间
        startTime[this.file.name] = new Date().valueOf();

        var begin = customBegin || this.begin;
        var end = this.getEnd(begin, customCutsize);
        var blob = this.getBlob(begin, end);
        var iReader = new FileReader();
        if (!iReader.readAsBinaryString) {
            uploadLogger({
                name: 'PC_upload_fail<browser is too old when use function creatFileId>',
                desc: window.navigator.userAgent + 'readAsBinarayString is illegal',
            });
            return;
        }

        iReader.readAsBinaryString(blob);
        iReader.onload = e => {
            this.iReaderLoad(e);
        };
    },

    /**
     * 获取文件截取结束位置
     * @param  {Number} begin         文件截取起始位置
     * @param  {Number} customCutsize 自定义文件截取长度
     * @return {Numver}               文件截取结束位置
     */
    getEnd: function(begin, customCutsize) {
        var size = this.file.size;
        var cutsize = customCutsize || this.cutsize;
        return size < begin + cutsize ? size : begin + cutsize;
    },

    /**
     * 获取截取的文件
     * @param  {Number} begin 文件截取起始位置
     * @param  {Number} end   文件截取结束位置
     * @return {Object}       截取的结果
     */
    getBlob: function(begin, end) {
        var file = this.file;
        return file.slice
            ? file.slice(begin, end)
            : file.webkitSlice
                ? file.webkitSlice(begin, end)
                : file.mozSlice(begin, end);
    },

    //文件使用readAsBinaryString读取后的回调
    iReaderLoad: function(e) {
        var fileId = hex_sha1(e.target.result + this.toByte(this.file.size));
        // 打印创建出id的结束时间
        endTime[this.file.name] = new Date().valueOf();
        console.log(this.file.name, endTime[this.file.name] - startTime[this.file.name]);
        //这里将fileId传到外部回调中，并触发外面的回调
        this.callback.call(this.callbackScope, fileId);
    },

    //对数字进行转换的函数，具体转换啥了的问问陈勇
    toByte: function(origin) {
        var n = Number(origin);
        var n0 = 0;
        var n1 = 0;
        var n2 = 0;
        var n3 = 0;
        var n4 = (n >> 24) & 0xff;
        var n5 = (n >> 16) & 0xff;
        var n6 = (n >> 8) & 0xff;
        var n7 = (n >> 0) & 0xff;
        n4 = this.toSignInt(n4);
        n5 = this.toSignInt(n5);
        n6 = this.toSignInt(n6);
        n7 = this.toSignInt(n7);

        var ascString =
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

    //对数字进行转换的函数，具体转换啥了的问问陈勇
    toSignInt: function(num) {
        if (num > 127) {
            num = num - 128 * 2;
        }

        return num;
    },
};

export default CreatFileId;
