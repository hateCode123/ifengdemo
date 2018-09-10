import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../utils/rel';

class RightSideTitle extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.title}>
                <h4>
                    <a href={content.url} target="_blank" rel={rel} title={content.title}>
                        {content.title}
                    </a>
                </h4>
                {content.more ? (
                    <div className={styles.more}>
                        <a href={content.more} target="_blank" rel={rel}>
                            更多
                        </a>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default errorBoundary(RightSideTitle);
