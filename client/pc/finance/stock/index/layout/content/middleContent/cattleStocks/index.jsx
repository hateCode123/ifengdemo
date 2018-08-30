import React from 'react';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import DataBox from './dataBox/';

class CattleStocks extends React.PureComponent {
    state = {
        searchTxt: '代码/拼音/名称',
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
    };

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    handleChange = async e => {
        try {
            const val = e.currentTarget.value;

            if (val !== '') {
                this.setState({
                    searchTxt: val,
                });
            } else {
                this.setState({
                    searchTxt: '',
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    handleKeydown = async e => {
        if (e.keyCode === 13) {
            const val = e.currentTarget.value;

            window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&q=${val}`);
        }
    };

    handleFocus = e => {
        const val = e.currentTarget.value;

        if (val === '代码/拼音/名称') {
            this.setState({ searchTxt: '' });
        }
    };

    handleBlur = e => {
        const val = e.currentTarget.value;

        if (val === '') {
            this.setState({ searchTxt: '代码/拼音/名称' });
        }
    };

    handleStockSearch = () => {
        const { searchTxt } = this.state;

        window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&q=${searchTxt}`);
    };

    /**
     * 渲染组件
     */
    render() {
        const { searchTxt, dataStock, current } = this.state;

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
                    <input
                        value={searchTxt}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeydown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    <a onClick={this.handleStockSearch}>查行情</a>
                </div>
            </div>
        );
    }
}

export default CattleStocks;
