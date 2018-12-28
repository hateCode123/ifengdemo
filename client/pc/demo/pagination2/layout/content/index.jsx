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
                    <div className={styles.txt}>小于9页：</div>
                    <Pagination total={150} pageSize={20} onChange={this.handleChangePage} />
                </div>
                <div className={styles.slider}>
                    <div className={styles.txt}>大于9页(跳页可选)：</div>
                    <Pagination showQuickJumper total={150} pageSize={10} onChange={this.handleChangePage} />
                </div>
                <div className={styles.slider}>
                    <div className={styles.txt}>指定当前页：</div>
                    <Pagination current={6} total={150} pageSize={10} onChange={this.handleChangePage} />
                </div>
                <div className={styles.slider}>
                    <div className={styles.txt}>简洁模式：</div>
                    <Pagination
                        current={6}
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
