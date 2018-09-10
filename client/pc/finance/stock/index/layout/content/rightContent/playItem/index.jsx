import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class PlayItem extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.playitem}>
                <ul>
                    <li>
                        <a href={content.url} target="_blank" rel={rel}>
                            {content.title}
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default errorBoundary(PlayItem);
