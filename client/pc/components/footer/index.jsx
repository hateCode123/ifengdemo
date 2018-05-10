import React from 'react';
import PropTypes from 'prop-types';

/**
 * 定义 Footer 组件
 */
class Footer extends React.PureComponent {
    /**
     * 插入 Footer html
     */
    createFooter = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <div dangerouslySetInnerHTML={this.createFooter()} />;
    }
}

/**
 * 定义组件属性类型
 * */
Footer.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Footer.defaultProps = {};

export { Footer };
export default Footer;
