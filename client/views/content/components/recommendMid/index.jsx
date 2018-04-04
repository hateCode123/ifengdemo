import React from 'react';
import styles from './index.css';
import NewsShare from './newsShare.jsx';

class Comment extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div className={styles.box}>
                <h2>
                    <i>为您推荐</i>
                </h2>
                <div className={styles.list}>
                    {content.map((item, index) => (
                        <div className={styles.item} key={index}>
                            {item.pic ? (
                                <div className={styles.pic}>
                                    <a href={item.url} target="_blank">
                                        <img src={item.pic} />
                                    </a>
                                </div>
                            ) : null}
                            <div className={styles.info}>
                                <h3>
                                    <a href={item.url} target="_blank">
                                        {item.title}
                                    </a>
                                </h3>
                                <div className={styles.tools}>
                                    {item.source ? <div className={styles.source}>{item.source}</div> : null}
                                    <div className={styles.time}>{item.time}</div>
                                    <div className={styles.comment}>
                                        <a
                                            href={`//gentie.ifeng.com/view.html?docName=${item.title}&docUrl=${
                                                item.docUrl
                                            }&skey=${item.skey}&pcUrl=${item.pcUrl}`}>
                                            0
                                        </a>
                                    </div>
                                    <NewsShare>
                                        <div className={styles.share} />
                                    </NewsShare>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default Comment;
