/**
 * html直接插入的组件
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HtmlRegion extends PureComponent {
    /**
     * 插入 Cooperation html
     */
    createHtml = ()=>{
        return { __html: this.props.content };
    };
    /**
     * 渲染组件
     */
    render() {
        return <div dangerouslySetInnerHTML={ this.createHtml() } />;
    }
}

/**
 * 定义组件属性类型
 * */
HtmlRegion.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
HtmlRegion.defaultProps = {};

export { HtmlRegion };
export default HtmlRegion;
