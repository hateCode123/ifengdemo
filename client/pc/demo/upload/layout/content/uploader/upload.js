import React from 'react';
import ReactDOM from 'react-dom';
import uploader from './src';
import multileUploader from './src/multiple';
const creatUpload = props => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const onFinished = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        window.ResumeUpload = null;
    };

    // 单文件上传
    const handleFileChange = e => {
        const files = e.target.files;
        const config = props;

        if (files) {
            const options = {
                type: config.type,
                appid: config.appid,
                checkFileSizeAndType: config.checkFileSizeAndType,
                onBeforeUpload: config.onBeforeUpload,
                progressCallback: config.progressCallback,
                successCallback: config.successCallback,
                errorCallback: errors => {
                    config.errorCallback(errors);
                },
                removeUpload: onFinished,
                abortUpload: config.abortUpload,
            };

            uploader(files, options);
        } else {
            return;
        }
    };

    // 多文件上传
    const handleMultipleFileChange = e => {
        const files = e.target.files;
        const config = props;

        if (props.getFileList) {
            let index = -1;
            let fileList = [];

            for (let i = 0; i < files.length; i++) {
                index++;
                let item = {};
                const file = files[i];
                const iFileReader = new FileReader();

                iFileReader.readAsDataURL(file);
                iFileReader.onload = e => {
                    item['src'] = e.target.result;
                };
                item['file'] = file;
                item['index'] = index;
                item['id'] = `uploading_${index}_${new Date().getTime()}`;
                fileList.push(item);
            }
            props.getFileList(fileList);
        }
        if (files) {
            const options = {
                type: config.type,
                appid: config.appid,
                filesList: files,
                checkFileSizeAndType: config.checkFileSizeAndType,
                onBeforeUpload: config.onBeforeUpload,
                progressCallback: config.progressCallback,
                successCallback: config.successCallback,
                errorCallback: errors => {
                    config.errorCallback(errors);
                },
            };

            multileUploader(files, options);
        } else {
            return;
        }
    };

    // 限制文件类型
    const initAccept = type => {
        let accept = '';

        switch (type) {
            case 0:
                accept = 'video/*';
                break;
            case 1:
                accept = 'image/*';
                break;
            case 2:
                accept = 'audio/*';
                break;
            case 3:
                accept = '';
                break;

            default:
                break;
        }

        return accept;
    };

    const id = `upload_input_${new Date().getTime()}`; // 给input标签生成唯一标识id
    const accept = initAccept(Number(props.type));

    if (props.multiple) {
        ReactDOM.render(
            /* eslint-disable */
            <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
                <input
                    type="file"
                    id={id}
                    onChange={handleMultipleFileChange}
                    title="选择文件"
                    style={{ display: 'none' }}
                    multiple
                    accept={initAccept(props.type)}
                />
            </div>,
            /* eslint-enable */
            div,
        );
    } else {
        ReactDOM.render(
            /* eslint-disable */
            <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
                <input
                    type="file"
                    id={id}
                    onChange={handleFileChange}
                    title="选择文件"
                    style={{ display: 'none' }}
                    accept={accept}
                />
            </div>,
            /* eslint-enable */
            div,
        );
    }

    document.getElementById(id).click();
};

const Upload = {};

Upload.start = props =>
    creatUpload({
        ...props,
    });
Upload.stop = () => {
    if (window.ResumeUpload) {
        window.ResumeUpload.abortUpload();
    } else {
        return;
    }
};

export default Upload;
