import React from 'react';
import styles from './index.css';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';
import { getMyStockData, getStockData } from '../../../../../../../services/api';
import { rel } from '../../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class MyStocks extends React.PureComponent {
    state = {
        data: [],
    };

    loginId = auth.uuid();

    componentDidMount() {
        this.unBindLogin = auth.event.on(auth.EVENTNAMES.login, () => {
            this.getMyStock();
        });
        this.unBindLogout = auth.event.on(auth.EVENTNAMES.logout, () => {
            this.setState({
                data: [],
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
        try {
            const myStockInfo = await getMyStockData();
            const data = myStockInfo.stockinfo;
            const code = data.map(item => item.code);

            const myStockData = await getStockData(code);

            data.forEach(item => {
                const code = item.code;

                item.price = myStockData[code][0].toFixed(2);
                item.ext = myStockData[code][3].toFixed(2);
            });

            this.setState({ data });
        } catch (e) {
            console.error(e);
        }
    };

    getTable = () => {
        const { data } = this.state;

        if (data.length === 0) {
            return (
                <div className={styles.add}>
                    <p className={styles.tip}>您尚未添加自选股</p>
                    <a href="//app.finance.ifeng.com/custom/mystock.php" target="_blank" rel={rel}>
                        添加股票
                    </a>
                </div>
            );
        } else {
            return (
                <table>
                    <thead>
                        <tr>
                            <th width="65">股票名称</th>
                            <th width="50">股价</th>
                            <th width="65">涨跌幅</th>
                            <th>研报</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">
                                <a href="//app.finance.ifeng.com/custom/mystock.php" target="_blank" rel={rel}>
                                    查看我的自选股&gt;&gt;
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                            <a href="//id.ifeng.com/user/register/" target="_blank" rel={rel}>
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

export default errorBoundary(MyStocks);
