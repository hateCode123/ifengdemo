import React from 'react';
import PropTypes from 'prop-types';
import '../reset.css';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';

import TopAd from './topAd/';
import Navigation from './navigation/';
import Topic from './topic/';
import { Recommend } from './recommend';
import { Headline } from './headline';
import PaperContent from './paperContent';
import TitleR from './titleR';
import { Live } from './live';
import Hq from './hq';
import ClickRank from './clickRank';
import { Qa } from './QA';
import { Header } from './header';
import { BottomFooter } from './footer';
import { Slide } from './slide';

class Layout extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        console.log(content);

        const headerData = {
            nav: content.nav,
            search: content.search,
            logo: content.logo,
        };

        const paperData = {
            hardAd: content.hardAd,
            paperMenu: content.paperMenu,
            newPaper: content.newPaper.list,
            newPaperExtra: content.newPaperExtra,
            investInfo: content.investInfo.list,
            ssComponey: content.ssComponey.list,
            newPaperMore: content.newPaperMore,
            investMore: content.investMore,
            ssComMore: content.ssComMore,
        };

        const liveData = {
            liveTitle: content.liveTitle,
            liveImg: content.liveTitle.liveimg,
        };

        const hqData = {
            hqTitle: content.hqTitle,
            hqSubtitle: {
                spzngTit: content.spzngTit,
                zdphTit: content.zdphTit,
                zjlxTit: content.zjlxTit,
                zxgTit: content.zxgTit,
            },
        };

        const QaData = {
            title: content.QATitle,
            liveImg: content.QATitle.liveimg,
            tabs: content.QATabs,
        };

        const clickRankData = {
            clickRankTitle: content.clickRankTitle,
            clickRank: content.clickRank,
        };

        const footerData = {
            cooperation: content.cooperation,
            bottomAd: content.bottomAd,
            copyright: content.copyright,
        };

        return (
            <div>
                <Header content={headerData} />
                <div className={styles.col_w1000}>
                    <TopAd content={content.topAd} />
                    <Navigation content={content.navigation} />
                </div>

                <div className={styles.col_w1000}>
                    <div className={styles.fl}>
                        <Topic />
                        <Chip id="20035" type="recommend" title="头条新闻" groupName="文章" content={content.headline}>
                            <Headline />
                        </Chip>
                    </div>
                    <div className={styles.fr}>
                        <Chip
                            id={content.videoAnalysis.id}
                            type="static"
                            title="视频解盘"
                            content={content.videoAnalysis.content}>
                            <Recommend />
                        </Chip>
                        <Chip
                            id={content.stockCompetition.id}
                            type="static"
                            title="炒股大赛"
                            content={content.stockCompetition.content}>
                            <Recommend />
                        </Chip>
                    </div>
                </div>

                <div className={styles.col_w1000}>
                    <div className={styles.fl640}>
                        <Chip id="10116" type="static" title="轮播" content={content.sliderData}>
                            <Slide />
                        </Chip>
                        <PaperContent content={paperData} />
                    </div>
                    <div className={styles.fr300}>
                        <Chip id="10056" type="static" title="牛人解盘" groupName="文章" content={content.nrjp}>
                            <Recommend />
                        </Chip>

                        <Live content={liveData} />

                        <Hq content={hqData} />

                        <Qa content={QaData} />

                        <ClickRank content={clickRankData} />

                        <div className={styles.mt30}>
                            <Chip
                                id="10062"
                                type="static"
                                title="微信公众号标题"
                                groupName="文章"
                                content={content.wxTitle}>
                                <TitleR content={content.wxTitle} />
                            </Chip>
                            <Chip
                                id="10068"
                                type="static"
                                title="微信公众号"
                                groupName="文章"
                                content={content.wxPublic.content}>
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
                <ChipEdit />
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
