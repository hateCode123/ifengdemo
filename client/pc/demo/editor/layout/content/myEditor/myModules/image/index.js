import Quill from 'quill';
import Upload from '../../../../../../upload/layout/content/uploader/upload';

import PicIntroBlot from '../picIntro';
// 自定义图片插件
const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
    static create(value) {
        let node = undefined;

        node = super.create();
        node.alt = value.alt;
        node.setAttribute('id', value.id);
        node.innerHTML = value.content;
        node.setAttribute('contenteditable', false);

        return node;
    }

    static value(node) {
        return {
            alt: node.getAttribute('alt'),
            id: node.getAttribute('id'), // 追加id
            content: node.innerHTML,
        };
    }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'x-img';
Quill.register(PicIntroBlot);
Quill.register(ImageBlot);

class CustomImage {
    constructor(quill, options) {
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        // submitCallback, successCallback, errorCallback
        // this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleInsertImages = this.handleInsertImages.bind(this);
        // this.onBeforeUpload = options.onBeforeUpload || this.onBeforeUpload;
        // this.uploadProgressCallback = options.progressCallback || this.uploadProgressCallback;
        // this.successCallback = options.successCallback || this.successCallback;
        // this.errorCallback = options.errorCallback || this.errorCallback;
    }
    onBeforeUpload() {}
    uploadProgressCallback() {}
    successCallback() {}
    errorCallback() {}
    handleUploadImage() {
        console.log('开始上传');
        try {
            Upload.start({
                type: 1, // 0 视频 1 图片 2 普通文件
                appid: 'wemedia',
                onBeforeUpload: async file => {
                    const id = `x-img-${new Date().getTime()}`;

                    this.id = id;
                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(file);
                    let img = '';

                    fileReader.onload = e => {
                        img = e.target.result;
                        this.handleInsertImage(id, file, img);
                    };
                    this.onBeforeUpload(id);
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
        } catch (e) {
            console.error(e);
        }
    }
    // 正在上传的模板
    uploadingContent(file, img) {
        // console.log(img);

        return `<div id="img-ctrl-warapper">
        <div id="img-ctrl-close"></div>
        <div id="img-ctrl-cropper"></div>
    </div>
    <img src="${img}" alt="${file.name}">
    <div id="img-uploading-mask">
    <div id="loading"></div>
    <p>图片上传中，请稍候</p>
    <div id="i-progress"><div id="i-innerProgress"></div></div>
</div>`;
    }
    handleInsertImage(id, file, img) {
        const range = this.quill.getSelection(true);

        // 插入分割线
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(
            range.index,
            'image',
            {
                id,
                alt: file.name,
                content: this.uploadingContent(file, img),
            },
            true,
            Quill.sources.USER,
        );
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        this.quill.focus();
    }
    // 插入批量图片
    handleInsertImages(imgs) {
        const range = this.quill.getSelection(true);

        // this.quill.insertText(range.index, '\n', Quill.sources.USER);
        // 将批量图片循环插入到编辑器内
        imgs.forEach((item, index) => {
            const date = new Date().getTime();

            this.quill.insertEmbed(
                range.index + index,
                'image',
                {
                    id: `x-img-${date}`,
                    alt: '上传失败',
                    content: `<div id="img-ctrl-warapper">
                    <div id="img-ctrl-close"></div>
                    <div id="img-ctrl-cropper"></div>
                    </div>
                    <img src="${item.url}?${date}" alt="上传失败">`,
                },
                true,
                Quill.sources.USER,
            );
            // this.quill.insertEmbed(
            //     range.index + 1,
            //     'picIntro',
            //     {
            //         id: 'picIntro',
            //         alt: 'picIntro',
            //         // content: '单击添加图片描述（最多20字）',
            //         content: '<span id="picIntroPlaceholder">单击添加图片描述（最多20字）</span>',
            //         class: 'picIntro',
            //     },
            //     true,
            //     Quill.sources.USER,
            // );
        });
        // this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
    }
}

export default CustomImage;
