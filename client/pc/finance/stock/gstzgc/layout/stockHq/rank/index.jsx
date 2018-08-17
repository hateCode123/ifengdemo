import React from 'react';
import styles from './index.css';
import { getStockRank } from '../../../../../../services/api';
import { rel } from '../../../../../../utils/rel';

class Rank extends React.PureComponent {
    state = {
        tabs: [
            {
                tab: '个股涨跌',
                raiseUp: 0,
                raiseDown: 1,
            },
            {
                tab: '5分钟涨跌',
                raiseUp: 6,
                raiseDown: 7,
            },
            {
                tab: '量比排名',
                type: 5,
            },
            {
                tab: '板块涨跌',
                raiseUp: 2,
                raiseDown: 3,
            },
            {
                tab: '概念涨跌',
                raiseUp: 12,
                raiseDown: 13,
            },
        ],
        raise: true,
        current: 0,
        loading: true,
        data: [],
    };

    componentDidMount() {
        const { tabs, current } = this.state;

        this.getData(tabs[current].raiseUp);
    }

    /**
     * 切换涨幅
     */
    handleRaiseChange = () => {
        const { tabs, raise, current } = this.state;

        if (current === 2) {
            this.getData(tabs[current].type);
        } else {
            this.getData(raise ? tabs[current].raiseDown : tabs[current].raiseUp);
        }

        this.setState({
            loading: true,
            raise: !raise,
        });
    };

    /**
     * 切换标签
     */
    handleTabsChange = e => {
        const { tabs } = this.state;
        const val = Number(e.currentTarget.attributes['data-index'].value);

        if (val === 2) {
            this.getData(tabs[val].type);
        } else {
            this.getData(tabs[val].raiseUp);
        }

        this.setState({
            loading: true,
            raise: true,
            current: val,
        });
    };

    /**
     * 获取数据
     */
    getData = async type => {
        try {
            const data = await getStockRank(type);

            if (data.data && data.data.length > 0) {
                this.setState({
                    loading: false,
                    data: data.data.slice(0, 5),
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, raise, current, loading, data } = this.state;

        return (
            <div className={`${styles.rank} clearfix`}>
                <div className={`${styles.title} clearfix`}>
                    <div className={styles.title_name}>股票名称</div>
                    {current !== 2 ? (
                        <div className={raise ? styles.raise_up : styles.raise_down} onClick={this.handleRaiseChange}>
                            涨跌幅
                        </div>
                    ) : (
                        <div className={styles.raise} onClick={this.handleRaiseChange}>
                            量比
                        </div>
                    )}
                </div>
                <div className={styles.tabs}>
                    <ul>
                        {tabs.map((item, index) => (
                            <li
                                key={index}
                                className={current === index ? styles.current : ''}
                                data-index={index}
                                onClick={this.handleTabsChange}>
                                {item.tab}
                            </li>
                        ))}
                    </ul>
                </div>
                {loading ? (
                    <div className={styles.loading} />
                ) : (
                    <div className={styles.table}>
                        <table>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '167px' }}>
                                            <a
                                                href={
                                                    index < 3
                                                        ? `//finance.ifeng.com/app/hq/stock/${item.code}/`
                                                        : `//app.finance.ifeng.com/list/stock_cate.php?c=${item.code.slice(
                                                              3,
                                                          )}/`
                                                }
                                                target="_blank"
                                                rel={rel}>
                                                {item.name.slice(0, 6)}
                                            </a>
                                            {item.news && item.news !== '' ? (
                                                <a href={item.news} target="_blank" rel={rel}>
                                                    <p />
                                                </a>
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                        <td className={item.chg_pct > 0 ? styles.red : styles.green}>
                                            <span>
                                                {current === 2
                                                    ? Number(item.vol_ratio).toFixed(2)
                                                    : Number(item.chg_pct).toFixed(2)}
                                                {current === 2 ? '' : '%'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default Rank;
