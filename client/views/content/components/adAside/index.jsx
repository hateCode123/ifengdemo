import React from 'react';
import styles from './index.css';

class Comment extends React.Component {
    render() {
        return <div className={styles.box} data-adhook={this.props.content}>{this.props.content}</div>;
    }
}

export default Comment;