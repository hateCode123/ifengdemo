import React from 'react';
import PropTypes from 'prop-types';

class JumpLink extends React.PureComponent {
    /**
     * 插入 html
     */
    createMarkup = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <div style={{ float: 'right' }} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
JumpLink.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
JumpLink.defaultProps = {};

export { JumpLink };
export default JumpLink;
