import React from 'react';
import styles from './index.css';

class PicList extends React.Component {
    render() {
        const { content, prefix, isVideo } = this.props;
        return (
            <ul className={styles.list}>
                {content.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank">
                            <img src={item.pic} alt={item.title} />
                            <p>{item.title}</p>
                            {isVideo ? <div/> : null}
                        </a>
                        <p>{prefix}：{item.count}</p>
                    </li>
                ))}
            </ul>
        );
    }
}

export default PicList;
