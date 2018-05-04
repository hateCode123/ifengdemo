import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';
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
        nowTime: '',
        searchTxt: '',
    };

    componentDidMount() {
        const refreshCalendarClock = () => {
            const now = new Date();
            let time = '';
            let hours = now.getHours();

            if (hours < 10) {
                hours = `0${hours}`;
            }
            time += `${hours}:`;
            let minutes = now.getMinutes();

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            time += minutes;

            this.setState({
                nowTime: time,
            });
        };

        refreshCalendarClock();
        setInterval(() => {
            refreshCalendarClock();
        }, 1000);
    }

    handleMouseOver = index => {
        this.setState({ current: index });
    };

    handleChange = e => {
        const val = e.target.value;

        jsonp('http://app.finance.ifeng.com/hq/suggest_v2.php', {
            data: {
                t: 'all',
                q: val,
                cb: 'suggestCallback(suggest_json)',
            },
            jsonpCallback: 'suggestCallback',
        }).then(data => {
            this.setState({ searchTxt: data[0] });
        });
    };

    handleStockSearch = () => {
        const { searchTxt } = this.state;

        window.open(`http://finance.ifeng.com/app/hq/${searchTxt.t}/${searchTxt.c}/index.shtml`);
    };

    handleFundsSearch = () => {
        const { searchTxt } = this.state;

        window.open(`http://finance.ifeng.com/zjlx/${searchTxt.c}`);
    };

    /**
     * 渲染组件
     */
    render() {
        const { dataStock, nowTime, current } = this.state;
        const { content } = this.props;
        const { title, url } = content;

        return (
            <div className={styles.cattle_stocks}>
                <MidTitle title={title} url={url} nowTime={nowTime} />
                <div className={styles.stock_box}>
                    <ul className={`${styles.tabs} clearfix`}>
                        {dataStock.map((item, index) => (
                            <li
                                key={index}
                                className={current === index ? styles.current : ''}
                                onMouseEnter={() => this.handleMouseOver(index)}>
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
CattleStocks.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
CattleStocks.defaultProps = {};

export { CattleStocks };
export default CattleStocks;
