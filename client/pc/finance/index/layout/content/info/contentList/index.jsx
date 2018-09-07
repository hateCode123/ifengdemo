import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import md5 from 'md5';
import { Event } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../utils/rel';
import { handleAd } from '../../../../../../utils/utils';

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
        try {
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
        } catch (e) {
            console.error(e);
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

    handleNewstime = time => {
        const d = new Date();

        time = time.substr(0, time.length - 3);
        const year = Number(time.split('-')[0]);

        if (year < d.getFullYear()) {
            return time;
        } else {
            return time.substr(5, time.length);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, counts } = this.props;
        const listStyle = {};

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
                        {item.thumbnails && item.thumbnails !== '' ? (
                            <a href={item.url} target="_blank" rel={rel} className={styles.imgBox}>
                                <img src={item.thumbnails} width="144" height="96" className={styles.trans} />
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
                                {item.source ? <span className={styles.source}>{item.source}</span> : ''}
                                {item.newsTime && item.newsTime !== '' ? (
                                    <span className={styles.date}>{this.handleNewstime(item.newsTime)}</span>
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

export default errorBoundary(ContentList);
