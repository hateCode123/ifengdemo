import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 Cooperation 组件
 */
class Cooperation extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

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

export default errorBoundary(Cooperation);
