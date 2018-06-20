import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Tab from '../../../../components/tabs/';
import StockNews from './stockNews/';
import Live from './live/';

class NewsLive extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        current: 0,
    };

    handleTabsChange = index => {
        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.state;
        const { content } = this.props;

        let stockNews = [];

        if (content.stockNews) {
            stockNews = content.stockNews.list.slice(0, 18).map(item => ({
                id: item.id,
                url: item.url,
                title: item.title,
            }));
        }

        const title = {
            id: '10049',
            type: 'static',
            title: '要闻直播主标题',
            groupName: '正文',
            content: content.newsLiveTab,
        };

        const newsLiveTabLink = {
            id: '10115',
            type: 'static',
            title: '要闻直播标题外链',
            groupName: '正文',
            content: content.newsLiveTabLink,
        };

        return (
            <div className={styles.news_live}>
                <Tab
                    current={current}
                    title={title}
                    newsLiveTabLink={newsLiveTabLink}
                    handleTabsChange={this.handleTabsChange}
                />
                {current === 0 ? (
                    <div>
                        <div className={styles.stock_news}>
                            <StockNews content={stockNews.slice(0, 6)} />
                            <StockNews content={stockNews.slice(6, 12)} />
                            <StockNews content={stockNews.slice(12, 18)} />
                        </div>
                    </div>
                ) : (
                    <Live content={content.liveLogo} />
                )}
            </div>
        );
    }
}

export default NewsLive;
