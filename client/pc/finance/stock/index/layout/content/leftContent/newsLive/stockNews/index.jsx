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
                {content.list.map((item, index) => (
                    <li key={index}>
                        <a href={item.commentUrl}>{item.title}</a>
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockNews.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
StockNews.defaultProps = {};

export { StockNews };
export default StockNews;
