import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';
import { rel } from '../../../../../../../../utils/rel';
import { jsonp, cookie } from '@ifeng/ui_base';

class MyStocks extends React.PureComponent {
    state = {
        userInfo: auth.isLogin() ? auth.getUserInfo() : null,
        data: [],
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

        if (auth.isLogin()) {
            this.getMyStock();
        }
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

    getMyStock = async () => {
        const data = await jsonp('//app.finance.ifeng.com/custom/api/youfeng2.php?callback=?', {
            data: {
                sid: cookie.get('sid'),
                iter_type: 'mystock',
                req_type: 'json',
                req_num: 4,
            },
        });

        this.setState({ data });
    };

    getTable = () => {
        const { data } = this.state;

        if (data === null) {
            return (
                <div className={styles.add}>
                    <p className={styles.tip}>您尚未添加自选股</p>
                    <a href="//app.finance.ifeng.com/custom/mystock.php" target="_blank" rel={rel}>
                        添加股票
                    </a>
                </div>
            );
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const isLogin = auth.isLogin();

        return (
            <div className={styles.myStocks}>
                <div className={styles.box}>
                    {isLogin ? (
                        this.getTable()
                    ) : (
                        <div className={styles.login}>
                            <a onClick={this.handleLoginIn}>登录</a>
                            <a href="https://id.ifeng.com/user/register/" target="_blank" rel={rel}>
                                注册
                            </a>
                            <LoginDialog id={this.loginId} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MyStocks.propTypes = {};

/**
 * 定义组件默认属性
 * */
MyStocks.defaultProps = {};

export { MyStocks };
export default MyStocks;
