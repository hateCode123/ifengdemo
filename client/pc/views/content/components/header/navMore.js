import React from 'react';
import styles from './navMore.css';
class Comp extends React.Component {
    render() {
        const { content } = this.props;
        const createList = () => (
            <ul className={styles.more}>
                {content.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        );
        return (
            <div className={styles.morehNew}>
                <ul>
                    <li>
                        <a href="//www.ifeng.com/daohang/" target="_blank">
                            更多
                        </a>
                        {createList()}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Comp;
