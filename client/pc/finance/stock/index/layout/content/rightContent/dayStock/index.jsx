import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class DayStock extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.dayStock}>
                <div className={styles.title}>
                    <h4>
                        <a title="每日论股">每日论股</a>
                    </h4>
                </div>
                <div className={styles.list}>
                    <ul>
                        {content.map((item, index) => (
                            <li key={index}>
                                <div className={styles.pic}>
                                    <a href={item.url} target="_blank" rel={rel}>
                                        <img src={item.thumbnail} width="300" height="166" className={styles.trans} />
                                        <div className={styles.link} />
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default errorBoundary(DayStock);
