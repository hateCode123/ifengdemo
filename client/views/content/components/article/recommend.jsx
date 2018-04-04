import React from 'react';
import styles from './recommend.css';

class Recommend extends React.Component {
    createMarkup = () => {
        return {__html: this.props.content};
    }
    render() {
        return <div className={styles.box} dangerouslySetInnerHTML={this.createMarkup()}></div>;
    }
}

export default Recommend;
