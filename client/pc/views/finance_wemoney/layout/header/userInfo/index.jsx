import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 UserInfo 组件
 */
class UserInfo extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={styles.login}>
                <a href="https://id.ifeng.com/user/register/" target="_blank" rel="nofollow me noopener noreferrer">
                    注册
                </a>
                <a className={styles.f_login} data-role="f-login">
                    登录
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
UserInfo.propTypes = {};

/**
 * 定义组件默认属性
 * */
UserInfo.defaultProps = {};

export { UserInfo };
export default UserInfo;
