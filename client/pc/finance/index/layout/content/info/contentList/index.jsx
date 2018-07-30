import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import md5 from 'md5';
import { Event } from '@ifeng/ui_base';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import { rel } from '../../../../../../utils/rel';
import { handleAd } from '../../../../../../utils/infoAd';

const event = new Event();

class ContentList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        counts: PropTypes.array,
        infoAd: PropTypes.object,
        adAddType: PropTypes.string,
        tabIndex: PropTypes.number,
        pageSize: PropTypes.number,
        index: PropTypes.number,
    };

    state = {
        isOver: false,
    };

    async componentDidMount() {
        const { infoAd, index } = this.props;

        if (index === 0) {
            const callback = await handleAd(infoAd);

            callback(infoAd.data, event);
        }
    }

    componentDidUpdate() {
        const { adAddType, tabIndex, pageSize, index } = this.props;

        if (tabIndex === index) {
            if (adAddType === 'init') {
                event.trigger('init', { tabIndex, pageSize, container: this.infoRef.current });
            } else if (adAddType === 'tabChange') {
                event.trigger('tabChange', { tabIndex, pageSize, container: this.infoRef.current });
            } else if (adAddType === 'loadMoreCmp') {
                event.trigger('loadMoreCmp', { tabIndex, pageSize, container: this.infoRef.current });
            }
        }
    }

    /**
     * 获取skey方法
     */
    getSkey = (title, url) => {
        const str = `Ifeng888${encodeURI(title)}${encodeURI(url)}`;
        const skey = md5(str);

        return skey.substr(2, 6).toLowerCase();
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, counts } = this.props;
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
        };

        this.infoRef = React.createRef();

        return (
            <div ref={this.infoRef}>
                {content.map((item, index) => (
                    <div
                        key={index}
                        className={styles.list}
                        onMouseEnter={this.handleMouseOver}
                        onMouseLeave={this.handleMouseOver}
                        style={listStyle}>
                        {item.thumbnails && item.thumbnails !== '' && item.thumbnails.length !== 0 ? (
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
                                <a href={item.url} target="_blank" rel={rel} title={item.title}>
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
                                {item.newsTime && item.newsTime !== '' ? (
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

export default errorBoundary(dataProcessing(ContentList));
