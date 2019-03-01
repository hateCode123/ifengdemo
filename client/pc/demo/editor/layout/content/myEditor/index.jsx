import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { tooltips } from './myModules/toolTip/tooltip-list';
import Modal from '../../../../dialog/layout/content/modal/index';
import UploaderCropperModal from './uploaderCropperModal';

// for this component
import CustomLink from './myModules/link';
import CustomDivider from './myModules/divider/index';
import CustomImage from './myModules/image';
import CustomAudio from './myModules/audio';
import CustomVideo from './myModules/video';

class MyEditor extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {
        value: '',
        linkModalIsOpen: false,
        linkError: '',
        linkType: 0,
        percentage: 0,
        showCropperModal: false,
    };
    editor = null;
    toolbar = null;

    targetA = null;

    componentDidMount() {
        // 初始化编辑器
        this.initEditor();

        // 自定义hover的titletip
        this.customToolbarTitle();

        // 自定义分割线功能
        this.customDivider();

        // 重写插入链接
        this.customHyperLink();

        // 自定义插入图片
        this.customImage();

        // 自定义插入音频
        this.customAudio();

        // 自定义插入视频
        this.customVideo();

        // 初始化多媒体标签功能按钮
        this.initEmbedCtrl();
    }

    // 初始化编辑器
    initEditor() {
        const textBox = this.refs.textArea;
        const toolbarOptions = [
            [
                'bold',
                'italic',
                {
                    header: 1,
                },
                {
                    header: 2,
                },
                'blockquote',
                {
                    list: 'ordered',
                },
                {
                    list: 'bullet',
                },
                'divider',
            ],
            ['image', 'video', 'audio', 'link'],
            ['clean', 'undo', 'redo'],
        ];
        const formats = [
            'bold',
            'italic',
            'blockquote',
            'list',
            'divider',
            'image',
            'ximage',
            'video',
            'xvideo',
            'audio',
            'header',
            'link',
            'xlink',
        ];
        const options = {
            debug: 'warn',
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        undo: () => {
                            this.editor.history.undo();
                        },
                        redo: () => {
                            this.editor.history.redo();
                        },
                    },
                },
                history: {
                    delay: 2000,
                    maxStack: 500,
                },
            },
            placeholder: '从这里开始写正文',
            readOnly: false,
            theme: 'snow',
            formats,
        };

        // Quill.register();
        this.editor = new Quill(textBox, options);
        const { value } = this.state;

        // 判断value中是否有值，如果有那么就写入编辑器中
        if (value) this.editor.clipboard.dangerouslyPasteHTML(value);
        // 设置事件，change事件，
        this.editor.on('text-change', this.handleChange.bind(this));
        // 添加字数统计 和 自动保存提示
        const toolbar = document.getElementsByClassName('ql-toolbar');
        let rightBox = document.createElement('div');

        toolbar[0].appendChild(rightBox);
        rightBox.classList.add('ql-toolbar-rightBox');
        ReactDOM.render(
            <div className="clearfix">
                <div className={styles.wordCount}>字数 : 1024</div>
                <div className={`${styles.padding} clearfix`}>
                    自动保存<i className={styles.loading} />
                </div>
            </div>,
            rightBox,
        );

        this.toolbar = this.editor.getModule('toolbar');

        // 实验
        // const container = this.editor.addContainer('ql-custom', div);

        // console.log(container);
    }

    // 给按钮加hover标题titletip
    customToolbarTitle() {
        // console.log(this.editor.getModule('toolbar').container.querySelectorAll('.ql-link'));
        let toolbarElement = this.toolbar.container;
        let buttons = toolbarElement.querySelectorAll('button');

        for (let el of buttons) {
            let toolTip = document.createElement('div');
            const name = tooltips[el.className.slice(3)];
            let title = '';

            if (typeof name === 'string') {
                title = name;
            } else {
                let value = el.value || '';

                if (value != null && name[value]) {
                    title = name[value];
                }
            }

            el.appendChild(toolTip);
            toolTip.classList.add('ql-toolbar-tooltip');
            toolTip.innerHTML = title;
        }
    }

    // 自定义分割线
    customDivider() {
        const customDivider = new CustomDivider(this.editor);

        this.toolbar.addHandler('divider', () => {
            customDivider.handleClick();
        });
    }

    // 自定义插入链接
    customHyperLink() {
        const handleLinkModalShow = () => {
            this.setState({
                linkModalIsOpen: true,
            });
        };

        this.toolbar.addHandler('link', () => {
            handleLinkModalShow();
            this.setState({
                linkType: 0,
            });
        });
    }
    // 插入链接的事件
    handleInsertLink() {
        const linkTxt = this.refs.linkTxt.value;
        const linkUrl = this.refs.linkUrl.value;
        const options = {
            type: 0, // 0 插入 1 修改
            successCallback: () => {
                this.setState({
                    linkModalIsOpen: false,
                });
            },
            errorCallback: error => {
                console.log(error);
                this.setState(
                    {
                        linkError: error,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({
                                linkError: '',
                            });
                        }, 3000);
                    },
                );
            },
        };
        const customLink = new CustomLink(this.editor, options);

        customLink.handleSubmit(linkTxt, linkUrl);
    }
    // 修改链接的触发事件
    handleEditLink(target) {
        // console.log(target);
        const value = target.innerHTML;
        const href = target.href;

        this.targetA = target;
        document.getElementById('linkTxt').value = value;
        document.getElementById('linkUrl').value = href;
    }
    // 修改链接的提交事件
    handleSubmitEditLink() {
        const linkTxt = this.refs.linkTxt.value;
        const linkUrl = this.refs.linkUrl.value;
        const options = {
            type: 1, // 0 插入 1 修改
            successCallback: () => {
                this.setState({
                    linkModalIsOpen: false,
                });
            },
            errorCallback: error => {
                // console.log(error);
                this.setState(
                    {
                        linkError: error,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({
                                linkError: '',
                            });
                        }, 3000);
                    },
                );
            },
        };
        const customLink = new CustomLink(this.editor, options);

        customLink.handleSubmit(linkTxt, linkUrl, this.targetA);
    }
    // 隐藏添加链接的弹窗
    linkModalHide() {
        this.setState({
            linkModalIsOpen: false,
        });
    }

    // 自定义插入图片
    customImage() {
        // 插入图片
        this.toolbar.addHandler('image', () => {
            this.handleInsertImage();
        });
    }
    // 插入图片的事件
    handleInsertImage() {
        const options = {
            onBeforeUpload: id => {
                console.log(id);
            },
            progressCallback: async (percentage, id) => {
                console.log(percentage);
            },
            successCallback: (url, id, file) => {
                console.log('成功了');
                const img = document.getElementById(id);
                const innerProgress = img.lastElementChild.lastElementChild.lastElementChild;

                if (innerProgress) {
                    innerProgress.style.width = '100%';
                }
                setTimeout(() => {
                    img.innerHTML = `<div id="img-ctrl-warapper">
                    <div id="img-ctrl-close"></div>
                    <div id="img-ctrl-cropper"></div>
                </div>
                <img src="${url}" alt="${file.name}">`;
                }, 200);

                img.setAttribute('data-src', url);
            },
            errorCallback: error => {
                console.log(error);
            },
        };
        const customImage = new CustomImage(this.editor, options);

        customImage.handleUploadImage();
        // 删除视频按钮的功能
        const editor = document.querySelector('.ql-editor');

        editor.onclick = e => {
            const target = e.target;

            if (target.id === 'img-ctrl-close') {
                console.dir(target);
                const thisImg = target.parentElement.parentElement;

                editor.removeChild(thisImg);
            }
            if (target.id === 'img-ctrl-cropper') {
                console.dir(target);
                this.cropperImg(target);
            }
        };
    }
    // 裁图功能
    cropperImg(target) {
        const thisImg = target.parentElement.parentElement;
        const imgID = thisImg.id;
        const toCropperImg = thisImg.querySelector('img').src;

        this.setState({
            imgID,
            showCropperModal: true,
            toCropperImg,
        });
    }
    // 上传裁剪后的图片之前
    beforeUploadCroppedImg(dataUrl, index, file) {
        const thisImg = document.getElementById(index);

        this.handleCloseCropperModal();
        thisImg.innerHTML = `<div id="img-ctrl-warapper">
        <div id="img-ctrl-close"></div>
        <div id="img-ctrl-cropper"></div>
    </div>
    <img src="${dataUrl}" alt="${file.name}">
    <div id="img-uploading-mask">
    <div id="loading"></div>
    <p>图片上传中，请稍候</p>
    <div id="i-progress"><div id="i-innerProgress"></div></div>
</div>`;
    }
    // 获取新的图片
    getNewPic(url, index, file) {
        const img = document.getElementById(index);
        const innerProgress = img.lastElementChild.lastElementChild.lastElementChild;

        if (innerProgress) {
            innerProgress.style.width = '100%';
        }
        setTimeout(() => {
            img.innerHTML = `<div id="img-ctrl-warapper">
                    <div id="img-ctrl-close"></div>
                    <div id="img-ctrl-cropper"></div>
                </div>
                <img src="${url}" alt="${file.name}">`;
        }, 200);

        img.setAttribute('data-src', url);
    }

    // 自定义插入音频
    customAudio() {
        // 插入音频
        this.toolbar.addHandler('audio', () => {
            this.handleInsertAudio();
        });
    }
    // 插入音频的事件
    handleInsertAudio() {
        const options = {
            onBeforeUpload: id => {
                console.log(id);
            },
            progressCallback: async (percentage, id) => {
                const audio = await document.getElementById(id);

                if (audio) {
                    const innerProgress = audio.lastElementChild.lastElementChild.lastElementChild;

                    if (innerProgress) {
                        innerProgress.style.width = percentage;
                    }
                }
            },
            successCallback: (url, id, file) => {
                const audio = document.getElementById(id);

                audio.innerHTML = `<div id="audio-ctrl-close"></div>
                <div id="audio-desc">
                    <div class="fileName">${file.name}</div>
                    <p class="tips">音频尚未发布，暂时无法播放</p>
                </div>`;

                audio.setAttribute('data-src', url);
            },
            errorCallback: error => {
                console.log(error);
            },
        };
        const customAudio = new CustomAudio(this.editor, options);

        customAudio.handleUploadAudio();
        // 删除音频按钮的功能
        const editor = document.querySelector('.ql-editor');

        editor.onclick = e => {
            const target = e.target;

            if (target.id === 'audio-ctrl-close') {
                console.dir(target);
                const thisAudio = target.parentElement;

                customAudio.stopUpload();
                editor.removeChild(thisAudio);
            }
        };
    }
    // 插入视频的事件
    customVideo() {
        this.toolbar.addHandler('video', () => {
            this.handleInsertVideo();
        });
    }
    // 插入视频的事件
    handleInsertVideo() {
        const options = {
            onBeforeUpload: id => {
                console.log(id);
            },
            progressCallback: async (percentage, id) => {
                const video = await document.getElementById(id);

                // console.dir(video);
                if (video) {
                    const innerProgress = video.lastElementChild.lastElementChild.lastElementChild;

                    if (innerProgress) {
                        innerProgress.style.width = percentage;
                    }
                }
            },
            successCallback: (url, id) => {
                const video = document.getElementById(`${id}`);

                video.innerHTML = `<div id="video-ctrl-close"></div><video src="${url}"></video><div id="video-mask"><p>视频尚未发布，暂时无法播放</p></div>`;

                video.setAttribute('data-src', url);
            },
            errorCallback: error => {
                console.log(error);
            },
        };
        const customVideo = new CustomVideo(this.editor, options);

        customVideo.handleUploadVideo(); // 执行插入视频的动作
        // 删除视频按钮的功能
        const editor = document.querySelector('.ql-editor');

        editor.onclick = e => {
            const target = e.target;

            if (target.id === 'video-ctrl-close') {
                console.dir(target);
                const thisVideo = target.parentElement;

                customVideo.stopUpload();
                editor.removeChild(thisVideo);
            }
        };
    }

    // 插入的多媒体元素 功能按钮的初始化
    initEmbedCtrl() {
        const editor = document.querySelector('.ql-editor');

        // 删除超链接
        editor.onclick = e => {
            e = e || window.event;
            const target = e.target || e.srcElement;

            // 修改超链接
            if (target.nodeName === 'A') {
                // console.log(target.nodeName);
                this.setState({
                    linkType: 1,
                    linkModalIsOpen: true,
                });
                this.handleEditLink(target);
            }
            // 删除图片
            if (target.id === 'img-ctrl-close') {
                const thisImg = target.parentElement.parentElement;

                editor.removeChild(thisImg);
            }
            // 裁剪图片
            if (target.id === 'img-ctrl-cropper') {
                console.dir(target);
                this.cropperImg(target);
            }
            // 删除音频
            if (target.id === 'audio-ctrl-close') {
                console.dir(target);
                const thisAudio = target.parentElement;

                editor.removeChild(thisAudio);
            }
            // 删除视频
            if (target.id === 'video-ctrl-close') {
                console.dir(target);
                const thisVideo = target.parentElement;

                editor.removeChild(thisVideo);
            }
        };
    }

    handleChange(editorState) {
        // console.log(editorState);
        this.setState({
            editorState,
        });
    }

    handleCloseCropperModal() {
        this.setState({
            showCropperModal: false,
        });
    }

    errorCallback(error) {
        console.log(error);
    }

    render() {
        const { linkError, linkType, imgID, showCropperModal, toCropperImg } = this.state;
        const linkForm = (
            <React.Fragment>
                <div className={styles.linkForm}>
                    <div className={`${styles.formItem} clearfix`}>
                        <label className={styles.label}>链接文字</label>
                        <div className={styles.inputBlock}>
                            <input
                                type="text"
                                id="linkTxt"
                                ref="linkTxt"
                                className={styles.linkTxt}
                                placeholder={'请输入50字以内链接文字'}
                            />
                        </div>
                    </div>
                    <div className={`${styles.formItem} clearfix`}>
                        <label className={styles.label}>链接地址</label>
                        <div className={styles.inputBlock}>
                            <input
                                type="text"
                                id="linkUrl"
                                ref="linkUrl"
                                className={styles.linkUrl}
                                placeholder={'支持凤凰内部链接地址'}
                            />
                        </div>
                    </div>
                    {linkError ? (
                        <div className={styles.errorTip} id="errorTip">
                            <span>{linkError}</span>
                        </div>
                    ) : null}

                    <div className={styles.tips}>插入的链接需与正文内容密切相关，且出现的位置上 下文逻辑清晰、合理</div>
                </div>
                <div className={styles.modal_footer}>
                    <div className={`${styles.buttonWrap} clearfix`}>
                        <button
                            className={`${styles.btn_dialog} ${styles.btn_comfirm}`}
                            onClick={
                                linkType === 0 ? this.handleInsertLink.bind(this) : this.handleSubmitEditLink.bind(this)
                            }>
                            <span>确定</span>
                        </button>
                        <button className={styles.btn_dialog} onClick={this.linkModalHide.bind(this)}>
                            <span>取消</span>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <div className={styles.editorWrap}>
                    <div ref={'textArea'} />
                    <Modal
                        modalWith={430}
                        isOpen={this.state.linkModalIsOpen}
                        title={'插入内部链接'}
                        onCancel={() => {
                            this.linkModalHide();
                        }}
                        on
                        footer={false}>
                        {linkForm}
                    </Modal>
                    <UploaderCropperModal
                        img={toCropperImg}
                        index={imgID}
                        isOpen={showCropperModal}
                        onClose={this.handleCloseCropperModal.bind(this)}
                        beforeUpload={this.beforeUploadCroppedImg.bind(this)}
                        getNewPic={this.getNewPic.bind(this)}
                        errorCallback={this.errorCallback.bind(this)}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(MyEditor);
