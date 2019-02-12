import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import UploadBox from './uploadBox';
import Uploader from './uploader';
import Upload from './uploader/upload';

class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {};

    abortUpload() {
        console.log('停止');
    }

    render() {
        const config = {
            type: 1, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            onBeforeUpload: file => {
                console.log('上传之前');
            },
            progressCallback: (percentage, file) => {
                console.log(percentage);
            },
            successCallback: (url, file) => {
                console.log('上传完成');
                console.log(url);
            },
            errorCallback: errors => {
                console.log(errors);
            },
        };

        return (
            <React.Fragment>
                <div className={styles.box}>
                    <UploadBox />
                    <div style={{ width: '100px', height: '100px' }}>
                        <Uploader className={styles.uploader} config={config} />
                    </div>
                    <Uploader config={config}>
                        <div className={styles.children} style={{ width: '100px', height: '100px' }} />
                    </Uploader>
                    <button
                        onClick={() =>
                            Upload.start({
                                type: 0, // 0 视频 1 图片 2 普通文件
                                appid: 'wemedia',
                                onBeforeUpload: file => {
                                    console.log('上传之前');
                                },
                                progressCallback: (percentage, file) => {
                                    console.log(percentage);
                                },
                                successCallback: (url, file) => {
                                    console.log('上传完成');
                                    console.log(url);
                                },
                                errorCallback: errors => {
                                    console.log(errors);
                                },
                                abortUpload: () => {
                                    console.log('停止');
                                },
                            })
                        }>
                        上传
                    </button>
                    <button
                        onClick={() => {
                            Upload.stop();
                        }}>
                        停止
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
