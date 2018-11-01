import React from 'react';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { getFundsFlowData } from '../../../../../services/api';
import { rel } from '../../../../../utils/rel';

class FundsFlow extends React.PureComponent {
    state = {
        isOver: 0,
        flow: [],
    };

    handMouseOver = index => {
        this.setState({ isOver: index });
    };

    /**
     * 请求数据
     */
    async componentDidMount() {
        try {
            const data = await getFundsFlowData();

            const datas = data.filter((item, index) => {
                return [0, 1, 10, 11].includes(index);
            });

            this.setState({ flow: datas });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 组建柱状图样式
     */
    getStyle = tenDayList => {
        // 柱状图每只最大值
        const flowMax = Math.max(...tenDayList.map(item => Math.abs(item)));

        const styles = tenDayList.map(item => {
            let style = {};
            const height = Math.abs(12 * (item / flowMax));

            if (item > 0) {
                style = {
                    color: 'red',
                    style: { height: `${height}px`, marginTop: `${12 - height}px` },
                };
            } else {
                style = {
                    color: 'green',
                    style: { height: `${height}px`, marginTop: '12px' },
                };
            }

            return style;
        });

        return styles;
    };

    /**
     * 获取柱状图数据
     */
    getData = tenDayList => {
        const style = this.getStyle(tenDayList);

        return tenDayList.map((item, index) => (
            <a key={index} title={item}>
                <div className={styles[style[index].color]} style={style[index].style} />
            </a>
        ));
    };

    /**
     * 渲染组件
     */
    render() {
        const { isOver, flow } = this.state;
        const list = isOver === 0 ? flow.slice(0, 2) : flow.slice(2, 4);

        return (
            <div className={styles.flow_box}>
                <div className={styles.tabs}>
                    <ul className={styles.list}>
                        <li
                            className={`${styles.item} ${isOver === 0 ? styles.current : ''}`}
                            onMouseEnter={() => this.handMouseOver(0)}>
                            资金流入
                        </li>
                        <li
                            className={`${styles.item} ${isOver === 1 ? styles.current : ''}`}
                            onMouseEnter={() => this.handMouseOver(1)}>
                            资金流出
                        </li>
                    </ul>
                    <div className={styles.more}>
                        <a href="//finance.ifeng.com/zjlx/" target="_blank" rel={rel} title="查看更多">
                            查看更多&gt;&gt;
                        </a>
                    </div>
                </div>
                <div className={styles.table}>
                    <table className={styles.head}>
                        <tbody>
                            <tr>
                                <th width={72} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    股票名称
                                </th>
                                <th width={135} style={{ textAlign: 'center' }}>
                                    增减金额（万）
                                </th>
                                <th width={46} style={{ textAlign: 'center' }}>
                                    股价
                                </th>
                                <th style={{ paddingLeft: '33px' }}>十日资金净流{isOver === 0 ? '入' : '出'}</th>
                            </tr>
                            {list.map((item, index) => (
                                <tr key={index} className={styles.list}>
                                    <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                                        <a
                                            href={`//finance.ifeng.com/app/hq/stock/${item.code}`}
                                            target="_blank"
                                            rel={rel}>
                                            {item.name}
                                        </a>
                                    </td>
                                    <td
                                        className={
                                            item.tenDayList[item.tenDayList.length - 1] > 0 ? styles.red : styles.green
                                        }
                                        style={{ textAlign: 'center' }}>
                                        <span>
                                            {Number(item.tenDayList[item.tenDayList.length - 1]) === 0
                                                ? 0
                                                : item.tenDayList[item.tenDayList.length - 1].toFixed(0)}
                                        </span>
                                    </td>
                                    <td
                                        className={item.last > 0 ? styles.red : styles.green}
                                        style={{ textAlign: 'center' }}>
                                        <span>{item.last}</span>
                                    </td>
                                    <td className={styles.histogram}>{this.getData(item.tenDayList)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default errorBoundary(FundsFlow);
