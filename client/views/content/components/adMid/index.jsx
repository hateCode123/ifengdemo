import React from 'react';
import styles from './index.css';

class Comment extends React.Component {
    render() {
        return <div className={styles.box} >{this.props.content}</div>;
    }
}

export default Comment;