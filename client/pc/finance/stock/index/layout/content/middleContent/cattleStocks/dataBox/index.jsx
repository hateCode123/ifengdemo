import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { getStockData } from '../../../../../../../../services/api';
import { rel } from '../../../../../../../../utils/rel';

class DataBox extends React.Component {
    static propTypes = {
        dataStock: PropTypes.array,
        current: PropTypes.number,
    };

    state = {
        prices: [],
        hash: '',
    };

    shouldComponentUpdate(nextProps, prevProps) {
        if (nextProps.dataStock === prevProps.dataStock && nextProps.current === prevProps.current) {
            return false;
        }

        return true;
    }

    componentDidMount() {
        this.getData();

        this.timer = setInterval(() => {
            this.getData();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    /**
     * 视频抓牛股数据请求
     */
    getData = async () => {
        try {
            const { dataStock } = this.props;
            const codeList = dataStock.map(item => item.code);
            const price = [];

            const data = await getStockData(codeList);

            const hash = new Date().valueOf();

            for (let a = 0; a < Object.keys(data).length; a++) {
                let style = '';
                let arrowImg = '';

                if (data[codeList[a]][3] > 0) {
                    style = 'red';
                    arrowImg = 'up';
                } else if (data[codeList[a]][3] < 0) {
                    style = 'green';
                    arrowImg = 'down';
                } else {
                    style = 'black';
                }

                price.push({
                    price: data[codeList[a]][0],
                    width: data[codeList[a]][2],
                    percent: data[codeList[a]][3],
                    style,
                    arrowImg,
                });
            }

            this.setState({
                hash,
                prices: price,
            });
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { prices, hash } = this.state;
        const { dataStock, current } = this.props;

        if (dataStock && prices.length > 0) {
            return (
                <div className={styles.data_box}>
                    <span className={`${styles[prices[current].style]} clearfix`}>
                        <span className={styles[prices[current].arrowImg]} />
                        <div className={styles.price}>{prices[current].price}</div>
                        <span>{` ${prices[current].width} (${prices[current].percent}%)`}</span>
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
                            <img src={`${dataStock[current].img}?${hash}`} width="300" height="163" />
                        </a>
                    </p>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default DataBox;
