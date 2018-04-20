import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class News extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        console.log(content);

        return (
            <div className={styles.contentList}>
                {content.map((item, index) => (
                    <div key={index} className={styles.list}>
                        {item.poster ? (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="nofollow me noopener noreferrer"
                                className={styles.imgBox}>
                                <img src={item.poster} width="144" height="96" className={styles.trans} />
                            </a>
                        ) : (
                            ''
                        )}
                        <div className={styles.list_text}>
                            <p className={styles.text}>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="nofollow me noopener noreferrer"
                                    title={item.title}>
                                    {item.title}
                                </a>
                            </p>
                            <p className={styles.time}>
                                <span className={styles[`${item.typeStyle}`]}>{item.type}</span>
                                <span className={styles.source}>{item.source}</span>
                                <span className={styles.date}>{item.date}</span>
                                <span className={styles.date}>{item.time}</span>
                            </p>
                        </div>
                            <div className={styles.comment}>
                                <a href="#" target="_blank" rel="nofollow me noopener noreferrer">
                                    1225
                                </a>
                            </div>
                    </div>
                ))}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
News.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
News.defaultProps = {};

export { News };
export default News;