import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class Meeting extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const pic = content[0];
        const list = content.slice(1, 7);

        /**
         * 国子策数据源不确定，先用推荐位代替
         */
        return (
            <div>
                <div className={styles.pic_box}>
                    <a href={pic.url} target="_blank" rel={rel} title={pic.title} className={styles.pic}>
                        <img src={pic.thumbnail} width="300" height="169" alt={pic.title} className={styles.trans} />
                    </a>
                </div>
                <ul className={styles.list}>
                    {list.map(item => (
                        <li key={item.id}>
                            <a href={pic.url} target="_blank" rel={rel} title={item.title}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Meeting;
