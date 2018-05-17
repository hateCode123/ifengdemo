import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../../../../utils/rel';

class HighestAttention extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { tabs, content, stockData } = this.props;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <Chip id="10099" type="static" title="机构关注度最高" groupName="高手学堂" content={tabs}>
                            <tr>
                                <th width="85">{tabs[0]}</th>
                                <th width="65">{tabs[1]}</th>
                                <th width="60">{tabs[2]}</th>
                                <th width="110">{tabs[3]}</th>
                                <th width="80">{tabs[4]}</th>
                                <th>{tabs[5]}</th>
                            </tr>
                        </Chip>
                    </thead>
                    <tbody>
                        {content.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={`//finance.ifeng.com/app/hq/stock/${item.code}`}>{item.name}</a>
                                </td>
                                <td
                                    className={
                                        stockData !== ''
                                        && stockData[`s_${item.code}`]
                                        && stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData[`s_${item.code}`] ? stockData[`s_${item.code}`][0].toFixed(2) : ''}
                                </td>
                                <td
                                    className={
                                        stockData !== ''
                                        && stockData[`s_${item.code}`]
                                        && stockData[`s_${item.code}`][3] > 0
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

/**
 * 定义组件属性类型
 * */
HighestAttention.propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.array,
    stockData: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
HighestAttention.defaultProps = {};

export { HighestAttention };
export default HighestAttention;
