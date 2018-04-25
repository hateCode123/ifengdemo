import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header/';
import Navigation from './navigation/';
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
                <Chip
                    key="cooperation"
                    id="10015"
                    type="static"
                    title="底部合作链接"
                    groupName="底部"
                    content={cooperation}>
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
