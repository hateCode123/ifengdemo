import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Form from './form';

class Content extends React.PureComponent {
    static propTypes = {};

    state = {};

    componentDidMount() {}

    render() {
        return (
            <React.Fragment>
                <div className={styles.editor}>
                    <Form />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
