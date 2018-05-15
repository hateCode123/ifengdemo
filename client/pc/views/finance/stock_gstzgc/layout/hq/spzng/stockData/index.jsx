import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import { jsonp } from '@ifeng/ui_base';

class StockData extends React.PureComponent {
    state = {
        dataStock: [
            {
                code: 's_sh000001',
                name: '上证',
                url: '//finance.ifeng.com/app/hq/stock/sh000001/',
                img: '//finance.ifeng.com/app/img/small/nf_sh000011.gif',
            },
            {
                code: 's_sz399001',
                name: '深成指',
                url: '//finance.ifeng.com/app/hq/stock/sz399001/',
                img: '//finance.ifeng.com/app/img/small/nf_sz399001.gif',
            },
            {
                code: 'hk10000',
                name: '恒指',
                url: '//finance.ifeng.com/app/hq/hkstock/hk10000/',
                img: '//finance.ifeng.com/app/img/small/nf_hk10000.gif',
            },
            {
                code: 's_sh000011',
                name: '基金',
                url: '//app.finance.ifeng.com/list/fund_tzlx.php',
                img: '//finance.ifeng.com/app/img/small/nf_sh000011.gif',
            },
        ],
        prices: [],
    };

    /**
     * 请求数据
     */
    async componentDidMount() {
        const ngDataStock = this.state.dataStock;
        const codeList = [];
        const price = [];

        ngDataStock.map(item => {
            codeList.push(item.code);

            return codeList;
        });

        const getStockData = async () => {
            const result = await jsonp('//hq.finance.ifeng.com/q.php', {
                data: {
                    l: codeList.join(','),
                    f: 'json',
                    e: 'getJson_q(json_q)',
                },
                jsonpCallback: 'getJson_q',
            });

            for (let a = 0; a < Object.keys(result).length; a++) {
                let style = '';
                let arrowImg = '';

                if (result[codeList[a]][3] > 0) {
                    style = 'red';
                    arrowImg = '//img.ifeng.com/tres/finance/deco/2011/0705/icon10.gif';
                } else if (result[codeList[a]][3] < 0) {
                    style = 'green';
                    arrowImg = '//img.ifeng.com/tres/finance/deco/2011/0705/icon16.gif';
                } else {
                    style = 'black';
                }

                price.push({
                    price: result[codeList[a]][0],
                    zhangfu: result[codeList[a]][2],
                    percent: result[codeList[a]][3],
                    style,
                    arrowImg,
                });
            }
            this.setState({ prices: price });
        };

        getStockData();
        setInterval(() => {
            getStockData();
        }, 5000);
    }

    render() {
        const { current } = this.props;
        const { prices, dataStock } = this.state;

        return (
            <div className={styles.dataPic}>
                <span data_code={dataStock.code} className={styles.data}>
                    <img src={prices.length > 0 ? prices[current].arrowImg : ''} />&nbsp;
                    <strong className={prices.length > 0 ? styles[prices[current].style] : ''}>
                        {prices.length > 0 ? prices[current].price : ''}
                    </strong>
                    &nbsp;<span className={prices.length > 0 ? styles[prices[current].style] : ''}>
                        {prices.length ? prices[current].zhangfu : ''} (
                        {prices.length > 0 ? prices[current].percent : ''}%)
                    </span>
                    <a
                        href={dataStock[current].url}
                        target="_blank"
                        rel={rel}
                        alt={dataStock[current].name}
                        title={dataStock[current].name}>
                        {dataStock[current].name}
                    </a>
                </span>

                <p>
                    <a href={dataStock[current].url} target="_blank" rel={rel}>
                        <img src={dataStock[current].img} width="300" height="163" />
                    </a>
                </p>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockData.propTypes = { current: PropTypes.number };

/**
 * 定义组件默认属性
 * */
StockData.defaultProps = {};

export default StockData;
