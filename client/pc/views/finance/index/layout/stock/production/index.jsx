import React from 'react';
import PropTypes from 'prop-types';

class Production extends React.PureComponent {
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
        return <div style={{ overflow: 'hidden' }} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
Production.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Production.defaultProps = {};

export { Production };
export default Production;
