import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class StockList extends React.PureComponent {
    handleMouseOver = index => {
        const { handleTabsChange } = this.props;

        handleTabsChange(index);
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.props;
        const content = ['股票', '自选股', '资金流向'];

        return (
            <ul className={styles.list}>
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={current === index ? styles.current : ''}
                        onMouseEnter={() => this.handleMouseOver(index)}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockList.propTypes = {
    current: PropTypes.number,
    handleTabsChange: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
StockList.defaultProps = {};

export { StockList };
export default StockList;
