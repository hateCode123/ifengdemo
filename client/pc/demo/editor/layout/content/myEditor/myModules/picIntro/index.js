import Quill from 'quill';
let Block = Quill.import('blots/block/embed');

// 自定义图片描述插件
class PicIntroBlot extends Block {
    static create(value) {
        let node = undefined;

        node = super.create();
        node.alt = value.alt;
        node.setAttribute('id', value.id);
        node.setAttribute('class', value.class);
        node.innerHTML = value.content;
        node.setAttribute('edited', false);
        node.setAttribute('contenteditable', true);

        return node;
    }

    static formats(node) {
        let format = {};

        if (node.hasAttribute('height')) {
            format.height = node.getAttribute('height');
        }
        if (node.hasAttribute('width')) {
            format.width = node.getAttribute('width');
        }
    }

    static value(node) {
        return {
            alt: node.getAttribute('alt'),
            id: node.getAttribute('id'), // 追加id
            content: node.innerHTML,
            class: node.getAttribute('class'),
        };
    }
}
PicIntroBlot.blotName = 'picIntro';
PicIntroBlot.tagName = 'div';

export default PicIntroBlot;
