import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import CommonTitleXL from './../commonTitleXL/';
import { rel } from '../../../../../utils/rel';
import CnlcTabControlArea from '../cnlcTabControlArea/';

class Cnlc extends React.PureComponent {
    state = {
        current: 0,
        tabContentConfig: [
            {
                tabTxt: '基金',
                content: this.props.content.cnlcListJijin || {},
                analy: this.props.content.cnlcJijin || {},
            },
            {
                tabTxt: 'P2P',
                content: this.props.content.cnlcListP2P || {},
                analy: this.props.content.cnlcP2P || {},
            },
            {
                tabTxt: '信托',
                content: this.props.content.cnlcListTrust || {},
                analy: this.props.content.cnlcTrust || {},
            },
            {
                tabTxt: '私募',
                content: this.props.content.cnlcListPrivate || {},
                analy: this.props.content.cnlcPrivate || {},
            },
            {
                tabTxt: '银行理财',
                content: this.props.content.cnlcListFinance || {},
                analy: this.props.content.cnlcFinance || {},
            },
        ],
        uiConfig: [
            { current: 0, top: 0 },
            { current: 0, top: 0 },
            { current: 0, top: 0 },
            { current: 0, top: 0 },
            { current: 0, top: 0 },
        ],
    };
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
        },()=> {
            console.log(this.state.uiConfig)
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
            <div className={style.cnlc}>
                <Chip id="10047" type="static" title="分析师答疑title" groupName="" content={content.cnlcTitle}>
                    <CommonTitleXL />
                </Chip>
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
