import React from 'react';
import styles from './adExtend.css';
class Comp extends React.Component {
    createMarkup = () => {
        return {__html: this.props.content};
    }
    render() {
        return (
            <div className={styles.box} dangerouslySetInnerHTML={this.createMarkup()}></div>
        );
    }
}

export default Comp;
