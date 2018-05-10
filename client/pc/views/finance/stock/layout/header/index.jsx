import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '../../../../../components/ad/';
import Logo from './logo/';
import Nav from '../../../../../components/nav/';
import UserInfo from '../../../../../components/userInfo/';
import Search from '../../../../../components/search/';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
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
            <div className={styles.h_mainNavNew} key="topNav">
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
            <div className={styles.h_searchDiv} key="topSearch">
                <div className={styles.h_theLogo}>
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

/**
 * 定义组件属性类型
 * */
Header.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Header.defaultProps = {};

export { Header };
export default Header;
