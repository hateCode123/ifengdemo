import React from 'react';
import styles from './userInfo.css';
class Comp extends React.Component {
    render() {
        return (
            <div className={styles.login}>
                <a href="https://id.ifeng.com/user/register/" target="_blank">
                    注册
                </a>
                <a className={styles.f_login} data-role="f-login">
                    登录
                </a>
            </div>
        );
    }
}

export default Comp;
