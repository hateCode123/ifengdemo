import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../utils/rel';

class TitleList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <ul className={styles.titleList}>
                {content.map(item => (
                    <li key={item.id}>
                        <a href={item.url} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TitleList;