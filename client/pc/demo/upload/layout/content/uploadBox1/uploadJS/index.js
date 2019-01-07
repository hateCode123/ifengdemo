import singleUpload from './singleUpload';
import resumeUpload from './resumeUpload';
/**
 * 参数       类型        名称                       默认值       是否必须
 * @param  {Object}     options
 * @param  {Number}     options.type                 0            否        资源类型  0视频 1图片
 * @param  {String}     options.appid                'wemedia'    否        标记上传渠道
 * @param  {Function}   options.onBeforeUpload                    否        上传之前操作回调函数
 * @param  {Function}   options.successCallback                   否        上传成功回调
 * @param  {Function}   options.errorCallback                     否        上传失败回调函数
 * @param  {Function}   options.progressCallback                  否        上传过程中回调函数
 * @param  {Boolean}    options.showBase64           false        否        上传过程是否显示base64Url
 */
export const Upload = (files, options, that) => {
    console.log('上传');
    /* eslint-disable */
    let _this = this;
    /* eslint-enable */
    let index = -1;

    console.log(that);

    for (let i = 0; i < files.length; i++) {
        index++;
        options.index = index;
        const file = files[i];

        console.log(111);
        // console.log( ResumeUpload(file, options));

        return resumeUpload(file, options);
    }
};
