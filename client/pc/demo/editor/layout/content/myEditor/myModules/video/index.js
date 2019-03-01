import alert from '../../../../../../dialog/layout/content/modal/alert';
import Quill from 'quill';
import Upload from '../../../../../../upload/layout/content/uploader/upload';
// 自定义视频插件
let BlockEmbed = Quill.import('blots/block/embed');

class VideoBlot extends BlockEmbed {
    static create(value) {
        // 可配置属性值
        let node = super.create();

        console.log('value----', value);
        node.setAttribute('id', value.id);
        node.innerHTML = value.content;
        node.setAttribute('contenteditable', false);

        return node;
    }

    static value(node) {
        // 自定义的node节点
        console.log('node----', node);

        return {
            id: node.getAttribute('id'), // 自定义Attribute属性
            content: node.innerHTML, // 插入内容，可以是dom或字符串
        };
    }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'x-video'; // 自定义标签
Quill.register(VideoBlot); // 注册模块

class CustomVideo {
    constructor(quill, options) {
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        // submitCallback, successCallback, errorCallback
        this.handleUploadVideo = this.handleUploadVideo.bind(this);
        this.onBeforeUpload = options.onBeforeUpload || this.onBeforeUpload;
        this.uploadProgressCallback = options.progressCallback || this.uploadProgressCallback;
        this.successCallback = options.successCallback || this.successCallback;
        this.errorCallback = options.errorCallback || this.errorCallback;
    }
    // 注册video插件
    handleUploadVideo() {
        console.log('开始上传');
        Upload.start({
            type: 0, // 0 视频 1 图片 2 音频
            appid: 'wemedia',
            onBeforeUpload: async file => {
                console.log('上传之前');
                const id = `x-video-${new Date().getTime()}`;

                this.id = id;
                await this.handleInsertVideo(id);
                await this.onBeforeUpload(id);
            },
            progressCallback: (percentage, file) => {
                this.uploadProgressCallback(percentage, this.id);
            },
            successCallback: (url, file) => {
                console.log('上传完成');
                console.log(url);
                this.successCallback(url, this.id);
                this.url = url;
                this.fileName = file.name;
                // this.handleInsertVideo(url);
            },
            errorCallback: errors => {
                this.errorCallback(errors);
            },
        });
    }
    // 停止上传
    stopUpload() {
        Upload.stop();
    }
    // 成功的模板
    successContent(url) {
        return `<div id="video-ctrl-close"></div><video src="${url}"></video><div id="video-mask"><p>视频尚未发布，暂时无法播放</p></div>`;
    }
    // 正在上传的模板
    uploadingContent() {
        return '<div id="video-ctrl-close"></div><div id="video-uploading-mask"><div id="loading"></div><p>视频上传中，请稍候</p><div id="v-progress"><div id="v-innerProgress"></div></div></div>';
    }
    // 插入视频标签
    handleInsertVideo(id) {
        const range = this.quill.getSelection(true);

        // 插入元素
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(
            range.index,
            'video',
            {
                id,
                content: this.uploadingContent(),
            },
            true,
            Quill.sources.USER,
        );
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        this.quill.focus();
    }
    // 成功的回调
    successCallback() {}
    // 出错的回调
    errorCallback(error) {}
}

export default CustomVideo;
