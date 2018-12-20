import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Content from './content';

class Layout extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };

    render() {
        return (
            <React.Fragment>
                <Content />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Layout);
