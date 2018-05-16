import React from 'react';
import PropTypes from 'prop-types';

/**
 * 定义 Cooperation 组件
 */
class Cooperation extends React.PureComponent {
    /**
     * 插入 Cooperation html
     */
    createCooperation = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <div dangerouslySetInnerHTML={this.createCooperation()} />;
    }
}

/**
 * 定义组件属性类型
 * */
Cooperation.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Cooperation.defaultProps = {};

export { Cooperation };
export default Cooperation;
