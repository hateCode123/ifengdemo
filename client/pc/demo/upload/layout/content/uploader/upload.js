import React from 'react';
import ReactDOM from 'react-dom';
import uploader from './src';

const creatUpload = props => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const onFinished = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    };

    const handleFileChange = e => {
        const files = e.target.files;
        const config = props;

        console.log(files);

        if (files) {
            const options = {
                type: config.type,
                appid: config.appid,
                onBeforeUpload: config.onBeforeUpload,
                progressCallback: config.progressCallback,
                successCallback: config.successCallback,
                errorCallback: config.errorCallback,
                removeUpload: onFinished,
            };

            uploader(files, options);
        } else {
            return;
        }
    };

    ReactDOM.render(
        /* eslint-disable */
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
            <input
                type="file"
                id="upload_input"
                onChange={handleFileChange}
                title="选择文件"
                style={{ display: 'none' }}
            />
        </div>,
        /* eslint-enable */
        div,
    );

    document.getElementById('upload_input').click();
};

const Upload = {};

Upload.start = props =>
    creatUpload({
        ...props,
    });
export default Upload;
