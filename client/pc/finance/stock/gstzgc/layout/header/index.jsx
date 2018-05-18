import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Nav from '../../../../../components/nav/';
import UserInfo from '../../../../../components/userInfo/';
import Search from '../../../../../components/search/';
import { rel } from '../../../../../utils/rel';
import logoUrl from './logo.jpg';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const topNav = (
            <div className={styles.h_mainNavNew} key="topNav">
                <Nav limit={18} content={content.nav} />
                <UserInfo />
            </div>
        );

        const topSearch = (
            <div className={styles.h_searchDiv} key="topSearch">
                <div className={styles.h_theLogo}>
                    <a href="//finance.ifeng.com/stock/" rel={rel} target="_blank">
                        <img src={logoUrl} style={{ width: 127, height: 27 }} title="凤凰股票" alt="凤凰股票" />
                    </a>
                    <div className={styles.adv11}>投资观察</div>
                </div>
                <Chip id="10129" type="static" title="搜索" groupName="头部" content={content.search}>
                    <Search />
                </Chip>
            </div>
        );

        return [topNav, topSearch];
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
