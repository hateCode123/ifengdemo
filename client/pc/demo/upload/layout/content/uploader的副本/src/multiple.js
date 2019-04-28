import ResumeUpload from './resumeUpload';

// 多文件上传
const uploader = (files, options) => {
    let index = -1;

    for (let i = 0; i < files.length; i++) {
        index++;
        options.index = index;
        const file = files[i];

        new ResumeUpload(file, options);
    }
};

export default uploader;
