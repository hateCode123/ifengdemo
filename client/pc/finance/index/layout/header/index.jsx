import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '../../../../components/ad';
import Logo from './logo/';
import Nav from '../../../../components/nav';
import UserInfo from '../../../../components/userInfo';
import Search from '../../../../components/search';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const logoData = {
            logo: content.logo,
            logoAd: content.logoAd,
        };

        const topNav = (
            <div className={styles.main_nav} key="topNav">
                <Chip id="10108" type="static" title="导航" groupName="头部" content={content.nav}>
                    <Nav limit={18} />
                </Chip>
                <UserInfo />
            </div>
        );
        const topAd = (
            <div key="topAd" className={styles.ad}>
                <Ad content={content.topAd} styleName={styles.box} />
            </div>
        );
        const topSearch = (
            <div className={styles.search} key="topSearch">
                <div className={styles.logo}>
                    <Logo content={logoData} />
                </div>
                <Chip id="10129" type="static" title="搜索" groupName="头部" content={content.search}>
                    <Search />
                </Chip>
            </div>
        );

        return [topNav, topAd, topSearch];
    }
}

export default Header;
