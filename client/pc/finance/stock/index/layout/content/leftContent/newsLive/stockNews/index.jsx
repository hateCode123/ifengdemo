import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class StockNews extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <ul className={styles.list}>
                {content.map(item => (
                    <li key={item.id}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockNews.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
StockNews.defaultProps = {};

export { StockNews };
export default StockNews;
