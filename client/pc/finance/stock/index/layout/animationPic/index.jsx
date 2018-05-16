import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class AnimationPic extends React.PureComponent {
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

/**
 * 定义组件属性类型
 * */
AnimationPic.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
AnimationPic.defaultProps = {};

export { AnimationPic };
export default AnimationPic;
