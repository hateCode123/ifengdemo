import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../../components/errorBoundary';
import dataProcessing from '../../../../../components/dataProcessing';
import { rel } from '../../../../../utils/rel';

class JumpLink extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.link_box}>
                <div className={styles.box}>
                    {content.map((item, index) => (
                        <a key={index} href={item.url} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(JumpLink));
