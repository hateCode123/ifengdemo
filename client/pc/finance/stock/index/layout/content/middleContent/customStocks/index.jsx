import React from 'react';
import styles from './index.css';
import { cookie } from '@ifeng/ui_base';
import { getHotStockData, getStockData } from '../../../../../../../services/api';
import { rel } from '../../../../../../../utils/rel';
import MyStocks from './myStocks/';

class CustomStocks extends React.PureComponent {
    state = {
        titles: ['最近访问股', '我的自选股'],
        current: 0,
        isLastest: true,
        data: [],
    };

    componentDidMount() {
        this.getCookie();
    }

    handleMouseOver = e => {
        const val = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: val });
    };

    getCookie = async () => {
        try {
            const userSawList = cookie.get('user_saw_stock_map');
            let data = [];
            let code = '';
            let isLastest = true;

            if (userSawList === '') {
                const stockData = await getHotStockData();

                stockData.slice(0, 4).forEach(item => {
                    const d = [];

                    d.push(item.code);
                    d.push(item.name);

                    data.push(d);
                });

                code = data.map(item => item[0]);
                isLastest = false;
            } else {
                const list = userSawList.split(',').map(item => item.split(':'));

                data = list.map(item => item.slice(0, 2));
                data.forEach((item, index) => {
                    if (item[0] === '') {
                        data.splice(index, 1);
                    }
                });
                code = data.map(item => item[0]);
                isLastest = true;
            }

            const stockData = await getStockData(code);

            data.forEach(item => {
                const code = item[0];

                if (stockData[code].length > 0) {
                    item.push(stockData[code][0].toFixed(2));
                    item.push(stockData[code][3].toFixed(2));
                } else {
                    item.push(0, 0);
                }
            });

            this.setState({
                isLastest,
                data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    getColor = num => {
        if (num > 0) {
            return styles.red;
        } else if (num === 0) {
            return styles.black;
        } else if (num < 0) {
            return styles.green;
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { titles, current, isLastest, data } = this.state;

        return (
            <div className={styles.box}>
                <ul className="clearfix">
                    {titles.map((item, index) => (
                        <li
                            key={index}
                            className={current === index ? styles.current : ''}
                            data-index={index}
                            onMouseEnter={this.handleMouseOver}>
                            {item}
                        </li>
                    ))}
                </ul>
                {current === 0 ? (
                    <div className={styles.stock_box}>
                        <div className={styles.stock}>
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
                                                    href={`//finance.ifeng.com/app/hq/stock/${item[0]}/`}
                                                    target="_blank"
                                                    rel={rel}>
                                                    {item[1]}
                                                </a>
                                            </td>
                                            <td className={this.getColor(item[3])}>{item[2]}</td>
                                            <td className={this.getColor(item[3])}>{`${item[3]}%`}</td>
                                            <td>
                                                <a
                                                    href={`//app.finance.ifeng.com/report/search.php?yb_search_type=stock&code=${
                                                        item[0]
                                                    }`}
                                                    target="_blank"
                                                    rel={rel}>
                                                    研报
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        {isLastest ? (
                                            <td />
                                        ) : (
                                            <td className={styles.tip} colSpan="5">
                                                无最近访问股票，以上是热门股票
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <MyStocks />
                )}
            </div>
        );
    }
}

export default CustomStocks;
