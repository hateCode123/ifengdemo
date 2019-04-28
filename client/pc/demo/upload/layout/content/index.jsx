import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import UploadBox from './uploadBox';
import Uploader from './uploader';
import UploadNormal from './uploader/upload';
import UploadContinue from './uploader/src/index';

class ImgWrapper extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    state = {
        content: this.props.content,
    };
    componentDidMount() {}

    static getDerivedStateFromProps = (props, state) => {
        let resImgs = {};

        if (props.content !== state.content) {
            resImgs = {
                content: props.content,
            };
        }

        return {
            ...resImgs,
        };
    };

    componentWillUnmount() {}

    render() {
        const { content } = this.state;

        return content.map((item, index) => {
            return (
                <div key={index} className={styles.preView}>
                    <img src={item} alt="" />
                </div>
            );
        });
    }
}

class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {
        uploadPercent: 0,
        file: '',
        imgs: [],
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
            type: 3, // 0 视频 1 图片 2 音频文件 3 其他文件
            appid: 'upLoadFlash',
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
            successCallback: this.successCallback,
            errorCallback: errors => {
                console.log(errors);
            },
        };

        UploadNormal.start(options);
    };
    successCallback = url => {
        const { imgs } = this.state;
        const newImgs = imgs;

        newImgs.push(url);
        console.log(newImgs);
        this.setState({
            imgs: JSON.parse(JSON.stringify(newImgs)),
        });
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
        const { imgs } = this.state;

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
                            multiple="multiple"
                        />
                    </div>
                    {/* <div style={{ marginTop: '50px' }}>
                        <button onClick={this.multipleUpload.bind(this)}>上传</button>
                    </div> */}

                    {/* <input type="file" name="" id="" multiple onChange={this.multipleUpload} /> */}
                    <button onClick={this.multipleUpload}>按钮</button>
                    <div className={'clearfix'} style={{ marginTop: '50px' }}>
                        {imgs.length > 0 ? <ImgWrapper content={imgs} /> : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
