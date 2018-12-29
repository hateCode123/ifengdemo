import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Share from './share';
class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {
        isLoading: false,
    };

    render() {
        return (
            <React.Fragment>
                <div className={styles.box}>
                    <Share>
                        <button>按钮</button>
                    </Share>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
