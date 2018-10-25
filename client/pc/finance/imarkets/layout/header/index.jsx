import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import UserInfo from '@ifeng/ui_pc_userInfo';
import styles from './index.css';
import Nav from '../../../../components/nav';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.nav_box}>
                <div className={`${styles.main_nav} clearfix`}>
                    <Chip
                        id="10108"
                        type="static"
                        title="导航"
                        groupName="头部"
                        translate="jsonParse"
                        content={content.nav}>
                        <Nav limit={18} />
                    </Chip>
                    <div className={styles.userinfo}>
                        <UserInfo />
                    </div>
                </div>
            </div>
        );
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
