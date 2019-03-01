import alert from '../../../../../../dialog/layout/content/modal/alert';
import Quill from 'quill';
import Upload from '../../../../../../upload/layout/content/uploader/upload';
// 自定义音频插件
let BlockEmbed = Quill.import('blots/block/embed');

class AudioBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();

        node.setAttribute('id', value.id);
        node.innerHTML = value.content;
        node.setAttribute('contenteditable', false);

        return node;
    }

    static value(node) {
        return {
            id: node.getAttribute('id'), // 追加id
            content: node.innerHTML,
        };
    }
}
AudioBlot.blotName = 'audio';
AudioBlot.tagName = 'x-audio';
Quill.register(AudioBlot);

class CustomAudio {
    constructor(quill, options) {
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        // submitCallback, successCallback, errorCallback
        this.handleUploadAudio = this.handleUploadAudio.bind(this);
        this.onBeforeUpload = options.onBeforeUpload || this.onBeforeUpload;
        this.uploadProgressCallback = options.progressCallback || this.uploadProgressCallback;
        this.successCallback = options.successCallback || this.successCallback;
        this.errorCallback = options.errorCallback || this.errorCallback;
    }
    // 注册audio插件
    handleUploadAudio() {
        console.log('开始上传');
        Upload.start({
            type: 2, // 0 视频 1 图片 2 音频
            appid: 'wemedia',
            onBeforeUpload: async file => {
                console.log('上传之前');
                const id = `x-audio-${new Date().getTime()}`;

                this.id = id;
                await this.handleInsertAudio(id, file);
                await this.onBeforeUpload(id);
            },
            progressCallback: (percentage, file) => {
                this.uploadProgressCallback(percentage);
            },
            successCallback: (url, file) => {
                console.log('上传完成');
                console.log(url);
                this.successCallback(url, this.id, file);
                this.url = url;
                this.fileName = file.name;
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
    // 正在上传的模板
    uploadingContent(file) {
        return `<div id="audio-ctrl-close"></div>
        <div id="audio-desc">
            <div class="fileName">${file.name}</div>
            <p class="tips">音频上传中，请稍候</p>
        </div>
        <div id="a-progress"><div id="a-innerProgress"></div></div>`;
    }
    // 插入音频标签
    handleInsertAudio(id, file) {
        const range = this.quill.getSelection(true);

        console.log(file);
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(
            range.index,
            'audio',
            {
                id,
                content: this.uploadingContent(file),
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

export default CustomAudio;
