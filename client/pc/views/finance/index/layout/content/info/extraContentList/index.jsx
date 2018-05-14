import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import { jsonp } from '@ifeng/ui_base';
import md5 from 'md5';

class ExtraContentList extends React.PureComponent {
    state = {
        isOver: false,
        counts: [],
    };

    /**
     * 获取skey方法
     */
    getSkey = (title, url) => {
        const str = `Ifeng888${encodeURI(title)}${encodeURI(url)}`;
        const skey = md5(str);

        return skey.substr(2, 6).toLowerCase();
    };

    /**
     * 获取评论数
     */
    async componentDidMount() {
        const { content } = this.props;
        const count = [];

        const docUrl = content.map(item => item.commentUrl);

        const data = await jsonp('//comment.ifeng.com/get.php', {
            data: {
                job: 4,
                format: 'js',
                callback: 'getAllComment1',
                docurl: docUrl.join('|'),
            },
        });

        data.forEach(item => {
            count.push(item.count);
        });

        this.setState({ counts: count });
    }

    /**
     * 渲染组件
     */
    render() {
        const { counts } = this.state;
        const { content } = this.props;
        const listStyle = {};
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
            <div className={styles.ExtraContentList}>
                {content.map((item, index) => (
                    <div
                        key={index}
                        className={styles.list}
                        onMouseEnter={this.handleMouseOver}
                        onMouseLeave={this.handleMouseOver}
                        style={listStyle}>
                        {item.thumbnails !== '' ? (
                            <a href={item.url} target="_blank" rel={rel} className={styles.imgBox}>
                                <img
                                    src={JSON.parse(item.thumbnails).image[0].url}
                                    width="144"
                                    height="96"
                                    className={styles.trans}
                                />
                            </a>
                        ) : (
                            ''
                        )}
                        <div className={styles.list_text}>
                            <p className={styles.text}>
                                <a href={item.pcUrl} target="_blank" rel={rel} title={item.title}>
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
                                {item.newsTime !== '' ? (
                                    <span className={styles.date}>
                                        {Number(item.newsTime.split('-')[0]) < 2018
                                            ? 'item.createdTime'
                                            : `${item.newsTime.split('-')[1]}-${item.newsTime.split('-')[2]}`}
                                    </span>
                                ) : (
                                    ''
                                )}
                            </p>
                        </div>
                        {item.commentUrl ? (
                            <div className={styles.comment}>
                                <a
                                    href={`//gentie.ifeng.com/view.html?docUrl=${item.commentUrl}&docName=${
                                        item.title
                                    }&skey=${this.getSkey(item.title, item.pcUrl)}&pcUrl&=${item.pcUrl}`}
                                    target="_blank"
                                    rel={rel}>
                                    {counts[index]}
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
ExtraContentList.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
ExtraContentList.defaultProps = {};

export { ExtraContentList };
export default ExtraContentList;
