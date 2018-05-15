import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../utils/rel';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';

class CustomStock extends React.PureComponent {
    state = {
        tabs: [
            { title: '股票名称', width: 68 },
            { title: '股价', width: 80 },
            { title: '涨跌幅', width: 82 },
            { title: '涨跌', width: 72 },
            { title: '研报', width: '' },
        ],
        customStock: [],
        userInfo: auth.isLogin() ? auth.getUserInfo() : null,
    };

    /**
     * 请求数据
     */
    async componentDidMount() {
        try {
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

            const data = await jsonp('//apiapp.finance.ifeng.com/mystock/get', {
                num: 2,
            });

            const nameList = data.stockinfo.map(item => item.name);

            const codeList = data.stockinfo.map(item => item.code);

            const result = await jsonp('//hq.finance.ifeng.com/q.php', {
                data: {
                    l: codeList.join(','),
                    f: 'json',
                    e: 'getStock(json_q)',
                },
                jsonpCallback: 'getStock',
            });

            const customStock = [];

            codeList.forEach((item, index) => {
                let style = '';

                if (result[item][2] > 0) {
                    style = 'red';
                } else if (result[item][2] < 0) {
                    style = 'green';
                } else {
                    style = 'black';
                }

                customStock.push({
                    url: `//finance.ifeng.com/app/hq/stock/${item}`,
                    name: nameList[index],
                    price: result[item][0],
                    index: result[item][2],
                    percent: result[item][3],
                    style,
                    report: `//app.finance.ifeng.com/report/search.php?yb_search_type=stock&amp;code=${item}`,
                });
            });

            this.setState({ customStock });
        } catch (e) {
            console.log(e);
        }
    }

    loginId = auth.uuid();

    componentWillUnmount() {
        this.unBindLogin();
        this.unBindLogout();
    }

    handleLoginIn = () => {
        auth.login(this.loginId);
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, customStock } = this.state;
        const isLogin = auth.isLogin();
        let tip = '';

        if (isLogin) {
            if (customStock.length === 0) {
                tip = '您尚未添加自选股';
            }
        } else {
            tip = '登录后添加自选股';
        }

        return (
            <div className={styles.customStock_box}>
                <div className={styles.table}>
                    <table className={styles.tabs}>
                        <tbody>
                            <tr>
                                {tabs.map((item, index) => (
                                    <th
                                        key={index}
                                        className={styles.tab}
                                        width={item.width}
                                        style={{ textAlign: index === tabs.length - 1 ? ' center' : 'right' }}>
                                        {item.title}
                                    </th>
                                ))}
                            </tr>
                            {isLogin && customStock.length > 0 ? (
                                customStock.map(item => (
                                    <tr key={item.name}>
                                        <th className={styles.item} style={{ textAlign: 'right' }}>
                                            <a href={item.url} target="_blank" rel={rel}>
                                                {item.name}
                                            </a>
                                        </th>
                                        <th className={styles.item} style={{ textAlign: 'right' }}>
                                            <span className={styles[item.style]}>{item.price}</span>
                                        </th>
                                        <th className={styles.item} style={{ textAlign: 'right' }}>
                                            <span className={styles[item.style]}>{item.percent}%</span>
                                        </th>
                                        <th className={styles.item} style={{ textAlign: 'right' }}>
                                            <span className={styles[item.style]}>{item.index}</span>
                                        </th>
                                        <th className={styles.item} style={{ textAlign: 'center' }}>
                                            <a href={item.report} target="_blank" rel={rel}>
                                                研报
                                            </a>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <tr />
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.btn}>
                    <div className={styles.login}>
                        {isLogin ? (
                            <a href="//app.finance.ifeng.com/custom/mystock.php" target="_blank" rel={rel}>
                                添加股票
                            </a>
                        ) : (
                            <a onClick={this.handleLoginIn}>登录</a>
                        )}
                    </div>
                    <LoginDialog id={this.loginId} />
                    <div className={styles.tip}>{tip}</div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CustomStock.propTypes = {};

/**
 * 定义组件默认属性
 * */
CustomStock.defaultProps = {};

export { CustomStock };
export default CustomStock;
