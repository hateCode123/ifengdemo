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
import Alert from '../../../../../dialog/layout/content/modal/alert';

class UploadImgModal extends React.PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    state = {
        isOpen: this.props.isOpen,
        uploadingImgs: new Array(),
        isSort: true,
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

    fileListIds = {}; // 文件id的缓存
    fileListUrls = {}; // 文件上传成功的url的缓存
    errorFiles = []; // 上传失败的文件的缓存
    isUploading = false; // 正在上传的状态标记
    // 获取文件列表, 这里做一些上传之前的操作
    getFileList = fileList => {
        this.isUploading = true;
        // console.log(fileList);
        this.fileListIds = {};
        // this.fileListUrls = {};
        const imgs = fileList;
        const formatImgs = [];

        // 图片过大则不上传
        // imgs.forEach((item, index) => {
        //     if (item.file.size > 5 * 1024 * 1024) {
        //         Alert.warning({
        //             content: `${item.file.name}过大，请重新选择`,
        //             onClose: () => {},
        //         });
        //     } else {
        //         formatImgs.push(item);
        //         this.fileListIds[item.index] = item.id;
        //     }
        // });
        imgs.forEach((item, index) => {
            formatImgs.push(item);
            this.fileListIds[item.index] = item.id;
        });

        console.log(formatImgs);

        this.setState({
            uploadingImgs: [...this.state.uploadingImgs, ...formatImgs],
        });
    };
    // 上传之前
    onBeforeUpload = (file, index) => {
        console.log('上传之前');
        // console.log(index, '===========', file);
        const thisImg = document.getElementById(this.fileListIds[index]);
        const { uploadingImgs } = this.state;

        uploadingImgs.forEach(item => {
            if (item.id === this.fileListIds[index]) {
                thisImg.firstElementChild.src = item.src;
            }
        });
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
            // 拖拽排序的数据缓存
            thisImg.parentElement.setAttribute('data-id', JSON.stringify({ id: this.fileListIds[index], index, url }));
        });
        if (Object.keys(this.fileListUrls).length + this.errorFiles.length === Object.keys(this.fileListIds).length) {
            this.isUploading = false;
        }
        console.log(this.isUploading);
        thisImg.firstElementChild.src = url;
        thisImg.parentElement.lastElementChild.style.display = 'block';
        thisImg.removeChild(thisImg.lastElementChild);
    };
    // 上传失败
    errorCallback = (errors, file, index) => {
        console.log(index, '=========', errors);
        this.errorFiles.push(this.fileListIds[index]);
        // if (errors.status === 40003) {
        //     return;
        // }
        Alert.warning({
            content: `${file.name}上传失败，请重新上传`,
            onClose: () => {
                const taskNum = Object.keys(this.fileListUrls).length + this.errorFiles.length;

                if (taskNum) {
                    this.isUploading = false;
                }
                console.log(this.isUploading);
                const thisImg = document.getElementById(this.fileListIds[index]);

                console.log(thisImg);
                // 视图更新
                thisImg.parentElement.firstElementChild.style.display = 'block';
                thisImg.removeChild(thisImg.lastElementChild);
                thisImg.parentElement.lastElementChild.style.display = 'block';
                thisImg.parentElement.lastElementChild.setAttribute('data-errorItem', true);
                // 不允许排序
                this.setState({
                    isSort: false,
                });
            },
        });
    };

    handleClose = () => {
        this.fileListIds = {};
        this.fileListUrls = {};
        this.setState({
            uploadingImgs: [],
            isSort: true,
        });
        this.props.onClose();
    };

    // 确认提交
    confirmInsertPic = () => {
        console.log(this.isUploading);
        this.fileListIds = {};
        this.fileListUrls = {};
        this.props.onClose();
        const { uploadingImgs } = this.state;
        let imgs = [];

        uploadingImgs.forEach(item => {
            if (item.url) {
                imgs.push({ url: item.url, id: item.id });
            }
        });

        this.props.onSubmit(imgs);
        this.setState({
            uploadingImgs: [],
        });
    };

    handleCancel = () => {
        this.fileListIds = {};
        this.fileListUrls = {};
        this.setState({
            uploadingImgs: [],
            isSort: true,
        });
        this.props.onClose();
    };

    // 排序
    handleSortable = (order, sortable, evt) => {
        let newArr = [];
        const { isSort } = this.state;

        // console.log(order);
        order.forEach((item, index) => {
            // console.log(item);
            item = JSON.parse(item);
            // console.log('sortItem=', item);
            item['url'] = this.fileListUrls[item.id];
            newArr.push(item);
        });

        // console.log(newArr);
        const _newArr = JSON.parse(JSON.stringify(newArr));

        if (!isSort) {
            Alert.warning({
                content: '请删除上传失败的图片再进行排序',
            });

            return;
        }

        this.setState({
            uploadingImgs: _newArr,
        });
    };

    // 删除
    handleDelete = e => {
        const targetId = e.currentTarget.attributes['data-uploading-id'].value;
        const isError = e.currentTarget.attributes['data-errorItem']
            ? e.currentTarget.attributes['data-errorItem'].value
            : false;

        console.log(isError);
        if (isError) {
            this.errorFiles.splice(this.errorFiles.indexOf(targetId), 1);
            e.currentTarget.parentElement.firstElementChild.style = 'none';
        }
        const { uploadingImgs } = this.state;
        let targetItem = '';
        const _uploadingImgs = JSON.parse(JSON.stringify(uploadingImgs));

        uploadingImgs.forEach((item, index) => {
            if (item.id === targetId) {
                targetItem = item;
            }
        });
        _uploadingImgs.splice(uploadingImgs.indexOf(targetItem), 1);
        // console.log(_uploadingImgs);
        this.setState({
            uploadingImgs: _uploadingImgs,
        });
        // console.log(this.state.uploadingImgs);
        if (!this.errorFiles.length) {
            this.setState({
                isSort: true,
            });
        }
    };

    render() {
        const { uploadingImgs, isSort } = this.state;

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
                                            data-id={JSON.stringify({ id: item.id, index: item.index, url: item.url })}
                                            key={index}>
                                            <div className={styles.error}>上传失败</div>
                                            <div className={styles.innerWrapper} id={item.id}>
                                                <img src={item.url} />
                                                <div className={styles.uploadingItem}>
                                                    <div className={styles.loading} />
                                                </div>
                                            </div>
                                            <div
                                                data-uploading-id={item.id}
                                                className={styles.delete}
                                                onClick={this.handleDelete}
                                            />
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
