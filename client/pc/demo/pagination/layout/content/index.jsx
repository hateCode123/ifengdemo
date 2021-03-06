import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Pagination from './pagination';

class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    handleChangePage(obj) {
        console.log(obj);
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.slider}>
                    <Pagination showQuickJumper total={150} pageSize={10} onChange={this.handleChangePage} />
                </div>
                <br />
                <div className={styles.slider}>
                    <Pagination
                        total={150}
                        type={'simple'}
                        pageSize={10}
                        onChange={this.handleChangePage}
                        showQuickJumper
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
