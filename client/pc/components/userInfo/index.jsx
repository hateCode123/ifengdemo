import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../utils/rel';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';

/**
 * 定义 UserInfo 组件
 */
class UserInfo extends React.PureComponent {
    state = {
        isShow: false,
        userInfo: auth.isLogin() ? auth.getUserInfo() : null,
    };

    loginId = auth.uuid();

    componentDidMount() {
        this.unBindLogin = auth.event.on(auth.EVENTNAMES.login, userInfo => {
            this.setState({
                userInfo,
            });
        });
        this.unBindLogout = auth.event.on(auth.EVENTNAMES.logout, () => {
            this.setState({
                userInfo: null,
            });
        });
    }

    componentWillUnmount() {
        this.unBindLogin();
        this.unBindLogout();
    }

    handleLoginIn = () => {
        auth.login(this.loginId);
    };

    handleLoginOut = () => {
        auth.logout();
    };

    handleOptionList = () => {
        const { isShow } = this.state;

        this.setState({ isShow: !isShow });
    };

    getOptionList = () => {
        const { isShow } = this.state;

        if (isShow) {
            return (
                <ul className={styles.options}>
                    <li>
                        <a href="//id.ifeng.com" target="_blank" rel={rel}>
                            进入个人中心
                        </a>
                    </li>
                    <li>
                        <a href="//zmt.ifeng.com/" target="_blank" rel={rel}>
                            进入我的大风号
                        </a>
                    </li>
                </ul>
            );
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { isShow, userInfo } = this.state;
        const isLogin = auth.isLogin();

        if (isLogin) {
            return (
                <div className={styles.login_after}>
                    <span className={styles.login_info} onClick={this.handleOptionList}>
                        <span className={styles.login_name}>{userInfo.userName}</span>
                        <span className={`${styles.login_option} ${isShow ? styles.up : styles.down}`}>&nbsp;</span>
                    </span>
                    <span className={styles.login_out} onClick={this.handleLoginOut}>
                        退出
                    </span>
                    {this.getOptionList()}
                </div>
            );
        } else {
            return (
                <div className={styles.login}>
                    <a href="https://id.ifeng.com/user/register/" target="_blank" rel={rel}>
                        注册
                    </a>
                    <span className={styles.login_in} onClick={this.handleLoginIn}>
                        登录
                    </span>
                    <LoginDialog id={this.loginId} />
                </div>
            );
        }
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
