import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import getData from './comment';

class ContentList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const type = {
            置顶: 'category0',
            专题: 'category1',
            热: 'category2',
            荐: 'category2',
            本地: 'category2',
            快讯: 'category2',
            热门: 'category2',
            突发: 'category2',
            原创: 'category2',
            深度: 'category2',
            独家: 'category2',
            焦点: 'category2',
            '24小时': 'category2',
            广告: 'ad',
        };

        return (
            <div className={styles.contentList}>
                {content.map((item, index) => (
                    <div key={index} className={styles.list}>
                        {item.thumbnail ? (
                            <a
                                href={item.pcUrl}
                                target="_blank"
                                rel="nofollow me noopener noreferrer"
                                className={styles.imgBox}>
                                <img src={item.thumbnail} width="144" height="96" className={styles.trans} />
                            </a>
                        ) : (
                            ''
                        )}
                        <div className={styles.list_text}>
                            <p className={styles.text}>
                                <a
                                    href={item.pcUrl}
                                    target="_blank"
                                    rel="nofollow me noopener noreferrer"
                                    title={item.title}>
                                    {item.title}
                                </a>
                            </p>
                            <p className={styles.time}>
                                {item.custom ? (
                                    <span className={styles[type[`${item.custom.articleTag}`]]}>
                                        {item.custom.articleTag}
                                    </span>
                                ) : (
                                    ''
                                )}
                                {item.source ? <span className={styles.source}>{item.source}</span> : ''}
                                {item.createdTime ? (
                                    <span className={styles.date}>
                                        {Number(item.createdTime.split('-')[0]) < 2018
                                            ? 'item.createdTime'
                                            : `${item.createdTime.split('-')[1]}-${item.createdTime.split('-')[2]}`}
                                    </span>
                                ) : (
                                    ''
                                )}
                            </p>
                        </div>
                        {item.commentUrl ? (
                            <div className={styles.comment}>
                                <a href={item.commentUrl} target="_blank" rel="nofollow me noopener noreferrer">
                                    {/* {item.columns} */}
                                </a>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ContentList.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
ContentList.defaultProps = {};

export { ContentList };
export default ContentList;
