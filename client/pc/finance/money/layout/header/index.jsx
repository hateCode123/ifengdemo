import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import Nav from '../../../../components/nav/';
import UserInfo from '@ifeng/ui_pc_userInfo';
import errorBoundary from '@ifeng/errorBoundary';

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

        const topNav = (
            <div className={styles.h_mainNavNew} key="topNav">
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

        return [topNav, topAd];
    }
}

export default errorBoundary(Header);
