import Quill from 'quill';
import Upload from '../../../../../../upload/layout/content/uploader/upload';

class CustomImage {
    constructor(quill, options) {
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        this.type = options.type;
        // submitCallback, successCallback, errorCallback
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.uploadProgressCallback = options.progressCallback || this.uploadProgressCallback;
        this.successCallback = options.successCallback || this.successCallback;
        this.errorCallback = options.errorCallback || this.errorCallback;
        this.creatImageBlot();
    }
    creatImageBlot() {
        let BlockEmbed = Quill.import('blots/block/embed');

        class ImageBlot extends BlockEmbed {
            static create(value) {
                let node = undefined;

                if (value && !value.src) {
                    node = super.create(value);
                } else {
                    node = super.create(value.src);
                    node.src = value.src;
                    node.alt = value.alt;
                }

                return node;
            }

            // static value(node) {
            //     return {
            //         alt: node.getAttribute('alt'),
            //         url: node.getAttribute('src'),
            //     };
            // }
        }
        ImageBlot.blotName = 'image';
        ImageBlot.tagName = 'img';
        Quill.register(ImageBlot);
    }
    handleUploadImage() {
        console.log('开始上传');
        Upload.start({
            type: 1, // 0 视频 1 图片 2 普通文件
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
                this.handleInsertImage();
            },
            errorCallback: errors => {
                this.errorCallback(errors);
            },
        });
    }
    handleInsertImage() {
        const range = this.quill.getSelection(true);

        // 插入分割线
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(
            range.index + 1,
            'image',
            {
                alt: this.fileName,
                src: this.url,
            },
            true,
            Quill.sources.USER,
        );
        this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
        this.quill.focus();
    }
}

export default CustomImage;
