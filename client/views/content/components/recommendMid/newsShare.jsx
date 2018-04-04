import React from 'react';
import styles from './newsShare.css';

class NewsShare extends React.Component {
    render() {
        const { content } = this.props;
        return this.props.children;
    }
}

export default NewsShare;
