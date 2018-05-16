import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
// import { rel } from '../../../../../utils/rel';
import HotFundsTable from '../hotfundsTable/';
import CommonTitleL from './../commonTitleL/';

class Rediantuijian extends React.PureComponent {
    // rediantuijianTableStock,
    // rediantuijianTableMix,
    // rediantuijianTableZhishu,
    // rediantuijianTableZhaiquan,
    // rediantuijianTableMoney,
    state = {
        current: 0,
        tabContentConfig: [
            {
                tabTxt: '股票型',
                title: [
                    { txt: '基金名称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '基金代码', tdKey: 'code' },
                    { txt: '最新净值', tdKey: 'unitNet' },
                    { txt: '今年收益', tdKey: 'fromThisYear', postfix: '%' },
                    { txt: '近一年收益', tdKey: 'oneYear', postfix: '%' },
                    { txt: '近一月收益', tdKey: 'oneMonth', postfix: '%' },
                    { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.rediantuijianTableStock || [],
            },
            {
                tabTxt: '混合型',
                title: [
                    { txt: '基金名称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '基金代码', tdKey: 'code' },
                    { txt: '最新净值', tdKey: 'unitNet' },
                    { txt: '今年收益', tdKey: 'fromThisYear', postfix: '%' },
                    { txt: '近一年收益', tdKey: 'oneYear', postfix: '%' },
                    { txt: '近一月收益', tdKey: 'oneMonth', postfix: '%' },
                    { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.rediantuijianTableMix || [],
            },
            {
                tabTxt: '指数型',
                title: [
                    { txt: '基金名称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '基金代码', tdKey: 'code' },
                    { txt: '最新净值', tdKey: 'unitNet' },
                    { txt: '今年收益', tdKey: 'fromThisYear', postfix: '%' },
                    { txt: '近一年收益', tdKey: 'oneYear', postfix: '%' },
                    { txt: '近一月收益', tdKey: 'oneMonth', postfix: '%' },
                    { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.rediantuijianTableZhishu || [],
            },
            {
                tabTxt: '债券型',
                title: [
                    { txt: '基金名称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '基金代码', tdKey: 'code' },
                    { txt: '最新净值', tdKey: 'unitNet' },
                    { txt: '今年收益', tdKey: 'fromThisYear', postfix: '%' },
                    { txt: '近一年收益', tdKey: 'oneYear', postfix: '%' },
                    { txt: '近一月收益', tdKey: 'oneMonth', postfix: '%' },
                    { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.rediantuijianTableZhaiquan || [],
            },
            {
                tabTxt: '货币型',
                title: [
                    { txt: '基金名称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '基金代码', tdKey: 'code' },
               
                    { txt: '万份收益', tdKey: 'unitInterest', postfix: '%' },
                    { txt: '7日年化收益率', tdKey: 'rateSevenDay', postfix: '%' },
                   
                    { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.rediantuijianTableMoney || [],
            },
        ],
    };
    handleTabsChange = v => {
        this.setState({
            current: v,
        });
    };
    render() {
        const { content } = this.props;
        const { current, tabContentConfig } = this.state;
        const tabDom = tabContentConfig.map((item, v) => {
            return (
                <li
                    key={v}
                    className={v === current ? style.current : null}
                    onMouseOver={() => this.handleTabsChange(v)}>
                    <a>{item.tabTxt}</a>
                </li>
            );
        });

        const tabContentDom = tabContentConfig.map((item, v) => {
            return current === v ? (
                <div key={v}>
                    <HotFundsTable content={item.content} head={item.title} />
                </div>
            ) : (
                ''
            );
        });

        return (
            <div className={style.rdtj}>
                <Chip
                    id="10113"
                    type="static"
                    title="热点推荐title"
                    groupName="首屏"
                    content={content.rediantuijianTitle}>
                    <CommonTitleL />
                </Chip>
                {/* <Rediantuijian content={content} /> */}
                <div style={{ marginTop: '18px' }}>
                    <ul className={style.labe_02}>{tabDom}</ul>
                    {tabContentDom}
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Rediantuijian.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Rediantuijian.defaultProps = {};
export { Rediantuijian };
export default Rediantuijian;
