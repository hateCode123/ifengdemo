import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp, cookie } from '@ifeng/ui_base';
import Chip from 'Chip';
import HqSubtitle from '../subtitle';
import MyStocks from './myStocks/';
import { rel } from '../../../../../../utils/rel';

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
        const val = Number(e.target.attributes['data-index'].value);

        this.setState({ current: val });
    };

    getCookie = async () => {
        const userSawList = cookie.get('user_saw_stock_map');
        let data = [];
        let code = '';
        let isLastest = true;

        if (userSawList === '') {
            const stockData = await jsonp('//apiapp.finance.ifeng.com/hotstockrank', {
                data: {
                    type: 'wx',
                    callback: 'getHotStock',
                },
                jsonpCallback: 'getHotStock',
            });

            stockData.slice(0, 4).forEach(item => {
                const d = [];

                d.push(item.code);
                d.push(item.name);

                data.push(d);
            });

            code = data.map(item => item[0]).join(',');
            isLastest = false;
        } else {
            const list = userSawList.split(',').map(item => item.split(':1'));

            data = list.map(item => item[0].split(':'));
            code = data.map(item => item[0]).join(',');
            isLastest = true;
        }

        const stockData = await jsonp('//hq.finance.ifeng.com/q.php', {
            data: {
                l: code,
                f: 'json',
                e: 'getVal(json_q)',
            },
            jsonpCallback: 'getVal',
        });

        const isUsstock = code => {
            const pattern = '^[A-Z.a-z]+$';

            if (code.match(pattern)) {
                return true;
            } else {
                return false;
            }
        };

        data.forEach(item => {
            const code = item[0];

            item.push(stockData[code][0].toFixed(2));
            item.push(stockData[code][3].toFixed(2));

            if (isUsstock(item[0])) {
                if (stockData[code][3] > 0) {
                    item.push('green');
                } else {
                    item.push('red');
                }
            } else if (stockData[code][3] > 0) {
                item.push('red');
            } else {
                item.push('green');
            }

            const codeNum = item[0];

            if (codeNum.indexOf('hk') !== -1) {
                item.push({ ahref: '//finance.ifeng.com/app/hq/hkstock/' });
                item.push('--');
            } else if (codeNum === 'sh000001' || codeNum === 'sz399001') {
                item.push({ ahref: '//finance.ifeng.com/app/hq/stock/' });
                item.push('--');
            } else if (isUsstock(code)) {
                item.push({ ahref: '//finance.ifeng.com/app/hq/usstock/' });
                item.push('--');
            } else {
                item.push({ ahref: '//finance.ifeng.com/app/hq/stock/' });
                item.push('研报');
            }
        });

        this.setState({
            isLastest,
            data,
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { titles, current, isLastest, data } = this.state;
        const dataFive = data.length > 5 ? data.slice(data.length - 5) : data;

        const { content } = this.props;

        return (
            <div className={styles.custom_stocks}>
                <Chip id="10066" type="static" title="自选股" content={content.zxgTit}>
                    <HqSubtitle />
                </Chip>
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
                                        {dataFive.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <a href={`${item[5].ahref}${item[0]}/`} target="_blank" rel={rel}>
                                                        {item[1]}
                                                    </a>
                                                </td>
                                                <td className={item[3] > 0 ? styles.red : styles.green}>{item[2]}</td>
                                                <td className={item[3] > 0 ? styles.red : styles.green}>{item[3]}%</td>
                                                {item[6] === '研报' ? (
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
                                                ) : (
                                                    <td>--</td>
                                                )}
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
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CustomStocks.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
CustomStocks.defaultProps = {};

export { CustomStocks };
export default CustomStocks;
