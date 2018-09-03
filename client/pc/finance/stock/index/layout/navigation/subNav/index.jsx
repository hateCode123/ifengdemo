import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../utils/rel';

class SubNav extends React.PureComponent {
    static propTypes = { content: PropTypes.array };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.sub_nav}>
                {content.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel={rel} title={item.title}>
                        {item.title}
                    </a>
                ))}
            </div>
        );
    }
}

export default errorBoundary(SubNav);
