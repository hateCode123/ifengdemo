import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import errorBoundary from '../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../components/dataProcessing';

class PlayItem extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const content = this.props.content[0];

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

export default errorBoundary(dataProcessing(PlayItem));
