import React from 'react';
import PropTypes from 'prop-types';
import dataProcessing from '../../../../../../../components/dataProcessing';

class ExtraNews extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

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

export default dataProcessing(ExtraNews);
