import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Spin from './spin';
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
                <button
                    onClick={() => {
                        this.setState({ isLoading: !this.state.isLoading });
                    }}>
                    按钮
                </button>
                <div className={styles.box}>
                    <Spin spinning={this.state.isLoading} size={'small'} tip={'加载中...'}>
                        <div className={styles.content} />
                    </Spin>
                </div>
                <Spin spinning={this.state.isLoading} size={'small'} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
