import { ResumeUpload } from './resumeUpload';

const uploader = (files, options) => {
    console.log('开始上传流程');

    let index = -1;

    for (let i = 0; i < files.length; i++) {
        index++;
        options.index = index;
        const file = files[i];

        // console.log( ResumeUpload(file, options));
        return new ResumeUpload(file, options);
    }
};

export default uploader;
