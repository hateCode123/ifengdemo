import ResumeUpload from './resumeUpload';

const uploader = (files, options) => {
    console.log('开始上传流程');

    if (FileList.prototype.isPrototypeOf(files)) {
        let index = -1;

        for (let i = 0; i < files.length; i++) {
            index++;
            options.index = index;
            const file = files[i];
            // console.log(new ResumeUpload(file, options));
            const upload = new ResumeUpload(file, options);

            window.ResumeUpload = upload;

            return upload;
        }
    } else { // 如果是单文件对象
        const upload = new ResumeUpload(files, options);

        window.ResumeUpload = upload;

        return upload;
    }
};

export default uploader;
