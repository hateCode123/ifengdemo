import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import NewsLine from '../newsLine/';

class PureList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    render() {
        const { content } = this.props;

        return <div>{content.map((item, index) => <NewsLine content={item} key={index} />)}</div>;
    }
}

export default errorBoundary(PureList);
