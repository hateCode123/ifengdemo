import Quill from 'quill';
let BlockEmbed = Quill.import('blots/block/embed');

class Divider extends BlockEmbed {}
Divider.blotName = 'divider';
Divider.tagName = 'hr';

export default Divider;
