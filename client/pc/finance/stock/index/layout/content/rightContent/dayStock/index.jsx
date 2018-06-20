import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

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
                        <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                            {content[0].title}
                        </a>
                    </h4>
                </div>
                <div className={styles.list}>
                    <ul>
                        {content.map((item, index) => (
                            <li key={index}>
                                <div className={styles.pic}>
                                    <a href={item.url} target="_blank" rel={rel}>
                                        <img src={item.thumbnail} width="300" height="166" className={styles.trans} />
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

export default DayStock;
