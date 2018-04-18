import React from 'react';
import PropTypes from 'prop-types';

/**
 * 定义 NewsShare 组件
 */
class NewsShare extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        
        return this.props.children;
    }
}

/**
 * 定义组件属性类型
 * */
NewsShare.propTypes = { 
    content: PropTypes.object,
    children: PropTypes.object
};

/**
 * 定义组件默认属性
 * */
NewsShare.defaultProps = {};

export { NewsShare };
export default NewsShare;
