import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class StockNews extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

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

export default StockNews;
