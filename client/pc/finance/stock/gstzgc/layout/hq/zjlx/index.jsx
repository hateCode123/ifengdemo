import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HqSubtitle from '../subtitle';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../utils/rel';
import Chip from 'Chip';

class MoneyFlow extends React.PureComponent {
    state = {
        current: 0,
        prices: [],
        loading: true,
    };

    /**
     * 接口返回数据处理
     */
    dealResult = (num, data) => {
        const price = [];

        data.forEach((item, index) => {
            if (index < 6) {
                let style = '';

                if (item.chg_pct > 0) {
                    style = 'red';
                } else {
                    style = 'green';
                }

                price.push({
                    code: (
                        <a href={`//finance.ifeng.com/app/hq/stock/${item.code}/`} target="_blank" rel={rel}>
                            {item.name.substring(0, 5)}
                        </a>
                    ),
                    name: item.name,
                    percent: parseFloat(item.chg_pct),
                    style,
                    news: item.news || '',
                });
            }
        });

        this.setState({ prices: price });
    };

    // num为li的index，type为接口传入type参数
    getResult = async (num, type) => {
        const result = await jsonp('//app.finance.ifeng.com/stockindex/getStockRank.php', {
            data: {
                type,
            },
            jsonpCallback: 'getResult',
        });

        this.setState({ loading: false });

        this.dealResult(0, result.data);
    };

    async componentDidMount() {
        this.getResult(0, 0);
    }

    handleTabsChange = async (num, type) => {
        this.setState({ loading: true, current: num });
        this.getResult(num, type);
    };

    render() {
        const { content } = this.props;
        const { zjlxTable, zjlxTit } = content;
        const { current, prices } = this.state;

        const trs = prices.map((item, index) => (
            <tr key={index}>
                <td className={index === 0 ? styles.td1 : ''}>
                    {item.code}
                    {item.news ? (
                        <a href={item.news} target="_blank" rel={rel}>
                            <img src="//y1.ifengimg.com/a/2013/1030/g_01a.gif" width="33px" height="16px" />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
                <td className={styles[item.style]}>
                    <span style={{ fontSize: 14 }}>{item.percent}</span>
                </td>
            </tr>
        ));

        return (
            <div className={styles.zdph}>
                <Chip id="10065" type="static" title="资金流向" translate="jsonParse" content={zjlxTit}>
                    <HqSubtitle />
                </Chip>
                <div className={styles.zdph_table}>
                    <div className={styles.table_head}>
                        <a className={styles.gpmc}>{zjlxTable[0].tableHead[0]}</a>

                        <a className={styles.zdf}>{zjlxTable[0].tableHead[1]}</a>
                    </div>

                    <div>
                        <ul className={styles.tr_title}>
                            {zjlxTable.map((item, index) => (
                                <li
                                    key={index}
                                    className={index === current ? styles.cur : ''}
                                    onClick={() => this.handleTabsChange(index, item.type[0])}>
                                    {item.trTit}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.table_content}>
                            {this.state.loading ? (
                                <img
                                    src="//img.ifeng.com/tres/finance/deco/2011/1029/loading.gif"
                                    className={styles.loading_img}
                                />
                            ) : (
                                <div className={styles.table_content}>
                                    <table>
                                        <tbody>{trs}</tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MoneyFlow.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
MoneyFlow.defaultProps = {};

export default MoneyFlow;
