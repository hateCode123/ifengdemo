import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class MarketRadar extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { tabs, data } = content;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <tr>
                            <th width="65">{tabs[0]}</th>
                            <th width="70">{tabs[1]}</th>
                            <th width="90">{tabs[2]}</th>
                            <th width="60">{tabs[3]}</th>
                            <th>{tabs[4]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name ? <a href={item.name.url}>{item.name.name}</a> : ''}</td>
                                <td>{item.type}</td>
                                <td className={styles.price}>{item.price}</td>
                                <td className={item.fouds > 0 ? styles.red : styles.green}>{item.newPrice}</td>
                                <td>
                                    {item.news ? (
                                        <a href={item.news.url} target="_blank" rel={rel} title={item.news.text}>
                                            {item.news.text.length > 20
                                                ? `${item.news.text.slice(0, 20)}...`
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
MarketRadar.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
MarketRadar.defaultProps = {};

export { MarketRadar };
export default MarketRadar;
