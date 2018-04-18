import React from 'react';
import styles from './ad.css';
class Comp extends React.Component {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={styles.box} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

export default Comp;
