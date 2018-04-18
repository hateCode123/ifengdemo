import React from 'react';
import styles from './index.css';
import Nav from './nav';
import NavMore from './navMore';
import UserInfo from './userInfo';
import AdExtend from './adExtend';
import Ad from './ad';
import Chip from 'Chip';
import Logo from './logo';
import Breadcrumb from './breadcrumb';
import Search from './search';

class Comp extends React.Component {
    render() {
        const topNav = (
            <div className={styles.h_mainNavNew} key="topNav">
                <Chip id="7" type="static" title="导航" groupName="头部" content={jsonData.nav}>
                    <Nav />
                </Chip>
                <Chip id="8" type="static" title="更多导航" groupName="头部" content={jsonData.navMore}>
                    <NavMore />
                </Chip>
                <UserInfo />
            </div>
        );
        const topAd = (
            <div key="topAd" className={styles.pic1000}>
                <Chip id="9" type="static" title="扩展位" groupName="头部" content={jsonData.topAdExtend}>
                    <AdExtend />
                </Chip>
                <Ad content={jsonData.topAd}/>
            </div>
        );
        const topSearch = (
            <div className={styles.searchDiv} key="topSearch">
                <div className={styles.theLogo}>
                    <Logo content={jsonData.logo} />
                    <Breadcrumb content={jsonData.breadcrumb} />
                </div>
                <Search />
            </div>
        );
        return [topNav, topAd, topSearch];
    }
}

export default Comp;
