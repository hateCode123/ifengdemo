import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header/';
import Navigation from './navigation/';
import AnimationPic from './animationPic/';
import StockPlate from './stockPlate/';
import StockSearch from './stockSearch/';
import JumpLink from './jumpLink/';
import Content from './content';
import HotSpots from './hotSpots';
import School from './school';
import BottomFooter from './footer/';
import Cooperation from './cooperation/';
import QrCode from './qrCode/';
import BottomAffix from './bottomAffix/';

class Layout extends React.PureComponent {
    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;

        const headerData = {
            nav: content.nav,
            search: content.search,
            topAd: content.topAd,
            logo: content.logo,
            logoAd: content.logoAd,
        };
        const navigationData = {
            nav: content.navigation,
            subNav: content.subNavigation,
        };
        const stockPlate = content.stockPlate;
        const animationPic = content.animationPic;
        const jumpLink = content.jumpLink;
        const contentData = {
            leftContent: {
                headline: content.headline,
                broadcast: content.broadcast,
                newsLive: {
                    newsLiveTab: content.newsLiveTab,
                    newsLiveTabLink: content.newsLiveTabLink,
                    stockNews: content.stockNews,
                    liveLogo: content.liveLogo,
                },
                news: {
                    newsTab: content.newsTab,
                    newsSubTab: content.newsSubTab,
                    news: content.news,
                },
                answer: {
                    answerTab: content.answerTab,
                    answerSubTab: content.answerSubTab,
                    answerList: content.answerList,
                },
                leftAsideAd: content.leftAsideAd,
            },
            bannerPic: content.bannerPic,
            middleContent: {
                cattleStocksTitle: content.cattleStocksTitle,
                rankTitle: content.rankTitle,
                fundsFlowTitle: content.fundsFlowTitle,
                customStocksTitle: content.customStocksTitle,
                QaTitle: content.QATitle,
                QaTabs: content.QATabs,
            },
            rightContent: {
                subjectTitle: content.subjectTitle,
                subject: content.subject,
                marketTitle: content.marketTitle,
                market: content.market,
                courier: {
                    courierTitle: content.courierTitle,
                    courier: content.courier,
                },
                playItem: content.playItem,
                rightSideAd: content.rightSideAd,
                linkList: content.linkList,
                dayStock: content.dayStock,
            },
        };
        const hotSpotsData = {
            hotSpotsTitle: content.hotSpotsTitle,
            hotSpotsSubTitle1: content.hotSpotsSubTitle1,
            marketAnalysis: content.marketAnalysis,
            hotSpotsSubTitle2: content.hotSpotsSubTitle2,
            hotPlate: content.hotPlate,
            industryTitle: content.industryTitle,
            industry: content.industry,
            hyin: content.hyin,
            hyout: content.hyout,
            gnin: content.gnin,
            gnout: content.gnout,
            singleStockTitle: content.singleStockTitle,
            marketRadarTabs: content.marketRadarTabs,
            marketRadar: content.marketRadar,
            trackTabs: content.trackTabs,
            track: content.track,
            fiveDaysTabs: content.fiveDaysTabs,
            fiveDaysBuy: content.fiveDaysBuy,
            fiveDaysSell: content.fiveDaysSell,
            hotSpotsAd: content.hotSpotsAd,
        };
        const schoolData = {
            schoolTitle: content.schoolTitle,
            schoolSubTitle1: content.schoolSubTitle1,
            logs: content.logs,
            schoolSubTitle2: content.schoolSubTitle2,
            school: content.school,
            starAnalystTitle: content.starAnalystTitle,
            starAnalyst: content.starAnalyst,
            starSrank: content.starSrank,
            starMrank: content.starMrank,
            starLrank: content.starLrank,
            stockPickingTitle: content.stockPickingTitle,
            stockpool: content.stockpool,
            stockpoolData: content.stockpoolData,
            chgpctest: content.chgpctest,
            chgpctestData: content.chgpctestData,
            levelup: content.levelup,
            levelupData: content.levelupData,
            firstfocus: content.firstfocus,
            firstfocusData: content.firstfocusData,
            focusest: content.focusest,
            focusestData: content.focusestData,
            schoolAd: content.schoolAd,
        };

        const footerData = {
            bottomAd: content.bottomAd,
            footer: content.footer,
        };
        const cooperation = content.cooperation;
        const qrCode = content.qrCode;

        return (
            <div className={styles.col_box}>
                <Header content={headerData} />
                <div className={styles.content}>
                    <div className={styles.col}>
                        <Navigation content={navigationData} />
                        <AnimationPic content={animationPic} />
                        <StockPlate content={stockPlate} />
                        <div className={styles.search_box}>
                            <StockSearch />
                            <Chip id="10044" type="static" title="导航跳转链接" groupName="导航栏" content={jumpLink}>
                                <JumpLink />
                            </Chip>
                            <div className="clear" />
                        </div>
                    </div>
                    <div className={styles.space20} />
                    <Content content={contentData} />
                    <div className={styles.space30} />
                    <HotSpots content={hotSpotsData} />
                    <div className={styles.space30} />
                    <School content={schoolData} />
                </div>
                <Cooperation content={cooperation} />
                <BottomFooter content={footerData} />
                <div className={styles.space25} />
                <Chip id="10136" type="static" title="二维码" groupName="二维码" content={qrCode}>
                    <QrCode />
                </Chip>
                <BottomAffix />
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

export { Layout };
export default Layout;
