import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import DataBox from './dataBox/';

class CattleStocks extends React.PureComponent {
    state = {
        dataStock: [
            {
                title: '沪市',
                code: 's_sh000001',
                name: '上证',
                url: '//finance.ifeng.com/app/hq/stock/sh000001/',
                img: '//finance.ifeng.com/app/img/small/nf_sh000011.gif',
            },
            {
                title: '深市',
                code: 's_sz399001',
                name: '深成指',
                url: '//finance.ifeng.com/app/hq/stock/sz399001/',
                img: '//finance.ifeng.com/app/img/small/nf_sz399001.gif',
            },
            {
                title: '恒指',
                code: 'hk10000',
                name: '恒指',
                url: '//finance.ifeng.com/app/hq/hkstock/hk10000/',
                img: '//finance.ifeng.com/app/img/small/nf_hk10000.gif',
            },
            {
                title: '基金',
                code: 's_sh000011',
                name: '基金',
                url: '//app.finance.ifeng.com/list/fund_tzlx.php',
                img: '//finance.ifeng.com/app/img/small/nf_sh000011.gif',
            },
        ],
        current: 0,
        searchTxt: '',
    };

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    handleChange = async e => {
        try {
            const val = e.currentTarget.value;
            const data = await jsonp('//app.finance.ifeng.com/hq/suggest_v2.php', {
                data: {
                    t: 'all',
                    q: val,
                    cb: 'suggestCallback(suggest_json)',
                },
                jsonpCallback: 'suggestCallback',
            });

            this.setState({ searchTxt: data[0] });
        } catch (e) {
            console.log(e);
        }
    };

    handleStockSearch = () => {
        const { searchTxt } = this.state;

        window.open(`//finance.ifeng.com/app/hq/${searchTxt.t}/${searchTxt.c}/index.shtml`);
    };

    handleFundsSearch = () => {
        const { searchTxt } = this.state;

        window.open(`//finance.ifeng.com/zjlx/${searchTxt.c}`);
    };

    /**
     * 渲染组件
     */
    render() {
        const { dataStock, current } = this.state;

        return (
            <div className={styles.box}>
                <div className={styles.stock_box}>
                    <ul className={`${styles.tabs} clearfix`}>
                        {dataStock.map((item, index) => (
                            <li
                                key={index}
                                data-index={index}
                                className={current === index ? styles.current : ''}
                                onMouseEnter={this.handleMouseOver}>
                                <a href={item.url} target="_blank" rel={rel}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <DataBox dataStock={dataStock} current={current} />
                </div>
                <div className={`${styles.search} clearfix`}>
                    <input placeholder="代码/拼音/名称" onKeyUp={this.handleChange} />
                    <a onClick={this.handleStockSearch}>查行情</a>
                    <a onClick={this.handleFundsSearch}>查资金</a>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CattleStocks.propTypes = {};

/**
 * 定义组件默认属性
 * */
CattleStocks.defaultProps = {};

export { CattleStocks };
export default CattleStocks;
