import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import Nav from './nav/';
import NavMore from './navMore/';
import UserInfo from './userInfo/';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const topNav = (
            <div className={ styles.h_mainNavNew } key="topNav">
                <Chip
                    id="7" type="static" title="导航"
                    groupName="头部" content={ content.nav }
                >
                    <Nav />
                </Chip>
                <Chip
                    id="8" type="static" title="更多导航"
                    groupName="头部" content={ content.navMore }
                >
                    <NavMore />
                </Chip>
                <UserInfo />
            </div>
        );
        
        return [ topNav ];
    }
}

/**
 * 定义组件属性类型
 * */
Header.propTypes = {};

/**
 * 定义组件默认属性
 * */
Header.defaultProps = {};

export { Header };
export default Header;
