import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import UploadBox from './uploadBox';
import Uploader from './uploader';
import UploadNormal from './uploader/upload';
import UploadContinue from './uploader/src/index';

class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {
        uploadPercent: 0,
        file: '',
    };
    // 开始上传
    startUpload() {
        UploadNormal.start({
            type: 0, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            onBeforeUpload: file => {
                console.log('上传之前');
                this.setState({
                    file,
                });
            },
            progressCallback: (percentage, file) => {
                console.log(percentage);
                this.setState({
                    uploadPercent: percentage,
                });
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
        });
    }
    // 继续上传
    continueUpload() {
        const { file } = this.state;
        const options = {
            type: 0, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            onBeforeUpload: file => {
                // console.log('开始上传啦');
            },
            progressCallback: (percentage, file) => {
                this.setState({
                    uploadPercent: percentage,
                });
            },
            successCallback: (url, file) => {
                // console.log(url);
            },
            errorCallback: errors => {},
        };

        UploadContinue(file, options);
    }
    // 停止上传
    abortUpload() {
        console.log('停止');
    }

    // 自定义上传
    handleCustomUpload(e) {
        const file = e.target.files;

        console.dir(file);
    }

    // 多文件上传
    multipleUpload = e => {
        const options = {
            type: 1, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            multiple: true,
            onBeforeUpload: (file, index) => {
                console.log('上传之前');
                this.setState({
                    file,
                });
                console.log(index);
            },
            progressCallback: (percentage, file) => {
                console.log(percentage);
                this.setState({
                    uploadPercent: percentage,
                });
            },
            successCallback: (url, file) => {
                console.log('上传完成');
                console.log(url);
            },
            errorCallback: errors => {
                console.log(errors);
            },
        };

        UploadNormal.start(options);
    };

    render() {
        const config = {
            type: 0, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            showBase64: true,
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
                    {/* <UploadBox /> */}
                    <Uploader config={config}>
                        <div className={styles.children} style={{ width: '100px', height: '100px' }} />
                    </Uploader>
                    <div style={{ marginTop: '50px' }}>
                        <button onClick={this.startUpload.bind(this)}>上传</button>
                        <button
                            onClick={() => {
                                UploadNormal.stop();
                            }}>
                            停止
                        </button>
                        <button onClick={this.continueUpload.bind(this)}>继续</button>

                        <div className="clearfix">
                            <div className={styles.uploadPercentWrap}>
                                <div
                                    className={styles.uploadPercentInner}
                                    style={{ width: `${this.state.uploadPercent}` }}
                                />
                            </div>
                            {`${this.state.uploadPercent}`}
                        </div>
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <input
                            type="file"
                            name=""
                            id=""
                            onChange={this.handleCustomUpload.bind(this)}
                            // multiple="multiple"
                        />
                    </div>
                    {/* <div style={{ marginTop: '50px' }}>
                        <button onClick={this.multipleUpload.bind(this)}>上传</button>
                    </div> */}

                    {/* <input type="file" name="" id="" multiple onChange={this.multipleUpload} /> */}
                    <button onClick={this.multipleUpload}>按钮</button>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
