import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../../utils/rel';

class FiveDays extends React.PureComponent {
    static propTypes = {
        current: PropTypes.number,
        tabs: PropTypes.array,
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, tabs, content } = this.props;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <Chip
                            id="10091"
                            type="static"
                            title="5日增减仓"
                            groupName="操盘热点"
                            translate="jsonParse"
                            content={tabs}>
                            <tr>
                                <th width="65">{tabs[0]}</th>
                                <th width="90">{tabs[1]}</th>
                                <th width="70">{tabs[2]}</th>
                                <th width="60">{tabs[3]}</th>
                                <th>{tabs[4]}</th>
                            </tr>
                        </Chip>
                    </thead>
                    <tbody>
                        {content.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.name ? (
                                        <a
                                            href={`//finance.ifeng.com/app/hq/stock/${item.code}/`}
                                            target="_blank"
                                            rel={rel}>
                                            {item.name}
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                </td>
                                <td className={current === 2 ? styles.red : styles.green}>{item.value}</td>
                                <td className={item.chgpct > 0 ? styles.red : styles.green}>{item.chgpct}</td>
                                <td className={item.chgpct > 0 ? styles.red : styles.green}>{item.last}</td>
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

export default errorBoundary(FiveDays);
