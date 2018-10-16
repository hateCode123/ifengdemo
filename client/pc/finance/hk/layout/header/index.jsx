import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '../ad/';
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
        };

        const { ad_top } = content;

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
            <Chip id="30010" type="struct" title="顶部通栏广告01" groupName="广告" content={ad_top} key="topAd">
                <Ad />
            </Chip>
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
