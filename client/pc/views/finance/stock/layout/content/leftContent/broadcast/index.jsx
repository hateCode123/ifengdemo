import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Broadcast extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return <div className={styles.broadcast} />;
    }
}

/**
 * 定义组件属性类型
 * */
Broadcast.propTypes = {};

/**
 * 定义组件默认属性
 * */
Broadcast.defaultProps = {};

export { Broadcast };
export default Broadcast;
