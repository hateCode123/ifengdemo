import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Layout extends React.Component {
    render() {
        const { content } = this.props;

        return (
            <div className={styles.wrapper}>
                <div className={styles.box}>hello</div>
            </div>
        );
    }
}

Layout.propTypes = { content: PropTypes.object };

Layout.defaultProps = {};

export default Layout;
