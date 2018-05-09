import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp, cookie } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';
import MyStocks from './myStocks/';

class CustomStocks extends React.PureComponent {
    state = {
        titles: ['最近访问股', '我的自选股'],
        current: 0,
        data: [],
    };

    componentDidMount() {
        this.getCookie();
    }

    handleMouseOver = e => {
        const val = Number(e.target.attributes['data-index'].value);

        this.setState({ current: val });
    };

    getCookie = async () => {
        const userSawList = cookie.get('user_saw_stock_map');
        const list = userSawList.split(',').map(item => item.split(':1'));
        const data = list.map(item => item[0].split(':'));
        const code = data.map(item => `s_${item[0]}`).join(',');

        const stockData = await jsonp('//hq.finance.ifeng.com/q.php', {
            data: {
                l: code,
                f: 'json',
                e: 'getVal(json_q)',
            },
            jsonpCallback: 'getVal',
        });

        data.forEach(item => {
            const code = `s_${item[0]}`;

            item.push(stockData[code][0]);
            item.push(stockData[code][3]);
        });

        this.setState({ data });
    };

    /**
     * 渲染组件
     */
    render() {
        const { titles, current, data } = this.state;

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
                                            <td className={item[3] > 0 ? styles.red : styles.green}>{item[2]}</td>
                                            <td className={item[3] > 0 ? styles.red : styles.green}>{item[3]}%</td>
                                            <td>
                                                <a
                                                    href={`//app.finance.ifeng.com/report/search.php?yb_search_type=stock&code=${item[0].slice(
                                                        2,
                                                    )}`}
                                                    target="_blank"
                                                    rel={rel}>
                                                    研报
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        {data.length > 0 ? (
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

/**
 * 定义组件属性类型
 * */
CustomStocks.propTypes = {};

/**
 * 定义组件默认属性
 * */
CustomStocks.defaultProps = {};

export { CustomStocks };
export default CustomStocks;
