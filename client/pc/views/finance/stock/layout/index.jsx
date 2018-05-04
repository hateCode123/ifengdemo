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
            topAd: content.topAd,
            logo: content.logo,
            logoAd: content.logo_ad,
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
                newsLive: {
                    newsLiveTab: content.newsLiveTab,
                    stockNews1: content.stockNews1,
                    stockNews2: content.stockNews2,
                    stockNews3: content.stockNews3,
                    liveLogo: content.liveLogo,
                },
                news: {
                    newsTab: content.newsTab,
                    news: content.news,
                },
                answer: {
                    answerTab: content.answerTab,
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
                subject: {
                    subjectTitle: content.subjectTitle,
                    subject: content.subject,
                },
                market: {
                    marketTitle: content.marketTitle,
                    market: content.market,
                },
                courier: content.courier,
                playItem: content.playItem,
                rightSideAd: content.rightSideAd,
                linkList: content.linkList,
                dayStock: {
                    dayStockTitle: content.dayStockTitle,
                    dayStock: content.dayStock,
                },
            },
        };
        const hotSpotsData = {
            hotSpotsTitle: content.hotSpotsTitle,
            hotSpotsSubTitle1: content.hotSpotsSubTitle1,
            marketAnalysis: content.marketAnalysis,
            hotSpotsSubTitle2: content.hotSpotsSubTitle2,
            hotPlate: content.hotPlate,
            industry: content.industry,
            singleStockTitle: content.singleStockTitle,
            marketRadar: content.marketRadar,
            track: content.track,
            fiveDays: content.fiveDays,
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
            stockPickingTitle: content.stockPickingTitle,
            stockPickingData0: content.stockPickingData0,
            stockPickingData1: content.stockPickingData1,
            stockPickingData2: content.stockPickingData2,
            stockPickingData3: content.stockPickingData3,
            stockPickingData4: content.stockPickingData4,
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
                <Chip id="10015" type="static" title="底部合作链接" groupName="底部" content={cooperation}>
                    <Cooperation />
                </Chip>
                <BottomFooter content={footerData} />
                <div className={styles.space25} />
                <QrCode content={qrCode} />
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
