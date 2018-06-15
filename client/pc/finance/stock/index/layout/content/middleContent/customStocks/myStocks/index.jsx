import React from 'react';
import styles from './index.css';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';
import { rel } from '../../../../../../../../utils/rel';
import { jsonp } from '@ifeng/ui_base';

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
        try {
            const myStockInfo = await jsonp('//apiapp.finance.ifeng.com/mystock/get');
            const data = myStockInfo.stockinfo;
            const code = data.map(item => item.code).join(',');

            const myStockData = await jsonp('//hq.finance.ifeng.com/q.php', {
                data: {
                    l: code,
                    f: 'json',
                    e: 'getVal(json_q)',
                },
                jsonpCallback: 'getVal',
            });

            data.forEach(item => {
                const code = item.code;

                item.price = myStockData[code][0].toFixed(2);
                item.ext = myStockData[code][3].toFixed(2);
            });

            this.setState({ data });
        } catch (e) {
            console.log(e);
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
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <a
                                        href={`//finance.ifeng.com/app/hq/stock/${item.code}/`}
                                        target="_blank"
                                        rel={rel}>
                                        {item.name}
                                    </a>
                                </td>
                                <td className={item.ext > 0 ? styles.red : styles.green}>{item.price}</td>
                                <td className={item.ext > 0 ? styles.red : styles.green}>{item.ext}%</td>
                                <td>
                                    <a
                                        href={`//app.finance.ifeng.com/report/search.php?yb_search_type=stock&code=${
                                            item.code
                                        }`}
                                        target="_blank"
                                        rel={rel}>
                                        研报
                                    </a>
                                </td>
                            </tr>
                        ))}
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

export default MyStocks;
