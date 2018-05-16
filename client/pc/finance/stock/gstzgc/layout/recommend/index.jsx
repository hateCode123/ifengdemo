import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Recommend 组件
 */
class Recommend extends React.PureComponent {
    /**
     *
     */
    createMarkup = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <div className={styles.box} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
Recommend.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Recommend.defaultProps = {};

export { Recommend };
export default Recommend;
