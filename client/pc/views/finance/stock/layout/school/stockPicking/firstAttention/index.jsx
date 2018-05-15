import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class FirstAttention extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, stockData } = this.props;
        const { tabs, data } = content;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <tr>
                            <th width="70">{tabs[0]}</th>
                            <th width="65">{tabs[1]}</th>
                            <th width="65">{tabs[2]}</th>
                            <th width="95">{tabs[3]}</th>
                            <th width="60">{tabs[4]}</th>
                            <th>{tabs[5]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.stock ? (
                                        <a href={item.stock.url} target="_blank" rel={rel}>
                                            {item.stock.name}
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                </td>
                                <td
                                    className={
                                        stockData !== '' && stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData ? stockData[`s_${item.code}`][0].toFixed(2) : ''}
                                </td>
                                <td
                                    className={
                                        stockData !== '' && stockData[`s_${item.code}`][3] > 0
                                            ? styles.red
                                            : styles.green
                                    }>
                                    {stockData ? stockData[`s_${item.code}`][3].toFixed(2) : ''}%
                                </td>
                                <td className={`${styles.price} ${styles.red}`}>{item.targetWidth}</td>
                                <td>{item.newRating}</td>
                                <td>
                                    {item.report && item.report.url ? (
                                        <a href={item.report.url} target="_blank" rel={rel}>
                                            {item.report.title.length > 15
                                                ? `${item.report.title.slice(0, 15)}...`
                                                : item.report.title}
                                        </a>
                                    ) : (
                                        item.report.title
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
    content: PropTypes.object,
    stockData: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
FirstAttention.defaultProps = {};

export { FirstAttention };
export default FirstAttention;
