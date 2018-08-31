import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../../utils/rel';

class Subject extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const pic = content[0];
        const list = content.slice(1, 3);

        return (
            <div className={styles.subject}>
                <div className={styles.pic_box}>
                    <a href={pic.url} target="_blank" rel={rel} title={pic.title} className={styles.pic}>
                        <img src={pic.banner} width="300" height="169" alt={pic.title} className={styles.trans} />
                    </a>
                </div>
                <ul className={styles.list}>
                    {list.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank" rel={rel} title={item.title}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default errorBoundary(Subject);
