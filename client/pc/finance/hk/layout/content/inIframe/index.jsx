import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class InIframe extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { iframeSrc, width, height },
        } = this.props;

        return <iframe src={iframeSrc} className={styles.frameBox} scrolling="no" width={width} height={height} />;
    }
}

export default errorBoundary(InIframe);
