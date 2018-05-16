import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import RecommendStock from './recommendStock/';
import Target from './target';
import Rating from './rating/';
import FirstAttention from './firstAttention/';
import HighestAttention from './highestAttention';

class StockPicking extends React.PureComponent {
    state = {
        stockData: '',
        current: 0,
    };

    componentDidMount() {
        this.getStockData();

        setInterval(() => {
            this.getStockData();
        }, 60000);
    }

    handleMouseOver = e => {
        const index = Number(e.target.attributes['data-index'].value);

        this.setState({ current: index });
    };

    getStockData = async () => {
        try {
            const data = await jsonp('//hq.finance.ifeng.com/q.php', {
                data: {
                    l:
                        's_sz000062,s_sh600841,s_sz300304,s_sh600827,s_sz002251,s_sz002081,s_sh601169,s_sh600271,s_sz300074,s_sz000728,s_sz002050,s_sz300065,s_sh600699,s_sz002191,s_sz300180,s_sz000612,s_sz300006,s_sh601166,s_sh600048,s_sh601699,s_sz000858,s_sh601288,s_sh600104,s_sh600519,s_sh600188,s_sz002142,s_sh600036,s_sz300208,s_sz300275,s_sz300186,s_sz002474,s_sh600884,s_sh601933,s_sz002521,s_sz300047,s_sz300039,s_sz000895,s_sz300079,s_sz002304,s_sz300170,s_sz300075,s_sh600703,s_sh600648,s_sz002049,s_sh600998,s_sh600352,s_sh601998',
                    f: 'json',
                    e: 'suggestCallback(json_q)',
                },
                jsonpCallback: 'suggestCallback',
            });

            this.setState({ stockData: data });
        } catch (e) {
            console.log(e);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { stockData, current } = this.state;
        const { tabs, content } = this.props;
        const data = content[current];

        let list = null;

        if (stockData) {
            if (current === 0) {
                list = <RecommendStock stockData={stockData} tabs={data[0][0].tabs} content={data[1]} />;
            } else if (current === 1) {
                list = <Target stockData={stockData} tabs={data[0][0].tabs} content={data[1]} />;
            } else if (current === 2) {
                list = <Rating stockData={stockData} tabs={data[0][0].tabs} content={data[1]} />;
            } else if (current === 3) {
                list = <FirstAttention stockData={stockData} tabs={data[0][0].tabs} content={data[1]} />;
            } else if (current === 4) {
                list = <HighestAttention stockData={stockData} tabs={data[0][0].tabs} content={data[1]} />;
            }
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
                {list}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockPicking.propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
StockPicking.defaultProps = {};

export { StockPicking };
export default StockPicking;
