import Quill from 'quill';
import Divider from './divider';

// 自定义分割线功能
Quill.register(Divider);

class CustomDivider {
    constructor(quill) {
        this.quill = quill;
    }
    handleClick() {
        // console.log('分割线');
        let range = this.quill.getSelection(true);

        // 插入分割线
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
        this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }
}

export default CustomDivider;
