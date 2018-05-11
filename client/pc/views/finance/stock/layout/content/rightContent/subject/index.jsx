import React from 'react';
import PropTypes from 'prop-types';

class Subject extends React.PureComponent {
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
Subject.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Subject.defaultProps = {};

export { Subject };
export default Subject;