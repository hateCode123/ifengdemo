import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import { Editor, EditorState } from 'draft-js';
class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {
        value: '<p>quill测试文本</p>',
        editorState: EditorState.createEmpty(),
    };
    editor = null;

    componentDidMount() {}

    handleChange(editorState) {
        this.setState({
            editorState,
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.editorWrap}>
                    <div className={styles.toolBar}>
                        <ul>
                            <li className={styles.bold} />
                            <li className={styles.italic} />
                            <li className={styles.header1} />
                            <li className={styles.header2} />
                            <li className={styles.source} />
                            <li className={styles.list_num} />
                            <li className={styles.list_dot} />
                        </ul>
                        <div className={styles.line} />
                        <ul>
                            <li className={styles.photo} />
                            <li className={styles.video} />
                            <li className={styles.audio} />
                            <li className={styles.link} />
                        </ul>
                        <div className={styles.line} />
                        <ul>
                            <li className={styles.clear} />
                            <li className={styles.undo} />
                            <li className={styles.redo} />
                        </ul>
                        <div className={styles.rightBox}>
                            <span>字数 : 1024</span>
                            <span className={styles.padding}>
                                自动保存<i className={styles.loading} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.textArea}>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.handleChange.bind(this)}
                            placeholder={'从这里开始写正文'}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
