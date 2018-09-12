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
import { formatImage, formatUrl } from '@ifeng/public_method';
import styles from './index.css';
import { getCommentCount } from '../../../../services/api';
import { formatTime } from '../../../../utils/formatTime';
import { rel as relText } from '../../../../utils/rel';

class NewsStream extends PureComponent {
    static propTypes = {
        isDisplaySource: PropTypes.bool,
        content: PropTypes.array,
    };
    static defaultProps = {
        isDisplaySource: true,
        repeatedID: [],
    };

    countMapCache = {}; // 文章评论数，用于判断评论的数据是否已经读取
    countMap = {}; // 文章评论数，渲染list后清空
    state = {
        content: this.props.content,
    };

    componentDidMount() {
        this.getCount();
    }
    // 获取评论列表
    async getCount() {
        try {
            // 生成评论地址的数组
            const urlArr = [];
            const keys = [];

            for (const key in this.countMap) {
                keys.push(key);
                urlArr.push(this.countMap[key].commentUrl);
            }

            const data = await getCommentCount(urlArr);

            for (let i = 0, j = data.length; i < j; i++) {
                const item = data[i];

                this.countMap[keys[i]].allcount = item.allcount;
            }

            this.setState({
                content: this.state.content,
            });
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
                    <a href={url} title={item.title} target="_blank" rel={relText}>
                        {item.title}
                    </a>
                </h2>
                <a
                    className={`${styles.image_link_3} ${styles.mr11}`}
                    href={url}
                    title={item.title}
                    target="_blank"
                    rel={relText}>
                    <img src={formatImage(image[0].url, 167, 106)} />
                </a>
                <a
                    className={`${styles.image_link_3} ${styles.mr11}`}
                    href={url}
                    title={item.title}
                    target="_blank"
                    rel={relText}>
                    <img src={formatImage(image[1].url, 167, 106)} />
                </a>
                <a className={styles.image_link_3} href={url} target="_blank" title={item.title} rel={relText}>
                    <img src={formatImage(image[2].url, 167, 106)} />
                </a>
                <div className={`${styles.top_11} ${styles.news_item_infor} clearfix`}>
                    {// 显示来源
                    this.props.isDisplaySource && item.source && item.source !== '' ? (
                        <span className={`${styles.mr10} ${styles.text}`}>{item.source}</span>
                    ) : null}
                    <time className={styles.text}>{formatTime(item.newsTime)}</time>
                    <a className={styles.ly} href={pinglunUrl} title={item.title} target="_blank" rel={relText}>
                        {item.allcount || 0}
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
                <a className={styles.image_link} href={url} title={item.title} target="_blank" rel={relText}>
                    {// 是否为视频
                    item.videoCount ? <div className={styles.play} /> : null}
                    {// 是否为图集
                    item.type === 'slide' ? <span className={styles.tuji}>图集</span> : null}
                    <img src={formatImage(image[0].url, 144, 80)} />
                </a>
                <div className={styles.news_item_infor}>
                    <h2 className={`${styles.news_item_title} ${styles.mb34}`}>
                        <a href={url} title={item.title} target="_blank" rel={relText}>
                            {item.title}
                        </a>
                    </h2>
                    <div className="clearfix">
                        {// 显示来源
                        this.props.isDisplaySource && item.source && item.source !== '' ? (
                            <span className={`${styles.mr10} ${styles.text}`}>{item.source}</span>
                        ) : null}
                        <time className={styles.text}>{formatTime(item.newsTime)}</time>
                        <a className={styles.ly} href={pinglunUrl} target="_blank" rel={relText}>
                            {item.allcount || 0}
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
                        <a href={url} title={item.title} target="_blank" rel={relText}>
                            {item.title}
                        </a>
                    </h2>
                    <div className="clearfix">
                        {// 显示来源
                        this.props.isDisplaySource && item.source && item.source !== '' ? (
                            <span className={`${styles.mr10} ${styles.text}`}>{item.source}</span>
                        ) : null}
                        <time className={styles.text}>{formatTime(item.newsTime)}</time>
                        <a className={styles.ly} href={pinglunUrl} target="_blank" rel={relText}>
                            {item.allcount || 0}
                        </a>
                    </div>
                </div>
            </li>
        );
    }
    // 渲染list
    listView(list) {
        this.countMap = {};
        const id = [];

        return list.map((item, index) => {
            // 将已渲染id加入到数组
            const idKey = `list_${item.id}`;

            id.push(idKey);

            // 格式化url
            const url = formatUrl(item.url);

            // 评论
            if (!(idKey in this.countMapCache)) {
                this.countMapCache[idKey] = item;
                this.countMap[idKey] = item;
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
        const { content } = this.state;

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
                    <ul className={styles.news_list}>{this.listView(this.state.content)}</ul>
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
