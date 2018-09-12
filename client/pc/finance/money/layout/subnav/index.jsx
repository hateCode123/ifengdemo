import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './style.css';

class Sub extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createHtml = () => {
        return { __html: this.props.content };
    };
    render() {
        return (
            <div className="w1000">
                <div dangerouslySetInnerHTML={this.createHtml()} />
            </div>
        );
    }
}

class SubNavigation extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };
    render() {
        const { content } = this.props;

        return (
            <Chip id="15024" type="static" title="副导航" groupName="导航" translate="jsonParse" content={content}>
                <Sub />
            </Chip>
        );
    }
}

export default errorBoundary(SubNavigation);
