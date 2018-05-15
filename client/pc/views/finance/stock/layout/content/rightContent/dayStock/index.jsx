import React from 'react';
import PropTypes from 'prop-types';

class DayStock extends React.PureComponent {
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
        return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
DayStock.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
DayStock.defaultProps = {};

export { DayStock };
export default DayStock;
