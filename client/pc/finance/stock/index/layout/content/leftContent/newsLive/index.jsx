import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Tab from '../../../../components/tabs/';
import StockNews from './stockNews/';
import Live from './live/';

class NewsLive extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        current: 0,
        selected: true,
    };

    handleTabsChange = index => {
        this.setState({ current: index });
    };

    handleSelected = () => {
        const { selected } = this.state;

        this.setState({ selected: !selected });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, selected } = this.state;
        const { content } = this.props;

        const stockNews = content.stockNews;

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
                <div style={{ display: current === 0 ? 'block' : 'none' }}>
                    <div className={styles.stock_news}>
                        <StockNews content={stockNews.slice(0, 6)} />
                        <StockNews content={stockNews.slice(6, 12)} />
                        <StockNews content={stockNews.slice(12, 18)} />
                    </div>
                </div>
                <div style={{ display: current === 0 ? 'none' : 'block' }}>
                    <Live
                        content={content.liveLogo}
                        current={current}
                        selected={selected}
                        handleSelected={this.handleSelected}
                    />
                </div>
            </div>
        );
    }
}

export default errorBoundary(NewsLive);
