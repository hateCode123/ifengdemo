import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import SparkMD5 from 'spark-md5';
import { request } from 'https';
// import { request } from '../../../utils/request';
// import { Upload } from './uploadJS';
import Upload from './uploadJS/resumeUpload';
/**
 * for this page
 */

class UplodBox extends React.PureComponent {
    state = {
        selectedImageFile: '',
        src: '',
        errorTipShow: false,
        errorMsg: '',
        uploaded: false,
        uploading: false,
        uploadPercent: 0,
    };

    static propTypes = {
        type: PropTypes.number,
        onChange: PropTypes.func,
    };

    handleFileChange = e => {
        const file = e.target.files[0];

        console.log(file);

        if (file) {
            const MAX_FILE_SIZE = 52428800;
            // const MAX_FILE_SIZE = 20000

            if (file.size <= MAX_FILE_SIZE) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);

                let img = '';

                fileReader.onload = e => {
                    img = e.target.result;
                    this.setState(
                        {
                            selectedImageFile: file,
                            src: img,
                        },
                        () => {
                            this.preview(this.state.src);
                            this.onChangeHandle();
                            // this.errorTip('上传失败');
                        },
                    );
                };
            } else {
                console.error('文件过大');
                this.errorTip('文件过大');
            }
        }

        e.target.value = '';
    };

    _handleFileChange = e => {
        const files = e.target.files;

        if (files) {
            // Upload(
            //     files,
            //     {
            //         type: 1, // 0 视频 1 图片
            //         appid: 'wemedia',
            //         onBeforeUpload: () => {
            //             console.log('上传之前');
            //         },
            //         successCallback: () => {
            //             console.log('上传完成');
            //         },
            //     },
            //     this,
            // );
            let index = -1;

            const options = {
                type: 1, // 0 视频 1 图片
                appid: 'wemedia',
                onBeforeUpload: () => {
                    console.log('上传之前');
                },
                successCallback: () => {
                    console.log('上传完成');
                },
            };

            for (let i = 0; i < files.length; i++) {
                index++;
                options.index = index;
                const file = files[i];

                console.log(111);
                // console.log( ResumeUpload(file, options));

                Upload(file, options);
            }
        } else {
            return;
        }
    };

    preview = src => {
        // console.log(src);
        this.refs.uploader.style.background = `url(${src}) no-repeat center center`;
        this.refs.uploader.style.backgroundSize = '120px 120px';
    };

    errorTip = error => {
        if (error) {
            this.setState({
                errorTipShow: true,
                errorMsg: error,
            });
        }
    };

    onChangeHandle = src => {
        const { onChange } = this.props;

        if (onChange) {
            // const formValue = epimg;
            // onChange(formValue);
        }
    };

    stopDefault = e => {
        if (e & e.preventDefault) {
            e.preventDefault();
        }
    };

    render() {
        // console.log(this.props);
        const { type } = this.props;

        /**
         * 组件分发数据
         */

        return (
            <Fragment>
                <div className={`${style.big_tx} clearfix`}>
                    <div className={style.uploadWrap}>
                        <div ref="uploader" className={style.uploadContainer}>
                            <input
                                type="file"
                                ref="upload"
                                // accept="image/jpeg,image/jpg,image/png"
                                onChange={this._handleFileChange.bind(this)}
                                title="选择文件"
                            />
                        </div>
                    </div>
                    {/* {tip(type)} */}
                    {/* {document.write(this.state.uploadParams)} */}
                    <div className="clearfix">
                        <div className={style.uploadPercentWrap}>
                            <div
                                className={style.uploadPercentInner}
                                style={{ width: `${this.state.uploadPercent}%` }}
                            />
                        </div>
                        {`${this.state.uploadPercent}%`}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(UplodBox);
