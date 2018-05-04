import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import CattleStocks from './cattleStocks/';
import Rank from './rank/';
import FundsFlow from './fundsFlow/';
import CustomStocks from './customStocks/';
import Qa from './QA/';

class MiddleContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_M}>
                <CattleStocks content={content.cattleStocksTitle} />
                <div className={styles.space16} />
                <Rank content={content.rankTitle} />
                <div className={styles.space16} />
                <FundsFlow content={content.fundsFlowTitle} />
                <div className={styles.space16} />
                <CustomStocks content={content.customStocksTitle} />
                <div className={styles.space20} />
                <Qa content={content.QaTitle} tabs={content.QaTabs} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MiddleContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
MiddleContent.defaultProps = {};

export { MiddleContent };
export default MiddleContent;
