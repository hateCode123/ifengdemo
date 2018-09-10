import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../../utils/rel';

class CourierTitle extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.caption}>
                <a href={content.url} target="_blank" rel={rel} title={content.title}>
                    {content.title}
                </a>
            </div>
        );
    }
}

export default CourierTitle;
