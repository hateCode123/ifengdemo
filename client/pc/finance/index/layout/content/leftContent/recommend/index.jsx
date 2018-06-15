import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class Recommend extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const recommendList = content.map(item => (
            <li key={item.id}>
                <a href={item.url} target="_blank" rel={rel} title={item.title}>
                    {item.title}
                </a>
            </li>
        ));

        return (
            <div className={styles.recommend}>
                <ul>{recommendList}</ul>
            </div>
        );
    }
}

export default Recommend;
