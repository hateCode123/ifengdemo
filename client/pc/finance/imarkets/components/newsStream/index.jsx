/**
 * 新闻流
 * props:
 *   content { Array }           : 信息流的数据
 *   isDisplaySource { boolean } : 是否显示新闻来源
 *   columnId { number }         : 碎片id
 *   isEnd { boolean }           : 是否已显示全部，true 已显示全部，false 还有数据
 *   repeatedID { Array<string> }: 信息流内用于排重的id数组
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { getCommentCount } from '../../../../services/api';
import { getImage } from '../../../../utils/cutImg';
import { formatTime } from '../../../../utils/formatTime';
import { formatUrl } from '../../../../utils/formatUrl';
import { rel as relText } from '../../../../utils/rel';

class NewsStream extends PureComponent {
    static propTypes = {
        isDisplaySource: PropTypes.bool,
        content: PropTypes.array,
        repeatedID: PropTypes.arrayOf(PropTypes.string),
    };
    static defaultProps = {
        isDisplaySource: true,
        repeatedID: [],
    };

    countMapCache = {}; // 文章评论数，用于判断评论的数据是否已经读取
    countMap = {}; // 文章评论数，渲染list后清空

    componentDidMount() {
        this.getCount(Object.keys(this.countMap), Object.values(this.countMap));
    }
    // 获取评论列表
    async getCount(docKey, docValue) {
        try {
            const data = await getCommentCount(docValue);

            for (let i = 0, j = data.length; i < j; i++) {
                const item = data[i];

                if (item.allcount !== 0) {
                    document.getElementById(`count${docKey[i]}`).innerHTML = item.allcount;
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    // 判断为3图模式
    isThreeImage = item => item.thumbnails && item.thumbnails !== '' && item.thumbnails.image.length >= 3;
    // 判断为1图模式
    isOneImage = item =>
        item.thumbnails &&
        item.thumbnails !== '' &&
        item.thumbnails.image.length < 3 &&
        item.thumbnails.image.length > 0;
    // 3图模式渲染
    threeImageItemView(item, url, pinglunUrl) {
        const image = item.thumbnails.image;

        return (
            <li
                key={`${item.id}_${item.creator}_${item.newsTime}`}
                className={`${styles.news_item_3_image} clearfix`}
                data-id={item.id}>
                <h2 className={`${styles.news_item_title} ${styles.mb16}`}>
                    <a href={url} target="_blank" rel={relText}>
                        {item.title}
                    </a>
                </h2>
                <a className={`${styles.image_link_3} ${styles.mr11}`} href={url} target="_blank" rel={relText}>
                    <img src={getImage(image[0].url, 203, 130)} title={item.title} />
                </a>
                <a className={`${styles.image_link_3} ${styles.mr11}`} href={url} target="_blank" rel={relText}>
                    <img src={getImage(image[1].url, 203, 130)} title={item.title} />
                </a>
                <a className={styles.image_link_3} href={url} target="_blank" rel={relText}>
                    <img src={getImage(image[2].url, 203, 130)} title={item.title} />
                </a>
                <div className={`${styles.top_11} ${styles.news_item_infor} clearfix`}>
                    {// 显示来源
                    this.props.isDisplaySource && item.source !== '' ? (
                        <span className={`${styles.mr10} ${styles.text}`}>{item.source}</span>
                    ) : null}
                    <time className={styles.text}>{formatTime(item.newsTime)}</time>
                    <a className={styles.ly} id={`count${item.id}`} href={pinglunUrl} target="_blank" rel={relText}>
                        0
                    </a>
                </div>
            </li>
        );
    }
    // 1图模式渲染
    oneImageItemView(item, url, pinglunUrl) {
        const image = item.thumbnails.image;

        return (
            <li
                key={`${item.id}_${item.creator}_${item.newsTime}`}
                className={`${styles.news_item_has_image} clearfix`}
                data-id={item.id}>
                <a className={styles.image_link} href={url} target="_blank" rel={relText}>
                    {// 是否为视频
                    item.videoCount ? <div className={styles.play} /> : null}
                    {// 是否为图集
                    item.type === 'slide' ? <span className={styles.tuji}>图集</span> : null}
                    <img src={getImage(image[0].url, 144, 80)} title={item.title} />
                </a>
                <div className={styles.news_item_infor}>
                    <h2 className={`${styles.news_item_title} ${styles.mb34}`}>
                        <a href={url} target="_blank" rel={relText}>
                            {item.title}
                        </a>
                    </h2>
                    <div className="clearfix">
                        {// 显示来源
                        this.props.isDisplaySource && item.source !== '' ? (
                            <span className={`${styles.mr10} ${styles.text}`}>{item.source}</span>
                        ) : null}
                        <time className={styles.text}>{formatTime(item.newsTime)}</time>
                        <a className={styles.ly} id={`count${item.id}`} href={pinglunUrl} target="_blank" rel={relText}>
                            0
                        </a>
                    </div>
                </div>
            </li>
        );
    }
    // 无图模式
    noImageItemView(item, url, pinglunUrl) {
        return (
            <li
                key={`${item.id}_${item.creator}_${item.newsTime}`}
                className={`${styles.news_item_no_image} clearfix`}
                data-id={item.id}>
                <div className={styles.news_item_infor}>
                    <h2 className={`${styles.news_item_title} ${styles.mb34}`}>
                        <a href={url} target="_blank" rel={relText}>
                            {item.title}
                        </a>
                    </h2>
                    <div className="clearfix">
                        {// 显示来源
                        this.props.isDisplaySource && item.source !== '' ? (
                            <span className={`${styles.mr10} ${styles.text}`}>{item.source}</span>
                        ) : null}
                        <time className={styles.text}>{formatTime(item.newsTime)}</time>
                        <a className={styles.ly} id={`count${item.id}`} href={pinglunUrl} target="_blank" rel={relText}>
                            0
                        </a>
                    </div>
                </div>
            </li>
        );
    }
    // 渲染list
    listView(list) {
        this.countMap = {};
        const endIndex = list.length - 1;
        const id = [];

        return list.map((item, index) => {
            // 获取最后一位的信息，用于加载信息流
            if (index === endIndex) this.lastItem = item;

            // 和推荐位或信息流本身的id去重
            if (this.props.repeatedID.includes(item.id) || id.includes(item.id)) return null;

            // 将已渲染id加入到数组
            id.push(item.id);

            // 格式化url
            const url = formatUrl(item.url);

            // 评论
            if (!(item.id in this.countMapCache)) {
                this.countMapCache[item.id] = item.commentUrl;
                this.countMap[item.id] = item.commentUrl;
            }

            // 评论地址
            const query = `docUrl=${item.commentUrl}&docName=${item.title}&skey=${item.skey}&pcUrl=${item.url}`;
            const pinglunUrl = `https://gentie.ifeng.com/view.html?${query}`;

            // 3图模式
            if (this.isThreeImage(item)) return this.threeImageItemView(item, url, pinglunUrl);

            // 1图模式
            if (this.isOneImage(item)) return this.oneImageItemView(item, url, pinglunUrl);

            // 无图模式
            return this.noImageItemView(item, url, pinglunUrl);
        });
    }
    // 查看更多
    moreView() {
        return this.state.isEnd ? (
            <span className={styles.is_end}>已显示全部</span>
        ) : (
            <a className={styles.more} onClick={this.handleGetColumnInfoClick}>
                查看更多新闻
            </a>
        );
    }
    render() {
        const { content } = this.props;

        if (content.length === 0) {
            return (
                <div>
                    <div className={styles.more_box}>
                        <span className={styles.is_end}>暂无数据</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {/* 新闻列表 */}
                    <ul className={styles.news_list}>{this.listView(content)}</ul>
                    <div className={styles.more_box}>
                        <a
                            className={styles.more}
                            href="http://finance.ifeng.com/listpage/794/1/list.shtml"
                            target="_blank"
                            rel={relText}>
                            查看更多新闻
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export { NewsStream };
export default NewsStream;
