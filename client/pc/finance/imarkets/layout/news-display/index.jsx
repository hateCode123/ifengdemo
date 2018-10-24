/**
 * 置顶新闻显示
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Zhiboshi from './zhiboshi';
import { rel as relText } from '../../../../utils/rel';

class NewsDisplay extends PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    newsGroupView() {
        const topnews = this.props.content;
        const element = [];
        let children = [];

        for (let i = 0, j = topnews.length, k = j - 1; i < j; i++) {
            const item = topnews[i];

            if (i % 3 === 0) {
                children.push(
                    <h3 key={item.id} className={styles.top_news_title}>
                        <a href={item.url} title={item.title} target="_blank" rel={relText}>
                            {item.title}
                        </a>
                    </h3>,
                );
            } else {
                children.push(
                    <p key={item.id} className={styles.top_news_item}>
                        <a href={item.url} title={item.title} target="_blank" rel={relText}>
                            {item.title}
                        </a>
                    </p>,
                );
            }

            if (children.length > 0 && (children.length === 3 || i === k)) {
                element.push(
                    <div key={i} className={styles.top_news}>
                        {children}
                    </div>,
                );
                children = [];
            }
        }

        return element;
    }
    render() {
        return (
            <div className={styles.news_display_box}>
                {/* 置顶新闻 */}
                {this.newsGroupView()}
                {/* 直播室链接 */}
                <Zhiboshi />
            </div>
        );
    }
}

export { NewsDisplay };
export default NewsDisplay;
