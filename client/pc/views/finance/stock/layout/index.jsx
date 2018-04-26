import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header/';
import Navigation from './navigation/';
import StockPlate from './stockPlate/';
import StockSearch from './stockSearch/';
import JumpLink from './jumpLink/';
import Content from './content';
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
        const jumpLink = content.jumpLink;
        const contentData = {
            leftContent: {
                headline: content.headline,
                newsLive: {
                    newsLiveTab: content.newsLiveTab,
                    liveLogo: content.liveLogo,
                },
                news: {
                    newsTab: content.newsTab,
                },
                answer: {
                    answerTab: content.answerTab,
                    answerList: content.answerList,
                },
                leftAsideAd: content.leftAsideAd,
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
                <div className={styles.content}>
                    <div className={styles.col}>
                        <Navigation content={navigationData} />
                        <StockPlate />
                        <div className={styles.search_box}>
                            <StockSearch />
                            <Chip id="10044" type="static" title="导航跳转链接" groupName="导航栏" content={jumpLink}>
                                <JumpLink />
                            </Chip>
                            <div className="clear" />
                        </div>
                    </div>
                </div>
                <div className={styles.space} />
                <Content content={contentData} />
                <Chip id="10015" type="static" title="底部合作链接" groupName="底部" content={cooperation}>
                    <Cooperation />
                </Chip>
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
