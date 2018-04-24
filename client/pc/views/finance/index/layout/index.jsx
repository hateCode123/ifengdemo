import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header/';
import Navigation from './navigation/';
import Stock from './stock/';
import Content from './content/';
import BottomFooter from './footer/';
import QrCode from '../components/qrCode/';
import BottomAffix from '../components/bottomAffix/';

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
        const stockData = {
            stock: content.stock,
            stockMarket: content.stockMarket,
            production: content.production,
        };
        const contentData = {
            leftContent: {
                bannerPic: content.bannerPic,
                headline: content.headline,
                dayNews: content.dayNews,
                extraNews: content.extraNews,
                recommend: content.recommend,
            },
            middleContent: {
                comicBook: content.comicBook,
                talking: content.talking,
                talkingList: content.talkingList,
                finance: content.finance,
                financeList: content.financeList,
                stocks: content.stocks,
                stocksList: content.stocksList,
            },
            info: content.info,
            middleAd: content.middleAd,
            rightContent: {
                titleAd: content.titleAd,
                asideAd1: content.asideAd1,
                asideAd2: content.asideAd2,
                asideAd3: content.asideAd3,
                asideAd4: content.asideAd4,
                asideAd5: content.asideAd5,
                asideAd6: content.asideAd6,
                financeVideo: content.financeVideo,
                institute: content.institute,
                meeting: content.meeting,
                market: content.market,
                courier: content.courier,
            },
        };
        const footerData = {
            cooperation: content.cooperation,
            bottomAd: content.bottomAd,
            footer: content.footer,
        };
        const qrCode = content.qrCode;

        return (
            <div className={styles.ip_col}>
                <Header content={headerData} />
                <Chip id="10002" type="static" title="财经导航" groupName="导航栏" content={content.navigation}>
                    <Navigation />
                </Chip>
                <Stock content={stockData} />
                <Content content={contentData} />
                <BottomFooter content={footerData} />
                <div className={styles.bottom} />
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
