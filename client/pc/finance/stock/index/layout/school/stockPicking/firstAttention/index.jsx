import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../../../../utils/rel';

class FirstAttention extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { tabs, content, stockData } = this.props;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <Chip id="10098" type="static" title="机构首次关注股" groupName="高手学堂" content={tabs}>
                            <tr>
                                <th width="70">{tabs[0]}</th>
                                <th width="65">{tabs[1]}</th>
                                <th width="65">{tabs[2]}</th>
                                <th width="95">{tabs[3]}</th>
                                <th width="60">{tabs[4]}</th>
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
                                        && stockData[`s_${item.code}`][3]
                                        && stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData[`s_${item.code}`][0] ? stockData[`s_${item.code}`][0].toFixed(2) : ''}
                                </td>
                                <td
                                    className={
                                        stockData !== ''
                                        && stockData[`s_${item.code}`][3]
                                        && stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData[`s_${item.code}`][3]
                                        ? `${stockData[`s_${item.code}`][3].toFixed(2)}%`
                                        : ''}
                                </td>
                                <td className={`${styles.price} ${styles.red}`}>{item.mbzf}</td>
                                <td>{item.investrating}</td>
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
FirstAttention.propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.array,
    stockData: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
FirstAttention.defaultProps = {};

export { FirstAttention };
export default FirstAttention;
