import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import Logo from './logo/';
import Nav from '../../../../components/nav';
import UserInfo from '@ifeng/ui_pc_userInfo';
import Search from '@ifeng/ui_pc_search';

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
            channelAd: content.channelAd,
        };

        const SearchComp = errorBoundary(Search);

        const topNav = (
            <div id="main_nav" className={styles.main_nav} key="topNav">
                <Chip id="20002" type="struct" title="导航" groupName="头部" content={content.nav}>
                    <Nav />
                </Chip>
                <div className={styles.user}>
                    <UserInfo />
                </div>
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
                <Chip id="20005" type="struct" title="搜索" groupName="头部" content={content.search}>
                    <SearchComp />
                </Chip>
            </div>
        );

        return [topNav, topAd, topSearch];
    }
}

export default errorBoundary(Header);
