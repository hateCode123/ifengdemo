import React from 'react';
import styles from './nav.css';
class Comp extends React.Component {
    render() {
        const {content} = this.props;
        return (
            <ul className={styles.list_menu}>
                {content.map((item, index)=>(<li key={index}><a href={item.url} target="_blank">{item.title}</a></li>))}
            </ul>
        );
    }
}

export default Comp;
