import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 AdExtend 组件
 */
class AdExtend extends React.PureComponent {
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
AdExtend.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
AdExtend.defaultProps = {};

export { AdExtend };
export default AdExtend;
