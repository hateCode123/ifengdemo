import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../components/dataProcessing';

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
        return <div dangerouslySetInnerHTML={this.createHeadline()} />;
    }
}

export default errorBoundary(dataProcessing(Headline));
