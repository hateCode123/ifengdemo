import React from 'react';
import ReactDOM from 'react-dom';
import uploader from './src';
const creatUpload = props => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const onFinished = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        window.ResumeUpload = null;
    };

    // console.dir(singleUpload);

    const handleFileChange = e => {
        const files = e.target.files;
        const config = props;

        // console.dir(uploader);

        // console.log(files);

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
                    onChange={handleFileChange}
                    title="选择文件"
                    style={{ display: 'none' }}
                    multiple="multiple"
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
