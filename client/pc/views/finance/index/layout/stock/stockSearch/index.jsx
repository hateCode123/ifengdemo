import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class StockSearch extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return <div className={`${styles.btn} clearfix`}>股票搜索组件</div>;
    }
}

/**
 * 定义组件属性类型
 * */
StockSearch.propTypes = {};

/**
 * 定义组件默认属性
 * */
StockSearch.defaultProps = {};

export { StockSearch };
export default StockSearch;
