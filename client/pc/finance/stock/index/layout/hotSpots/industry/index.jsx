import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../utils/rel';

class Industry extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        current: 0,
        max: 8,
    };

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, max } = this.state;
        const { industry, hyin, hyout, gnin, gnout } = this.props.content;
        const { tabs, tableTabs, image, imageUrl } = industry;
        const data = [hyin, hyout, gnin, gnout];
        const datas = data[current];

        const diff = max - datas.length;

        for (let a = 0; a < diff; a++) {
            datas.push({});
        }

        return (
            <div className={styles.data_box}>
                <ul className={`${styles.tabs} clearfix`}>
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            data-index={index}
                            className={current === index ? styles.current : ''}
                            onMouseEnter={this.handleMouseOver}>
                            {item}
                        </li>
                    ))}
                </ul>
                <div className={styles.data}>
                    <a href={imageUrl[current]} target="_blank" rel={rel}>
                        <img src={image[current]} />
                    </a>
                    <table>
                        <thead>
                            <tr>
                                <th width="100">{tableTabs[0]}</th>
                                <th width="95">{tableTabs[1]}</th>
                                <th width="60">{tableTabs[2]}</th>
                                <th>{tableTabs[3]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <a
                                            href={`//app.finance.ifeng.com/list/stock_cate.php?c=${item.symbol}`}
                                            target="_blank"
                                            rel={rel}>
                                            {item.name}
                                        </a>
                                    </td>
                                    <td className={item.amount > 0 ? styles.red : styles.green}>{item.amount}</td>
                                    <td>
                                        {item.code ? (
                                            <a
                                                href={`//app.finance.ifeng.com/hq/trade/cate_zijin_fc.php?code=${
                                                    item.code
                                                }`}
                                                target="_blank"
                                                rel={rel}>
                                                查看
                                            </a>
                                        ) : (
                                            ''
                                        )}
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
            </div>
        );
    }
}

export default errorBoundary(Industry);
