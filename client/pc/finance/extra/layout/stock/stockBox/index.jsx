import React from 'react';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { getStockData } from '../../../../../services/api';
import { rel } from '../../../../../utils/rel';
class StockBox extends React.PureComponent {
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
                name: '沪深300',
                type: 'stock',
                code: 'sz399300',
            },
        ],
        current: 0,
        prices: [],
    };

    /**
     * 请求数据
     */
    async componentDidMount() {
        try {
            const { stock } = this.state;
            const codeList = stock.map(item => item.code);
            const result = await getStockData(codeList);

            const price = codeList.map(item => {
                let style = '';

                if (result[item][2] > 0) {
                    style = 'red';
                } else if (result[item][2] < 0) {
                    style = 'green';
                } else {
                    style = 'black';
                }

                return {
                    price: result[item][0],
                    index: result[item][2],
                    percent: result[item][3],
                    style,
                };
            });

            this.setState({ prices: price });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 渲染组件
     */
    render() {
        const { stock, prices } = this.state;

        return (
            <div className={styles.stock_box}>
                {stock.map((item, index) => (
                    <div key={index} className={`${styles.stock_container} ${styles[`box${index}`]}`}>
                        <a href={`//finance.ifeng.com/app/hq/${item.type}/${item.code}`} target="_blank" rel={rel}>
                            <div className={styles.text}>{item.name}</div>
                            <div className={`${styles.price} ${prices.length > 0 ? styles[prices[index].style] : ''}`}>
                                {prices.length > 0 ? prices[index].price : ''}
                            </div>
                            <div
                                className={`${styles.change_box} ${
                                    prices.length > 0 ? styles[prices[index].style] : ''
                                }`}>
                                {prices.length > 0 ? prices[index].index : ''}
                                <span>|</span>
                                {prices.length > 0 ? `${prices[index].percent}%` : ''}
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        );
    }
}

export default errorBoundary(StockBox);