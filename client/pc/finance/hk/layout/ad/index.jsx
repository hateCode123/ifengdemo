import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../utils/rel';

/**
 * 定义 Header 组件
 */
class AD extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.ad} style={{ width: content.width, height: content.height }}>
                <a href={content.url} target="_blank" rel={rel}>
                    <img src={content.imgUrl} />
                </a>
            </div>
        );
    }
}

export default errorBoundary(AD);
