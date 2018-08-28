import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Layout extends React.Component {
    static propTypes = { content: PropTypes.object };

    static defaultProps = {};

    render() {
        const { content } = this.props;

        return (
            <div className={styles.wrapper}>
                <div className={styles.box}>hello</div>
            </div>
        );
    }
}

export default Layout;
