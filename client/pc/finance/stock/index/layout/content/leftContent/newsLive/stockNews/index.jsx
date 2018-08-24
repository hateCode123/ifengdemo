import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../../../utils/rel';

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
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default errorBoundary(StockNews);
