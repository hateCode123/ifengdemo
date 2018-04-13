import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 FinancialRecommend 组件
 */
class FinancialRecommend extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return <div className={styles.box}>理财推荐组件</div>;
    }
}

/**
 * 定义组件属性类型
 * */
FinancialRecommend.propTypes = {};

/**
 * 定义组件默认属性
 * */
FinancialRecommend.defaultProps = {};

export { FinancialRecommend };
export default FinancialRecommend;
