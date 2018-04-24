import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp, loadScript } from '@ifeng/ui_base';

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
        const { stock } = this.state;
        const codeList = [];
        const price = [];

        stock.map(item => {
            codeList.push(item.code);

            return codeList;
        });

        const result = await jsonp('http://hq.finance.ifeng.com/q.php', {
            data: {
                l: codeList.join(','),
                f: 'json',
                e: 'dddddd(json_q)',
            },
            jsonpCallback: 'dddddd',
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
                price: result[codeList[a]][0],
                index: result[codeList[a]][2],
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
            <div className={styles.stock_box}>
                {stock.map((item, index) => (
                    <div key={index} className={`${styles.stock_container} ${styles[`box${index}`]}`}>
                        <a href={`http://finance.ifeng.com/app/hq/${item.type}/${item.code}`}>
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

/**
 * 定义组件属性类型
 * */
StockBox.propTypes = {};

/**
 * 定义组件默认属性
 * */
StockBox.defaultProps = {};

export { StockBox };
export default StockBox;
