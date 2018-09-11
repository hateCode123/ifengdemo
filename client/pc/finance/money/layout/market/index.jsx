import React from 'react';
import PropTypes from 'prop-types';
import '../../reset.css';

import Chip from 'Chip';
import CommonTitleM from './../commonTitleM/';
import errorBoundary from '@ifeng/errorBoundary';

class Inner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createHtml = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div dangerouslySetInnerHTML={this.createHtml()} />;
    }
}

class Market extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;

        return (
            <div className="bor w300 fl">
                <CommonTitleM content={content.title} />

                <Chip
                    id="15026"
                    type="static"
                    title="理财超市"
                    groupName="理财超市"
                    translate="jsonParse"
                    content={content.content}>
                    <Inner />
                </Chip>
            </div>
        );
    }
}

export default errorBoundary(Market);
