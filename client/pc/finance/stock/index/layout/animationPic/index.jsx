import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class AnimationPic extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.animationPic}>
                <a href={content.url} target="_blank" rel={rel}>
                    <img src={content.src} />
                </a>
                <span className={styles.close} />
            </div>
        );
    }
}

export default AnimationPic;
