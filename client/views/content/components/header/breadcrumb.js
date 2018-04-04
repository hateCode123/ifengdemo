import React from 'react';
import styles from './breadcrumb.css';
class Comp extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div className={styles.theCurrent}>
                {content.map((item, index) => <span key={index}><a href={item.url}>{item.title}</a> &gt; </span>)}
                正文
            </div>
        );
    }
}

export default Comp;
