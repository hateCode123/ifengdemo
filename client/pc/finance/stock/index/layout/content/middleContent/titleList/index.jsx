import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../../utils/rel';

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
            <div style={{ position: 'relative' }}>
                <h3 className={styles.title}>
                    <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                        {content[0].title}
                    </a>
                </h3>
                <ul className={styles.titleList}>
                    {content.slice(1).map((item, index) => (
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

export default errorBoundary(TitleList);
