import alert from '../../../../../../dialog/layout/content/modal/alert';
import Quill from 'quill';
import Upload from '../../../../../../upload/layout/content/uploader/upload';
// 自定义音频插件
let BlockEmbed = Quill.import('blots/block/embed');

class VideoBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();

        node.setAttribute('data-src', value.src);

        return node;
    }

    static value(node) {
        return {
            src: node.getAttribute('data-src'),
        };
    }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'x-video';
Quill.register(VideoBlot);

class CustomVideo {
    constructor(quill, options) {
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        this.type = options.type;
        // submitCallback, successCallback, errorCallback
        this.handleUploadVideo = this.handleUploadVideo.bind(this);
        this.uploadProgressCallback = options.progressCallback || this.uploadProgressCallback;
        this.successCallback = options.successCallback || this.successCallback;
        this.errorCallback = options.errorCallback || this.errorCallback;
    }
    // 注册audio插件
    handleUploadVideo() {
        console.log('开始上传');
        Upload.start({
            type: 0, // 0 视频 1 图片 2 音频
            appid: 'wemedia',
            onBeforeUpload: file => {
                console.log('上传之前');
            },
            progressCallback: (percentage, file) => {
                this.uploadProgressCallback(percentage);
            },
            successCallback: (url, file) => {
                console.log('上传完成');
                console.log(url);
                this.successCallback(url);
                this.url = url;
                this.fileName = file.name;
                this.handleInsertVideo();
            },
            errorCallback: errors => {
                this.errorCallback(errors);
            },
        });
    }
    // 插入音频标签
    handleInsertVideo() {
        const range = this.quill.getSelection(true);

        // 插入分割线
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(
            range.index + 1,
            'video',
            {
                src: this.url,
            },
            true,
            Quill.sources.USER,
        );
        this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
        this.quill.focus();
    }
    // 成功的回调
    successCallback() {}
    // 出错的回调
    errorCallback(error) {}
}

export default CustomVideo;
