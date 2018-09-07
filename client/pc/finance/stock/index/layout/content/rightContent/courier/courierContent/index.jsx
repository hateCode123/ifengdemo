import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

class CourierContent extends React.PureComponent {
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
        return <div style={{ position: 'relative' }} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

export default errorBoundary(CourierContent);
