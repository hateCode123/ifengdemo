import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Editor from './editor';
import MyEditor from './myEditor';

class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {};

    render() {
        return (
            <React.Fragment>
                {/* <div className={styles.editor}>
                    <Editor />
                </div> */}
                <div className={styles.editor}>
                    <MyEditor />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
