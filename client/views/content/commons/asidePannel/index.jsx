import React from 'react';
import styles from './index.css';

class AsidePannel extends React.Component {
    render() {
        const { title, extraContent, children } = this.props;
        return (
            <div className={styles.box}>
                <div className={styles.title}>
                    {extraContent ? extraContent : null}
                    <h2>{title}</h2>
                </div>
                {children}
            </div>
        );
    }
}

export default AsidePannel;
