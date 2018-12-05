import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import Recommend from '../components/recommend';

import Header from './header';
import Navigation from './navigation';
import Topic from './topic/';
import Headline from './headline';
import Slide from './slide';
import PaperContent from './paperContent';
import TitleR from './../components/titleR';
import Live from './live';
import StockHq from './stockHq';
import Qa from './QA';
import ClickRank from './clickRank';
import BottomFooter from './footer';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    componentDidMount() {
        // 上报首屏时间
        if (window && window.BJ_REPORT) window.BJ_REPORT.firstScreen();
    }

    render() {
        const { content } = this.props;

        const headerData = {
            nav: content.nav,
            search: content.search,
            logo: content.logo,
        };

        const paperData = {
            hardAd02: content.hardAd02,
            hardAd03: content.hardAd03,
            paperMenu: content.paperMenu,
            newPaper: content.newPaper,
            newPaperExtra: content.newPaperExtra,
            investInfo: content.investInfo,
            ssComponey: content.ssComponey,
            newPaperMore: content.newPaperMore,
            investMore: content.investMore,
            ssComMore: content.ssComMore,
        };

        const stockHqData = {
            hqTitle: content.hqTitle,
            cattleStocksTitle: content.cattleStocksTitle,
            rankTitle: content.rankTitle,
            fundsFlowTitle: content.fundsFlowTitle,
            customStocksTitle: content.customStocksTitle,
        };

        const clickRankData = {
            clickRankTitle: content.clickRankTitle,
            clickRank: content.clickRank,
        };

        const footerData = {
            cooperation: content.cooperation,
            hardAd04: content.hardAd04,
            copyright: content.copyright,
        };

        return (
            <div>
                <Header content={headerData} />
                <div className={styles.col_w1000}>
                    <Chip
                        id="10027"
                        type="static"
                        title="投资观察顶部通栏广告"
                        groupName="硬广"
                        content={content.topAd}>
                        <Recommend />
                    </Chip>
                    <Navigation content={content.navigation} />
                </div>

                <div className={styles.col_w1000}>
                    <div className={styles.fl}>
                        <Topic />
                        <Chip id="10030" type="static" title="头条新闻" groupName="文章" content={content.headline}>
                            <Headline />
                        </Chip>
                    </div>
                    <div className={styles.fr}>
                        <Chip id="10036" type="static" title="视频解盘" content={content.videoAnalysis}>
                            <Recommend />
                        </Chip>
                        <Chip id="10037" type="static" title="炒股大赛" content={content.stockCompetition}>
                            <Recommend />
                        </Chip>
                    </div>
                </div>

                <div className={styles.col_w1000}>
                    <div className={styles.fl640}>
                        <Chip id="20036" type="recommend" title="轮播" content={content.sliderData}>
                            <Slide />
                        </Chip>
                        <PaperContent content={paperData} />
                    </div>
                    <div className={styles.fr300}>
                        <Chip id="10056" type="static" title="牛人解盘" groupName="文章" content={content.nrjp}>
                            <Recommend />
                        </Chip>

                        <Live content={content.liveTitle} />

                        <StockHq content={stockHqData} />

                        <div className={styles.mt30}>
                            <Chip
                                id="10060"
                                type="static"
                                title="A股分析师答疑"
                                groupName="文章"
                                translate="jsonParse"
                                content={content.QATitle}>
                                <TitleR content={content.QATitle} />
                            </Chip>
                            <Qa tabs={content.QATabs} />
                        </div>

                        <ClickRank content={clickRankData} />

                        <div className={styles.mt30}>
                            <Chip
                                id="10062"
                                type="static"
                                title="微信公众号标题"
                                groupName="文章"
                                translate="jsonParse"
                                content={content.wxTitle}>
                                <TitleR content={content.wxTitle} />
                            </Chip>
                            <Chip
                                id="10068"
                                type="static"
                                title="微信公众号"
                                groupName="文章"
                                content={content.wxPublic}>
                                <Recommend />
                            </Chip>
                        </div>
                    </div>
                </div>
                <div className={styles.foot}>
                    <div className={styles.col_w1000}>
                        <BottomFooter content={footerData} />
                    </div>
                </div>
                <ChipEdit transform={transform} />
            </div>
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

export default Layout;
