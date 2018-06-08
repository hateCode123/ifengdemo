import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header';
import Navigation from './navigation';
import Stock from './stock';
import Content from './content';
import BottomFooter from './footer';
import Cooperation from './cooperation';
import QrCode from './qrCode';
import BottomAffix from './bottomAffix';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

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
        const stockData = {
            stock: content.stock,
            production: content.production,
        };
        const contentData = {
            leftContent: {
                bannerPic: content.bannerPic,
                headline: content.headline,
                rights: content.rights,
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
            bottomAd: content.bottomAd,
            footer: content.footer,
        };
        const cooperation = content.cooperation;
        const qrCode = content.qrCode;

        return (
            <div className={styles.ip_col}>
                <Header content={headerData} />
                <Chip id="10002" type="static" title="财经导航" groupName="导航栏" content={content.navigation}>
                    <Navigation />
                </Chip>
                <Stock content={stockData} />
                <Content content={contentData} />
                <Cooperation content={cooperation} />
                <BottomFooter content={footerData} />
                <div className={styles.bottom} />
                <Chip id="10135" type="static" title="二维码" groupName="二维码" content={qrCode}>
                    <QrCode />
                </Chip>
                <BottomAffix />
                <ChipEdit />
            </div>
        );
    }
}

export default Layout;
