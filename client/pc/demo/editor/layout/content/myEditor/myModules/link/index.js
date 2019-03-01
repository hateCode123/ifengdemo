import alert from '../../../../../../dialog/layout/content/modal/alert';
import Quill from 'quill';

/** 重写插入链接模块
 * @param {Object} options 插入链接的配置,以下全是
 *      @param {Number}    type 插入的类型 0 插入 1 修改
 *      @param {Function}    successCallback 成功的回调
 *      @param {Function}    errorCallback 出错的回调
 */
class CustomLink {
    constructor(quill, options) {
        this.quill = quill;
        this.toolbar = quill.getModule('toolbar');
        this.type = options.type;
        // submitCallback, successCallback, errorCallback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.successCallback = options.successCallback || this.successCallback;
        this.errorCallback = options.errorCallback || this.errorCallback;
        this.creatLinkBlot();
    }
    //
    creatLinkBlot() {
        // 注册自定义的超链接插件
        const Link = Quill.import('formats/link');

        class FileBlot extends Link {
            // 继承Link Blot
            static create(value) {
                let node = undefined;

                if (value && !value.href) {
                    // 适应原本的Link Blot
                    node = super.create(value);
                } else {
                    // 自定义Link Blot
                    node = super.create(value.href);
                    node.innerText = value.innerText;
                }

                return node;
            }
        }
        FileBlot.blotName = 'xlink';
        FileBlot.tagName = 'A';
        FileBlot.SANITIZED_URL = 'about:blank';
        Quill.register(FileBlot);
        //
    }
    handleSubmit(linkTxt, linkUrl, linkEle) {
        // console.log(linkTxt, linkUrl);
        if (linkUrl !== '') {
            // console.log(url);
            const strRegex = /^((https|http|ftp|rtsp|mms)?:\/\/)?(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
            const re = new RegExp(strRegex);

            if (!re.test(linkUrl)) {
                // 检查输入的链接的格式是否正确
                this.errorCallback('请输入格式正确的地址');
            } else {
                /* eslint-disable */
                if (linkUrl.indexOf('.ifeng.com') !== -1 || linkUrl.indexOf('ifeng.com') !== -1) {
                    if (this.type === 0) {
                        this.insertLink(linkUrl, linkTxt);
                    } else {
                        this.updateLink(linkUrl, linkTxt, linkEle);
                    }
                    this.successCallback();
                } else {
                    this.errorCallback('非凤凰链接不允许添加');
                }
            }
        } else {
            if (this.type === 0) {
                alert.warning({
                    content: '链接地址为空',
                });
                return;
            } else {
                this.updateLink(linkUrl, linkTxt, linkEle);
            }
            /* eslint-enable */
        }
    }
    // 插入超链接
    insertLink(linkUrl, linkTxt) {
        let _url = '';

        // 判断是否有http://或https://,没有就加上http://
        if (linkUrl.indexOf('http://') !== -1 || linkUrl.indexOf('https://') !== -1) {
            _url = linkUrl;
        } else {
            _url = `http://${linkUrl}`;

            alert.warning({
                content: '您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀',
            });
        }
        this.quill.focus();
        const range = this.quill.getSelection();

        if (range) {
            if (range.length === 0) {
                console.log('User cursor is at index', range.index);
                this.quill.insertEmbed(
                    range.index,
                    'xlink',
                    { href: _url, innerText: linkTxt ? linkTxt : linkUrl },
                    'api',
                );
            }
        }
        // this.quill.blur();
    }
    // 修改超链接
    updateLink(linkUrl, linkTxt, linkEle) {
        let _url = '';

        if (linkUrl) {
            if (linkUrl.indexOf('http://') !== -1 || linkUrl.indexOf('https://') !== -1) {
                _url = linkUrl;
            } else {
                _url = `http://${linkUrl}`;

                alert.warning({
                    content: '您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀',
                });
            }

            if (linkTxt) {
                linkEle.innerHTML = linkTxt;
                linkEle.href = _url;
            } else {
                linkEle.innerHTML = linkUrl;
            }
        } else {
            this.errorCallback('链接地址不能为空');
        }
    }
    // 成功的回调
    successCallback() {}
    // 出错的回调
    errorCallback(error) {}
}

export default CustomLink;
