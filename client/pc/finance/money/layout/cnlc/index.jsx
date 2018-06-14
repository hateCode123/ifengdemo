import React from 'react';
import PropTypes from 'prop-types';

import { jsonp, loadScript } from '@ifeng/ui_base';

import style from './style.css';
import '../../reset.css';
import CommonTitleXL from './../commonTitleXL/';
import CnlcTabControlArea from '../cnlcTabControlArea/';

class Cnlc extends React.PureComponent {
    state = {
        current: 0,
        tabContentConfig: [
            {
                tabTxt: '基金',
                content: {},
                analy: this.props.content.cnlcJijin || {},
            },
            {
                tabTxt: 'P2P',
                content: {},
                analy: this.props.content.cnlcP2P || {},
            },
            {
                tabTxt: '信托',
                content: {},
                analy: this.props.content.cnlcTrust || {},
            },
            {
                tabTxt: '私募',
                content: {},
                analy: this.props.content.cnlcPrivate || {},
            },
            {
                tabTxt: '银行理财',
                content: {},
                analy: this.props.content.cnlcFinance || {},
            },
        ],
        type: ['fund', 'p2p', 'trust', 'pe', 'bank'],
        uiConfig: [
            { current: 0, top: 0, answerUser: '全部专家', textArea: '' },
            { current: 0, top: 0, answerUser: '全部专家', textArea: '' },
            { current: 0, top: 0, answerUser: '全部专家', textArea: '' },
            { current: 0, top: 0, answerUser: '全部专家', textArea: '' },
            { current: 0, top: 0, answerUser: '全部专家', textArea: '' },
        ],
    };
    dealData = (data, type) => {
        //  把接口数据处理成cmpp里面输出的数据格式
        return {
            Stype: type,
            analyst: [...data].map(item => {
                return { name: item.name, img: item.img };
            }),

            qa: [...data].map(item => {
                return {
                    name: item.name,
                    count: item.count,
                    qaList: item.list.map(d => {
                        return {
                            a: d.answer,
                            ad: d.answer_date,
                            at: d.answer_time,
                            au: d.answer_user,
                            q: d.question,
                            qd: d.question_date,
                            qt: d.question_time,
                            qu: d.question_user,
                        };
                    }),
                };
            }),
        };
    };

    getData = async (TYPE, index) => {
        const { type, current, tabContentConfig } = this.state;
        let __i = index || current;
        const __type = TYPE || 'trust';
        const data = await jsonp(`http://app.finance.ifeng.com/gszb/ana_list.php?type=${__type}`);
        let arr = [...tabContentConfig];
        arr[__i].content = this.dealData(data, __type);
        this.setState({ tabContentConfig: [...arr] }, () => {
            console.log('tabContentConfig', tabContentConfig);
        });
    };
    componentDidMount() {
        const { type } = this.state;
        type.map(async (item, i) => {
            await this.getData(item, i);

            return {};
        });
    }
    handleTabsChange = v => {
        this.setState({
            current: v,
        });
    };
    changeUiConfig = obj => {
        const i = this.state.current;
        const arr = [...this.state.uiConfig];
        arr[i] = { ...obj };

        this.setState({
            uiConfig: [...arr],
        });
    };
    render() {
        const { content } = this.props;
        const { current, tabContentConfig, uiConfig } = this.state;
        const tabDom = tabContentConfig.map((item, v) => {
            return (
                <li key={v} className={v === current ? style.current : null} onClick={() => this.handleTabsChange(v)}>
                    <a>{item.tabTxt}</a>
                </li>
            );
        });

        return (
            <div className={style.cnlc} id="fxs">
                <CommonTitleXL config={{ img: 'bg02' }} content={content.cnlcTitle} />

                <div className={style.fxsdy}>
                    <ul className={style.labe_04}>{tabDom}</ul>
                    <CnlcTabControlArea
                        content={tabContentConfig[current].content}
                        analy={tabContentConfig[current].analy}
                        config={uiConfig[current]}
                        handle={this.changeUiConfig.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Cnlc.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Cnlc.defaultProps = {};
export { Cnlc };
export default Cnlc;
