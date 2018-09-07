import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

class AnswerList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createAnswerList = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <div dangerouslySetInnerHTML={this.createAnswerList()} />
            </div>
        );
    }
}

export default errorBoundary(AnswerList);
