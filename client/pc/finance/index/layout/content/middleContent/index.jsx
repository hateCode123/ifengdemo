import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import ComicBook from './comicBook/';
import Talking from './talking';
import Stocks from './stocks';
import Finance from './finance';

class MiddleContent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const data = {
            finance: content.finance,
            title: content.financeList[0],
            financeList: content.financeList.slice(1, 5),
        };

        return (
            <div className={styles.col_M}>
                <ComicBook content={content.comicBook} />
                <div className={styles.box}>
                    <div className={styles.box_inner}>
                        <Talking content={content.talking} />
                        <Finance content={data} />
                        <Stocks content={content.stocks} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MiddleContent;
