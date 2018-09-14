import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Nav from '../../../../components/nav/';
import UserInfo from '@ifeng/ui_pc_userInfo';
import errorBoundary from '@ifeng/errorBoundary';

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
                <div className={styles.user}>
                    <UserInfo />
                </div>
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

export default errorBoundary(Header);
