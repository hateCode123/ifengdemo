import React from 'react';
import styles from './qrCode.css';

class QrCode extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div className={styles.box}>
                {content.map((item, index) => (
                    <div key={index}>
                        <img src={item} />
                    </div>
                ))}
            </div>
        );
    }
}

export default QrCode;
