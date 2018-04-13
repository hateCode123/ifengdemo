import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Video 组件
 */
class Video extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return <div className={ styles.box }>视频组件</div>;
    }
}

/**
 * 定义组件属性类型
 * */
Video.propTypes = {};

/**
 * 定义组件默认属性
 * */
Video.defaultProps = {};

export { Video };
export default Video;
