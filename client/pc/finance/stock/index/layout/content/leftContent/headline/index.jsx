import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 Cooperation 组件
 */
class Headline extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    /**
     * 插入 Headline html
     */
    createHeadline = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <div dangerouslySetInnerHTML={this.createHeadline()} />
            </div>
        );
    }
}

export default errorBoundary(Headline);
