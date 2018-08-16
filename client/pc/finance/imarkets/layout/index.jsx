import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import Header from './header';
import Logo from './logo';
import Tools from './tools';
import Shares from './shares';
import NewsDisplay from './news-display';
import NewsStream from '../components/newsStream';
import Question from './question';
import HotTopic from './hot-topic';
import CalenderBox from './CalenderBox';
import SuspendedAd from '../components/suspended-ad';
import FooterBox from './footerbox';
import GoToTop from '../components/go-to-top';
import Ad from '../../../components/ad';

class Layout extends PureComponent {
    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;
        const headerData = {
            nav: content.nav,
        };
        const newDisplayData = {
            topnews: content.topnews,
        };
        const newsStreamData = content.newsstream;
        const hotTopicData = {
            hottopic: content.hottopic,
        };
        const footerData = {
            cooperation: content.cooperation,
            footer: content.footer,
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
                        <NewsDisplay content={newDisplayData} />
                        {/* 新闻流 */}
                        <NewsStream content={newsStreamData} />
                    </div>
                    <div className={styles.main_right}>
                        {/* TODO: 分析师答疑内容，新版上线后重新进行规划添加，暂时去掉不显示 */}
                        {/* <Question content={ questionData } /> */}
                        {/* 广告 */}
                        <Ad styleName={styles.ad1} />
                        {/* 热点专题 */}
                        <HotTopic content={hotTopicData} />
                        {/* 日历 */}
                        <CalenderBox />
                        {/* 漂浮广告 */}
                        <SuspendedAd />
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
