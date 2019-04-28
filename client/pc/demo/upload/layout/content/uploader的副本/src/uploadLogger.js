/**
 * 上传失败日志
 * @param {Object} params
 * @param {String} params 日志名
 * @param {String} params 日志内容
 * @param {String} params 文件id
 */

const uploadLogger = params => {
    let LOGURL = '/api/upload/error';
    let name = params.name;
    let desc = params.desc;
    let fileId = params.fileId || '';
    let runTime = new Date();

    new Error(params);

    // $.ajax({
    //     type: 'POST',
    //     url: LOGURL,
    //     data: { name: name, desc: desc, runTime: runTime, fileId: fileId },
    //     success: function() {},
    // });
};

export default uploadLogger;
