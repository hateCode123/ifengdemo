import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

class InIframe extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    appendIframe = parentNode => {
        const {
            content: { iframeSrc, width, height },
        } = this.props;

        const newFrame = document.createElement('iframe');

        newFrame.src = iframeSrc;
        // FF、IE隐藏边框有效
        newFrame.frameBorder = 0;
        newFrame.scrolling = 'no';
        newFrame.width = width;
        newFrame.height = height;
        newFrame.scrolling = 'no';
        parentNode.appendChild(newFrame);
    };

    componentDidMount() {
        const iframeDom = this.refs.iframe;

        this.appendIframe(iframeDom);
    }

    render() {
        return <div ref="iframe" />;
    }
}

export default errorBoundary(InIframe);
