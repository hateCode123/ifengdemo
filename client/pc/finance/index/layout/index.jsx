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
import transform from 'chipDataTransform';

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
            channelAd: content.channelAd,
        };
        const contentData = {
            leftContent: {
                bannerPic: content.bannerPic,
                headline: content.headline,
                rights: content.rights,
                dayNews: content.dayNews,
                dayNewsAd: content.dayNewsAd,
                extraNews: content.extraNews,
                extraNewsAd: content.extraNewsAd,
            },
            middleContent: {
                comicBook: content.comicBook,
                talking: content.talking,
                finance: content.finance,
                financeList: content.financeList,
                stocks: content.stocks,
            },
            info: {
                infoAd: content.infoAd,
                hardAd: content.hardAd,
            },
            middleAd: content.middleAd,
            rightContent: {
                asideAd1: content.asideAd1,
                asideAd2: content.asideAd2,
                asideAd3: content.asideAd3,
                asideAd4: content.asideAd4,
                asideAd5: content.asideAd5,
                asideAd6: content.asideAd6,
                asideAd7: content.asideAd7,
                financeVideo: content.financeVideo,
                financeVideoAd: content.financeVideoAd,
                institute: content.institute,
                lark: content.lark,
                meeting: content.meeting,
                meetingAd: content.meetingAd,
                meetingListAd: content.meetingListAd,
                market: content.market,
                marketAd: content.marketAd,
                courier: content.courier,
                courierAd: content.courierAd,
            },
        };
        const footerData = {
            bottomAd: content.bottomAd,
            footer: content.footer,
        };
        const cooperation = content.cooperation;
        const qrCode = content.qrCode;
        const bottomAffixData = {
            floatAd1: content.floatAd1,
            floatAd2: content.floatAd2,
            floatAd3: content.floatAd3,
            floatAd4: content.floatAd4,
            floatAd5: content.floatAd5,
            floatAd6: content.floatAd6,
        };

        return (
            <div className={styles.ip_col}>
                <Header content={headerData} />
                <Chip
                    id="20008"
                    type="struct"
                    title="财经导航"
                    groupName="导航栏"
                    position="relative"
                    content={content.navigation}>
                    <Navigation />
                </Chip>
                <Stock content={content.production} />
                <Content content={contentData} />
                <Chip
                    id="10015"
                    type="static"
                    title="底部合作链接"
                    groupName="底部合作链接"
                    position="relative"
                    content={cooperation}>
                    <Cooperation />
                </Chip>
                <BottomFooter content={footerData} />
                <div className={styles.bottom} />
                <Chip id="20013" type="struct" title="二维码" groupName="二维码" position="relative" content={qrCode}>
                    <QrCode />
                </Chip>
                <BottomAffix content={bottomAffixData} />
                <ChipEdit transform={transform} />
            </div>
        );
    }
}

export default Layout;
