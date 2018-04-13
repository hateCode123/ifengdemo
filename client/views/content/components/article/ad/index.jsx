import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Ad 组件
 */
class Ad extends React.PureComponent {
    /**
     * 
     */
    createMarkup = () => {
        const { content } = this.props;

        return { __html: content };
    }

    /**
     * 渲染组件
     */
    render() {
        return <div className={ styles.box } dangerouslySetInnerHTML={ this.createMarkup() } />;
    }
}

/**
 * 定义组件属性类型
 * */
Ad.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Ad.defaultProps = {};

export { Ad };
export default Ad;
