import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

class Rights extends React.PureComponent {
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
        return (
            <div style={{ position: 'relative' }}>
                <div ref={this.ref} dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
        );
    }
}

export default errorBoundary(Rights);
