import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HqSubtitle from '../subtitle';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../utils/rel';
import Chip from 'Chip';

class RiseFall extends React.PureComponent {
    state = {
        current: 0,
        showRise: true,
        prices: [],
        loading: true,
    };

    dealResult = (num, data) => {
        const price = [];

        data.forEach((item, index) => {
            if (index < 5) {
                let style = '';

                if (item.chg_pct > 0) {
                    style = 'red';
                } else {
                    style = 'green';
                }

                if (num === 0) {
                    // 01
                    price.push({
                        code: (
                            <a href={`//finance.ifeng.com/app/hq/stock/${item.code}/`} target="_blank" rel={rel}>
                                {item.name}
                            </a>
                        ),
                        name: item.name,
                        percent: `${parseFloat(item.chg_pct).toFixed(2)}%`,
                        style,
                        news: item.news || '',
                    });
                } else if (num === 1) {
                    // 67
                    price.push({
                        code: (
                            <a href={`//finance.ifeng.com/app/hq/stock/${item.code}/`} target="_blank" rel={rel}>
                                {item.name.substring(0, 6)}
                            </a>
                        ),
                        name: item.name,
                        percent: `${parseFloat(item.chg_pct_5).toFixed(2)}%`,
                        style: item.chg_pct_5 > 0 ? 'red' : 'green',
                        news: item.news || '',
                    });
                } else if (num === 2) {
                    // 5
                    price.push({
                        code: (
                            <a href={`//finance.ifeng.com/app/hq/stock/${item.code}/`} target="_blank" rel={rel}>
                                {item.name.substring(0, 5)}
                            </a>
                        ),
                        name: item.name,
                        percent: `${parseFloat(item.vol_ratio).toFixed(2)}`,
                        style,
                        news: item.news || '',
                    });
                } else if (num === 3) {
                    // 23
                    price.push({
                        code: (
                            <a
                                href={`//app.finance.ifeng.com/list/stock_cate.php?c=${item.code.substring(3)}/`}
                                target="_blank"
                                rel={rel}>
                                {item.name.substring(0, 6)}
                            </a>
                        ),
                        name: item.name,
                        percent: `${parseFloat(item.chg_pct).toFixed(2)}%`,
                        style,
                        news: item.news || '',
                    });
                } else if (num === 4) {
                    // 12 13
                    price.push({
                        code: (
                            <a
                                href={`//app.finance.ifeng.com/list/stock_cate.php?c=${item.code.substring(3)}/`}
                                target="_blank"
                                rel={rel}>
                                {item.name.substring(0, 6)}
                            </a>
                        ),
                        name: item.name,
                        percent: `${parseFloat(item.chg_pct).toFixed(2)}%`,
                        style,
                        news: item.news || '',
                    });
                } else {
                    price.push({
                        code: (
                            <a
                                href={`//app.finance.ifeng.com/list/stock_cate.php?c=${item.code.substring(3)}/`}
                                target="_blank"
                                rel={rel}>
                                {item.name.substring(0, 6)}
                            </a>
                        ),
                        name: item.name,
                        percent: parseFloat(item.chg_pct),
                        style,
                        news: item.news || '',
                    });
                }
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
            jsonpCallback: 'showResult',
        });

        this.setState({ loading: false });

        this.dealResult(0, result.data);
    };

    async componentDidMount() {
        this.getResult(0, 0);
    }

    handleTabsChange = (num, type) => {
        this.setState({ current: num, showRise: true, loading: true });
        this.getResult(num, type);
    };

    handleRfChange = (num, type) => {
        this.getResult(num, type);
        this.setState({ showRise: !this.state.showRise });
    };

    render() {
        const { content } = this.props;

        const { zdphTable, zdphTit } = content;
        const { current, showRise, prices } = this.state;

        // 渲染tableContent
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
                <Chip id="10064" type="static" title="涨跌排行" translate="jsonParse" content={zdphTit}>
                    <HqSubtitle />
                </Chip>

                <div className={styles.zdph_table}>
                    <div className={styles.table_head}>
                        <a className={styles.gpmc}>{zdphTable[current].tableHead[0]}</a>

                        {current === 2 ? (
                            <a className={styles.zdf_01}>{zdphTable[current].tableHead[1]}</a>
                        ) : (
                            <a
                                className={this.state.showRise ? styles.zdf : styles.zdf_02}
                                onClick={() =>
                                    this.handleRfChange(
                                        current,
                                        showRise ? zdphTable[current].type[1] : zdphTable[current].type[0],
                                    )
                                }>
                                {zdphTable[current].tableHead[1]}
                            </a>
                        )}
                    </div>
                    <div>
                        <ul className={styles.tr_title}>
                            {zdphTable.map((item, index) => (
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
RiseFall.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
RiseFall.defaultProps = {};

export default RiseFall;
