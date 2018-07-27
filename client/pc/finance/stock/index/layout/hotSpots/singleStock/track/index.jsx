import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../components/dataProcessing';
import { rel } from '../../../../../../../utils/rel';

class Track extends React.PureComponent {
    static propTypes = {
        tabs: PropTypes.array,
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, content } = this.props;

        return (
            <div className={styles.data_box}>
                <table>
                    <thead>
                        <Chip
                            id="10090"
                            type="static"
                            title="大单追踪"
                            groupName="操盘热点"
                            translate="jsonParse"
                            content={tabs}>
                            <tr>
                                <th width="63">{tabs[0]}</th>
                                <th width="68">{tabs[1]}</th>
                                <th width="67">{tabs[2]}</th>
                                <th width="76">{tabs[3]}</th>
                                <th width="60">{tabs[4]}</th>
                                <th width="210">{tabs[5]}</th>
                            </tr>
                        </Chip>
                    </thead>
                    <tbody>
                        {content.map((item, index) => (
                            <tr key={index}>
                                <td>{item.hqtime}</td>
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
                                <td className={item.opttype === '买盘' ? styles.red : styles.green}>{item.opttype}</td>
                                <td className={styles.price}>{item.amount}</td>
                                <td>
                                    <a
                                        href={`//app.finance.ifeng.com/hq/stock_bill.php?code=${item.code}`}
                                        target="_blank"
                                        rel={rel}>
                                        查看
                                    </a>
                                </td>
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

export default errorBoundary(dataProcessing(Track));
