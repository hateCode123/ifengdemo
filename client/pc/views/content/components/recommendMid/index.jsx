import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import NewsShare from './newsShare/';

/**
 * 定义 Comment 组件
 */
class Comment extends React.PureComponent {
    /**
     * 渲染组件
     */
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
                                    <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer">
                                        <img src={item.pic} />
                                    </a>
                                </div>
                            ) : null}
                            <div className={styles.info}>
                                <h3>
                                    <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer">
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

/**
 * 定义组件属性类型
 * */
Comment.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Comment.defaultProps = {};

export { Comment };
export default Comment;
