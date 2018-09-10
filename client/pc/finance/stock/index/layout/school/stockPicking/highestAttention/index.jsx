import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { getStockData } from '../../../../../../../services/api';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../../utils/rel';

class HighestAttention extends React.PureComponent {
    static propTypes = {
        tabs: PropTypes.array,
        content: PropTypes.array,
    };

    state = {
        stockData: {},
    };

    async componentDidMount() {
        try {
            const { content } = this.props;

            const code = content.map(item => `s_${item.code}`);

            const data = await getStockData(code);

            this.setState({ stockData: data });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 渲染组件
     */
    render() {
        const { stockData } = this.state;
        const { tabs, content } = this.props;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <tr>
                            <th width="85">{tabs[0]}</th>
                            <th width="65">{tabs[1]}</th>
                            <th width="60">{tabs[2]}</th>
                            <th width="110">{tabs[3]}</th>
                            <th width="80">{tabs[4]}</th>
                            <th>{tabs[5]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={`//finance.ifeng.com/app/hq/stock/${item.code}`} target="_blank" rel={rel}>
                                        {item.name}
                                    </a>
                                </td>
                                <td
                                    className={
                                        stockData !== '' &&
                                        stockData[`s_${item.code}`] &&
                                        stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData[`s_${item.code}`] ? stockData[`s_${item.code}`][0].toFixed(2) : ''}
                                </td>
                                <td
                                    className={
                                        stockData !== '' &&
                                        stockData[`s_${item.code}`] &&
                                        stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData[`s_${item.code}`] ? `${stockData[`s_${item.code}`][3].toFixed(2)}%` : ''}
                                </td>
                                <td className={styles.price}>{item.orgnum}</td>
                                <td className={styles.price}>{item.mbzf}</td>
                                <td>
                                    {item.ybinfo ? (
                                        <a href={item.ybinfo[1]} target="_blank" rel={rel} title={item.ybinfo[2]}>
                                            {item.ybinfo[0] ? item.ybinfo[0] : '暂无研报'}
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default errorBoundary(HighestAttention);
