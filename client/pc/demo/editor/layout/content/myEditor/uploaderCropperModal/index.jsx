import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './index.css';

/**
 * for this page
 */
import Modal from '../../../../../dialog/layout/content/modal/index';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import uploader from '../../../../../upload/layout/content/uploader/src/index';

class UploaderCropperModal extends React.PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool,
        img: PropTypes.string,
        onClose: PropTypes.func,
        getNewPic: PropTypes.func,
        beforeUpload: PropTypes.func,
        errorCallback: PropTypes.func,
        index: PropTypes.string,
    };

    // UNSAFE_componentWillMount() {
    //     this.setState({ src: this.props.img });
    // }
    cropper = this.refs.cropper;
    state = {
        isOpen: this.props.isOpen,
        src: this.props.img,
    };

    static defaultProps = {
        isOpen: false,
        // img:
        //     'http://d.ifengimg.com/w650_h400/p0.ifengimg.com/pmop/2018/1112/0E7C8C4F04B4C0E8C776BEB4D9C5243420BDAD78_size29_w540_h350.jpeg',
    };

    static getDerivedStateFromProps(props, state) {
        let resSrc = {};
        let resIsOpen = {};

        if (props.img !== state.resSrc) {
            resSrc = {
                src: props.img,
            };
        }
        if (props.isOpen !== state.isOpen) {
            resIsOpen = {
                isOpen: props.isOpen,
            };
        }

        return { ...resSrc, ...resIsOpen };
    }

    componentDidMount() {
        this.setState({
            src: this.props.img,
        });
    }

    handleClose() {
        this.props.onClose();
    }

    // 切换默认比例
    handleChangeAspectRatio(type) {
        console.log(type);

        if (type === 1 && this.state.type !== type) {
            this.setState({
                type: 1,
                aspectRatio: 2 / 1,
            });
        } else if (type === 2 && this.state.type !== type) {
            this.setState({
                type: 2,
                aspectRatio: 4 / 3,
            });
        } else if (this.state.type === type) {
            this.setState({
                type: 0,
                aspectRatio: NaN,
            });
        }
    }

    comfirmCropperPic() {
        const { img, index } = this.props;
        const dataUrl = this.refs.cropper
            .getCroppedCanvas({
                imageSmoothingQuality: 'high',
            })
            .toDataURL();
        const filename = img.slice(img.lastIndexOf('/') + 1);
        const file = this.dataURLtoFile(dataUrl, filename);

        // console.log(file);
        const options = {
            type: 1, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            onBeforeUpload: file => {
                // console.log('开始上传啦');
                this.props.beforeUpload(dataUrl, index, file);
            },
            progressCallback: (percentage, file) => {},
            successCallback: (url, file) => {
                // console.log(url);
                this.props.getNewPic(url, index, file);
            },
            errorCallback: errors => {
                this.props.errorCallback(errors, index);
            },
        };

        uploader(file, options);
    }
    // 转化dataURL为file对象
    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(',');

        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    handleCancel() {
        this.props.onClose();
    }

    render() {
        const { type, aspectRatio } = this.state;

        /**
         * 组件分发数据
         */
        // console.log(this.props);
        const cropperContent = (
            <Fragment>
                <div className={`${styles.cropperContent} clearfix`}>
                    <div className={styles.cropperWrapper}>
                        <Cropper
                            src={this.state.src}
                            // className="company-logo-cropper"
                            style={{ height: 450, width: 450 }}
                            ref={'cropper'}
                            // Cropper.js options
                            // zoomable={true}
                            aspectRatio={aspectRatio}
                            guides={false}
                            viewMode={1}
                            dragMode={'move'}
                            cropBoxMovable={true}
                            cropBoxResizable={true}
                            preview="#preView"
                            // movable={true}
                        />
                    </div>
                    <div className={styles.preViewWrapper}>
                        <div
                            className={`${styles.type1} ${type === 1 ? styles.active : ''}`}
                            onClick={this.handleChangeAspectRatio.bind(this, 1)}>
                            <div className={styles.preView1} id="preView" />
                            <p>2 : 1</p>
                        </div>
                        <div
                            className={`${styles.type2} ${type === 2 ? styles.active : ''}`}
                            onClick={this.handleChangeAspectRatio.bind(this, 2)}>
                            <div className={styles.preView2} id="preView" />
                            <p>4 : 3</p>
                        </div>
                        <div className={styles.txt}>裁剪后预览</div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={`${styles.btnWrapper} clearfix`}>
                        <div className={styles.okBtn} onClick={this.comfirmCropperPic.bind(this)}>
                            确定
                        </div>
                        <div className={styles.cancelBtn} onClick={this.handleCancel.bind(this)}>
                            取消
                        </div>
                    </div>
                </div>
            </Fragment>
        );

        return (
            <Fragment>
                <div className={styles.UploaderCropperModal}>
                    <Modal
                        isOpen={this.state.isOpen}
                        title={'裁剪封面'}
                        modalWith={800}
                        onClose={this.handleClose.bind(this)}
                        footer={false}>
                        {cropperContent}
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(UploaderCropperModal);
