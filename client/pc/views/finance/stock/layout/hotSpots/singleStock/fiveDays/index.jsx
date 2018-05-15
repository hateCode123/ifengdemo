import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class FiveDays extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { type, content } = this.props;
        const { tabs, data1, data2 } = content;
        const data = type === 0 ? data1 : data2;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <tr>
                            <th width="65">{tabs[0]}</th>
                            <th width="90">{tabs[1]}</th>
                            <th width="70">{tabs[2]}</th>
                            <th width="60">{tabs[3]}</th>
                            <th>{tabs[4]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name ? <a href={item.name.url}>{item.name.name}</a> : ''}</td>
                                <td className={type === 0 ? styles.red : styles.green}>{item.price}</td>
                                <td className={item.percent > 0 ? styles.red : styles.green}>{item.percent}</td>
                                <td className={item.percent > 0 ? styles.red : styles.green}>{item.newPrice}</td>
                                <td>
                                    {item.news ? (
                                        <a href={item.news.url} target="_blank" rel={rel} title={item.news.text}>
                                            {item.news.text.length > 16
                                                ? `${item.news.text.slice(0, 16)}...`
                                                : item.news.text}
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
FiveDays.propTypes = {
    type: PropTypes.number,
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
FiveDays.defaultProps = {};

export { FiveDays };
export default FiveDays;
