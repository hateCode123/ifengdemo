import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import Header from './header';
import Logo from './logo';
import Tools from './tool';
import Shares from './shares';
import NewsDisplay from './news-display';
import NewsStream from '../components/newsStream';
import HotTopic from './hot-topic';
import CalenderBox from './calenderBox';
import SuspendedAd from '../components/suspended-ad';
import FooterBox from './footerbox';
import GoToTop from '../components/go-to-top';
import Ad from '@ifeng/ui_pc_ad';

class Layout extends PureComponent {
    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;
        const headerData = {
            nav: content.nav,
        };
        const newDisplayData = content.topnews;
        const newsStreamData = content.newsstream;
        const hotTopicData = {
            hottopic: content.hottopic,
        };
        const footerData = {
            cooperation: content.cooperation,
            footer: content.footer,
            footerAd: content.footerAd,
        };

        return (
            <Fragment>
                <ChipEdit transform={transform} />
                {/* 顶部导航 */}
                <Header content={headerData} />
                {/* logo和时钟 */}
                <Logo />
                {/* 日历、直播、搜索 */}
                <Tools />
                <div className={`${styles.main} clearfix`}>
                    {/* 股票信息 */}
                    <Shares />
                    <div className={styles.main_middle}>
                        {/* 新闻展示 */}
                        <Chip id={55069} content={newDisplayData} type="recommend" title="推荐位" groupName="推荐位">
                            <NewsDisplay />
                        </Chip>
                        {/* 新闻流 */}
                        <NewsStream content={newsStreamData} />
                    </div>
                    <div className={styles.main_right}>
                        {/* 热点专题 */}
                        <HotTopic content={hotTopicData} />
                        {/* 广告 */}
                        <Ad styleName={styles.ad1} content={content.asideAd} />
                        {/* 日历 */}
                        <CalenderBox />
                        {/* 漂浮广告 */}
                        <SuspendedAd content={content.asideFixedAd} />
                    </div>
                </div>
                {/* 底部 */}
                <FooterBox content={footerData} />
                {/* 返回顶部 */}
                <GoToTop />
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Layout.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Layout.defaultProps = {};

export { Layout };
export default Layout;
