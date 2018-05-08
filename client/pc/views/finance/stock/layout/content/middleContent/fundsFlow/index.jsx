import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';

class FundsFlow extends React.PureComponent {
    state = {
        tabs: [
            {
                tab: '当日流入',
                type: 0,
            },
            {
                tab: '当日流出',
                type: 1,
            },
            {
                tab: '5日增仓',
                type: 2,
            },
            {
                tab: '5日减仓',
                type: 3,
            },
            {
                tab: '20日增仓',
                type: 4,
            },
            {
                tab: '20日减仓',
                type: 5,
            },
        ],
        current: 0,
        loading: true,
        data: [],
    };

    componentDidMount() {
        const { tabs, current } = this.state;

        this.getData(tabs[current].raiseUp);
    }

    /**
     * 切换标签
     */
    handleTabsChange = e => {
        const { tabs } = this.state;
        const val = Number(e.target.attributes['data-index'].value);

        this.getData(tabs[val].type);

        this.setState({
            loading: true,
            current: val,
        });
    };

    /**
     * 获取数据
     */
    getData = async type => {
        const data = await jsonp('//app.finance.ifeng.com/stockindex/getZijinRank.php', {
            data: {
                type,
            },
            jsonpCallback: 'getZijinRank',
        });

        if (data.data.length > 0) {
            this.setState({
                loading: false,
                data: data.data.slice(0, 6),
            });
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, current, loading, data } = this.state;
        const { content } = this.props;
        const { title, url } = content;

        return (
            <div className={styles.funds_flow}>
                <MidTitle title={title} url={url} />
                <div className={`${styles.box} clearfix`}>
                    <div className={`${styles.title} clearfix`}>
                        <div className={styles.title_name}>股票名称</div>
                        <div className={styles.raise}>增减仓（万）</div>
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
                                            <td style={{ width: '107px' }}>
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
                                                <span>{item.chg_pct}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
FundsFlow.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
FundsFlow.defaultProps = {};

export { FundsFlow };
export default FundsFlow;
