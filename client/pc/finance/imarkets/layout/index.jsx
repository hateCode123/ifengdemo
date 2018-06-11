import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Ad from '../../../components/ad';
import Header from './header';
import Logo from './logo';
import Tools from './tools';
import Shares from './shares';
import NewsDisplay from './news-display';
import NewsStream from './news-stream';
import Question from './question';
import ArticleRankings from './article-rankings';
import HotTopic from './hot-topic';
import CalenderBox from './CalenderBox';
import SuspendedAd from '../components/suspended-ad';
import FooterBox from './footerbox';
import GoToTop from '../components/go-to-top';

class Layout extends PureComponent {
    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;
        const headerData = {
            nav: content.nav
        };
        const footerData = {
            cooperation: content.cooperation,
            footer: content.footer
        };

        return (
            <Fragment>
                <ChipEdit />
                {/* 顶部导航 */}
                <Header content={ headerData } />
                {/* logo和时钟 */}
                <Logo />
                {/* 日历、直播、搜索 */}
                <Tools />
                <div className={ `${ styles.main } clearfix` }>
                    {/* 股票信息 */}
                    <Shares />
                    <div className={ styles.main_middle }>
                        {/* 新闻展示 */}
                        <NewsDisplay />
                        {/* 新闻流 */}
                        <NewsStream />
                    </div>
                    <div className={ styles.main_right }>
                        {/* 在线答疑 */}
                        <Question />
                        {/* 广告 */}
                        <Ad styleName={ styles.ad1 } />
                        {/* 文章点击排行 */}
                        <ArticleRankings />
                        {/* 热点专题 */}
                        <HotTopic />
                        {/* 日历 */}
                        <CalenderBox />
                        {/* 漂浮广告 */}
                        <SuspendedAd />
                    </div>
                </div>
                {/* 底部 */}
                <FooterBox content={ footerData } />
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