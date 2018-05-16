import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { Tab } from '../../../../components/tabs/';
import StockNews from './stockNews/';
import Live from './live/';

class NewsLive extends React.PureComponent {
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
                            <StockNews content={content.stockNews1} />
                            <StockNews content={content.stockNews2} />
                            <StockNews content={content.stockNews3} />
                        </div>
                    </div>
                ) : (
                    <Live content={content.liveLogo} />
                )}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsLive.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
NewsLive.defaultProps = {};

export { NewsLive };
export default NewsLive;
