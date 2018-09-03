import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class StockList extends React.PureComponent {
    static propTypes = {
        current: PropTypes.number,
        handleTabsChange: PropTypes.func,
    };

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);
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
                        data-index={index}
                        className={current === index ? styles.current : ''}
                        onMouseEnter={this.handleMouseOver}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
}

export default errorBoundary(StockList);
