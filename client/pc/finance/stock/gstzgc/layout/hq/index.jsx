import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import TitleR from '../titleR';
import Niugu from './spzng';
import RiseFall from './zdph';
import MoneyFlow from './zjlx';
import { CustomStocks } from './zxg';

class Hq extends React.PureComponent {
    render() {
        const { content } = this.props;

        const spzngData = {
            spzngTit: content.hqSubtitle.spzngTit,
            spzngTabs: [
                { url: '//finance.ifeng.com/app/hq/stock/sh000001/', title: '沪市' },
                { url: '//finance.ifeng.com/app/hq/stock/sz399001/', title: '深市' },
                { url: '//app.finance.ifeng.com/list/fund_tzlx.php', title: '恒指' },
                { url: '//app.finance.ifeng.com/list/gold.php', title: '基金' },
            ],
        };

        const zdphData = {
            zdphTit: content.hqSubtitle.zdphTit,
            zdphTable: [
                {
                    trTit: '个股涨跌',
                    tableHead: ['股票名称', '涨跌幅'],
                    type: [0, 1],
                },
                {
                    trTit: '5分钟涨跌',
                    tableHead: ['股票名称', '涨跌幅'],
                    type: [6, 7],
                },
                {
                    trTit: '量比排行',
                    tableHead: ['股票名称', '量比'],
                    type: [5],
                },
                {
                    trTit: '板块涨跌',
                    tableHead: ['股票名称', '涨跌幅'],
                    type: [2, 3],
                },
                {
                    trTit: '概念涨跌',
                    tableHead: ['股票名称', '涨跌幅'],
                    type: [12, 13],
                },
            ],
        };

        const zjlxData = {
            zjlxTit: content.hqSubtitle.zjlxTit,
            zjlxTable: [
                {
                    trTit: '当日流入',
                    tableHead: ['股票名称', '增减仓'],
                    type: [0],
                },
                {
                    trTit: '当日流出',
                    tableHead: ['股票名称', '增减仓'],
                    type: [1],
                },
                {
                    trTit: '5日增仓',
                    tableHead: ['股票名称', '增减仓'],
                    type: [2],
                },
                {
                    trTit: '5日减仓',
                    tableHead: ['股票名称', '增减仓'],
                    type: [3],
                },
                {
                    trTit: '20日增仓',
                    tableHead: ['股票名称', '增减仓'],
                    type: [4],
                },
                {
                    trTit: '20日减仓',
                    tableHead: ['股票名称', '增减仓'],
                    type: [5],
                },
            ],
        };

        const zxgData = {
            zxgTit: content.hqSubtitle.zxgTit,
        };

        return (
            <div className={styles.box300}>
                <Chip id="10059" type="static" title="行情" groupName="文章" content={content.hqTitle}>
                    <TitleR content={content.hqTitle} />
                </Chip>
                <Niugu content={spzngData} />
                <RiseFall content={zdphData} />
                <MoneyFlow content={zjlxData} />
                <CustomStocks content={zxgData} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Hq.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Hq.defaultProps = {};

export default Hq;
