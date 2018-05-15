import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class Track extends React.PureComponent {
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
                            <th width="63">{tabs[0]}</th>
                            <th width="68">{tabs[1]}</th>
                            <th width="67">{tabs[2]}</th>
                            <th width="76">{tabs[3]}</th>
                            <th width="60">{tabs[4]}</th>
                            <th width="210">{tabs[5]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.time}</td>
                                <td>{item.name ? <a href={item.name.url}>{item.name.name}</a> : ''}</td>
                                <td className={item.type === '买盘' ? styles.red : styles.green}>{item.type}</td>
                                <td className={styles.price}>{item.price}</td>
                                <td>
                                    {item.details ? (
                                        <a href={item.details} target="_blank" rel={rel}>
                                            查看
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                </td>
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
Track.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
Track.defaultProps = {};

export { Track };
export default Track;
