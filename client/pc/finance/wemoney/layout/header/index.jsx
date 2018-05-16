import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Nav from '../../../../components/nav/';
import UserInfo from '../../../../components/userInfo/';

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

        return [topNav];
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
