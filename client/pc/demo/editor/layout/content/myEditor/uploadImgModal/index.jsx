import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './index.css';

/**
 * for this page
 */
import Modal from '../../../../../dialog/layout/content/modal/index';
import 'cropperjs/dist/cropper.css';
import uploader from '../../../../../upload/layout/content/uploader/upload';
import { getImage } from '../../../../../../utils/cutImg';
import Sortable from 'react-sortablejs';

class UploadImgModal extends React.PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    state = {
        isOpen: this.props.isOpen,
        uploadingImgs: new Array(),
    };

    static defaultProps = {
        isOpen: false,
    };

    static getDerivedStateFromProps(props, state) {
        let resOpen = {};

        if (props.isOpen !== state.isOpen) {
            resOpen = { isOpen: props.isOpen };
        }

        return {
            ...resOpen,
        };
    }

    componentDidMount() {}

    handleUploadImg = () => {
        const options = {
            type: 1, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            multiple: true,
            getFileList: this.getFileList,
            onBeforeUpload: this.onBeforeUpload,
            progressCallback: this.progressCallback,
            successCallback: this.successCallback,
            errorCallback: this.errorCallback,
        };

        uploader.start(options);
    };

    fileListIds = {};
    fileListUrls = {};
    // 获取文件列表
    getFileList = fileList => {
        // console.log(fileList);
        this.fileListIds = {};
        const imgs = fileList;

        imgs.forEach((item, index) => {
            item['isUploading'] = false;

            this.fileListIds[item.index] = item.id;
        });

        // console.log(imgs);

        this.setState({
            uploadingImgs: [...this.state.uploadingImgs, ...imgs],
        });
    };
    // 上传之前
    onBeforeUpload = (file, index) => {
        console.log('上传之前');
        this.setState({
            file,
        });
        // console.log(index, '===========', file);
    };
    progressCallback = (percentage, file, index) => {
        // console.log(percentage);
        this.setState({
            uploadPercent: percentage,
        });
    };
    // 上传成功
    successCallback = (url, file, index) => {
        console.log('上传完成');
        // console.log(index, '========', url);
        const thisImg = document.getElementById(this.fileListIds[index]);
        const { uploadingImgs } = this.state;

        uploadingImgs.forEach(item => {
            if (item.id === this.fileListIds[index]) {
                item.url = url;
                this.fileListUrls[item.id] = url;
            }
        });
        thisImg.firstElementChild.src = url;
        thisImg.removeChild(thisImg.lastElementChild);
    };
    // 上传失败
    errorCallback = (errors, index) => {
        console.log(index, '=========', errors);
    };

    handleClose = () => {
        this.setState({
            uploadingImgs: [],
        });
        this.props.onClose();
    };

    // 确认提交
    confirmInsertPic = () => {
        this.props.onClose();
        const { uploadingImgs } = this.state;
        let imgs = [];

        uploadingImgs.forEach(item => {
            imgs.unshift({ url: item.url, id: item.id });
        });

        this.props.onSubmit(imgs);
        this.setState({
            uploadingImgs: [],
        });
    };

    handleCancel = () => {
        this.setState({
            uploadingImgs: [],
        });
        this.props.onClose();
    };

    // 排序
    handleSortable = (order, sortable, evt) => {
        let newArr = [];

        // console.log(order);
        order.forEach((item, index) => {
            // console.log(item);
            item = JSON.parse(item);
            item['url'] = this.fileListUrls[item.id];
            // console.log('sortItem=', item);
            newArr.push(item);
        });

        // console.log(newArr);
        const _newArr = JSON.parse(JSON.stringify(newArr));

        this.setState({
            uploadingImgs: _newArr,
        });
    };

    render() {
        const { uploadingImgs } = this.state;

        /**
         * 组件分发数据
         */
        // 弹窗内容
        const modalContent = (
            <Fragment>
                <div className={styles.modalContent}>
                    <div className={`${styles.imgsWrapper} clearfix`}>
                        <div id="imgsList">
                            <Sortable
                                onChange={this.handleSortable}
                                options={{
                                    animation: 150,
                                    ghostClass: styles.placeholder,
                                }}>
                                {uploadingImgs.map((item, index) => {
                                    return (
                                        <div
                                            className={styles.preImgsItem}
                                            data-uploading-index={item.index}
                                            data-id={JSON.stringify(item)}
                                            key={index}>
                                            <div id={item.id}>
                                                <img src={item.src} />
                                                <div className={styles.uploadingItem}>
                                                    <div className={styles.loading} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Sortable>
                            <div
                                id="uploader"
                                ref="uploader"
                                className={`${styles.preImgsItem} ${styles.uploader}`}
                                onClick={this.handleUploadImg}>
                                上传图片
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={`${styles.btnWrapper} clearfix`}>
                            <div className={styles.okBtn} onClick={this.confirmInsertPic}>
                                确定
                            </div>
                            <div className={styles.cancelBtn} onClick={this.handleCancel}>
                                取消
                            </div>
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
                        title={'上传图片'}
                        modalWith={803}
                        onClose={this.handleClose.bind(this)}
                        maskClosable={false}
                        footer={false}>
                        {modalContent}
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(UploadImgModal);
