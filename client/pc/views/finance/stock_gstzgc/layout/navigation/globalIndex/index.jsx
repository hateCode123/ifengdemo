import React from 'react';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';

class GlobalIndex extends React.PureComponent {
    state = {
        stock: [
            {
                name: '上证指数',
                type: 'stock',
                code: 'sh000001',
            },
            {
                name: '深证成指',
                type: 'stock',
                code: 'sz399001',
            },
            {
                name: '创业板指数',
                type: 'stock',
                code: 'sz399006',
            },
            {
                name: '恒生指数',
                type: 'stock',
                code: 's_hk10000',
            },
        ],
        current: 0,
        prices: [],
    };

    /**
     * 请求数据
     */
    async componentDidMount() {
        const { stock } = this.state;
        const codeList = [];
        const price = [];

        stock.map(item => {
            codeList.push(item.code);

            return codeList;
        });

        const result = await jsonp('//hq.finance.ifeng.com/q.php', {
            data: {
                l: codeList.join(','),
                f: 'json',
                e: 'getJson(json_q)',
            },
            jsonpCallback: 'getJson',
        });

        for (let a = 0; a < Object.keys(result).length; a++) {
            let style = '';

            if (result[codeList[a]][2] > 0) {
                style = 'red';
            } else if (result[codeList[a]][2] < 0) {
                style = 'green';
            } else {
                style = 'black';
            }

            price.push({
                price: result[codeList[a]][1],
                percent: result[codeList[a]][3],
                style,
            });
        }

        this.setState({ prices: price });
    }

    /**
     * 渲染组件
     */
    render() {
        const { stock, prices } = this.state;

        return (
            <ul className={styles.qqList}>
                <li className={styles.lA}>
                    A股指数&nbsp;
                    <span>|&nbsp;</span>
                </li>
                <li>
                    <ul className={styles.globalIndex}>
                        {stock.map((item, index) => (
                            <li
                                key={index}
                                className={prices.length > 0 && prices[index].percent > 0 ? styles.rise : ''}>
                                {item.name}：&nbsp;
                                <span
                                    className={`${styles.price} ${
                                        prices.length > 0 ? styles[prices[index].style] : ''
                                    }`}>
                                    {prices.length > 0 ? prices[index].price : ''}
                                </span>&nbsp;
                                <span className={prices.length > 0 ? styles[prices[index].style] : ''}>
                                    {prices.length > 0 ? `${prices[index].percent.toFixed(2)}%` : ''}
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
GlobalIndex.propTypes = {};

/**
 * 定义组件默认属性
 * */
GlobalIndex.defaultProps = {};

export default GlobalIndex;
