import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import HotFundsTable from '../hotfundsTable/';

class HotFunds extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        current: 0,
        tabContentConfig: [
            {
                tabTxt: '热门权益类基金',
                title: [
                    { txt: '简称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '近一个月收益', tdKey: 'oneMonth', postfix: '%' },
                    // { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.jingneiQuanyiHotFunds || [],
            },
            {
                tabTxt: '热门货币类基金',
                title: [
                    { txt: '简称', tdKey: 'name', linkPrefix: '//etrade.fengfd.com/detail/' },
                    { txt: '7日年化', tdKey: 'rateSevenDay', postfix: '%' },
                    // { txt: '操作', tdKey: false, linkPrefix: '//etrade.fengfd.com/detail/' },
                ],
                content: this.props.content.jingneiHuobiHotFunds || [],
            },
        ],
    };
    handleTabsChange = v => {
        this.setState({
            current: v,
        });
    };
    render() {
        // const { content } = this.props;
        const { current, tabContentConfig } = this.state;
        const tabDom = tabContentConfig.map((item, v) => {
            return (
                <li
                    key={v}
                    className={v === current ? style.current : null}
                    onMouseOver={() => this.handleTabsChange(v)}>
                    {item.tabTxt}
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
            <div className="w240 fl" cmpp-type="s">
                <ul id="yb01" className={style.labe_01}>
                    {tabDom}
                </ul>
                {tabContentDom}
            </div>
        );
    }
}

export default HotFunds;
