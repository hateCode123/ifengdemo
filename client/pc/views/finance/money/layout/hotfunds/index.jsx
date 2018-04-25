import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';
 
class HotFundsInner extends React.PureComponent {
    render() {
        
        const { content } = this.props;
     
      

        return (
            <div className='w240 fl' cmpp-type="s">
                        <ul id="yb01" className={style.labe_01}>
                            <li className="">热门权益类基金</li>
                            <li className={style.current}>热门货币类基金</li>
                        </ul>
                        <div id="yb01-1"  >
                            <div id="tab1" className={style.abo}>
                                <table width="100%" border="0">
                                    <thead>
                                        <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <th width="110" className='pl20'>
                                                简称
                                            </th>
                                            <th width="100">近一个月收益</th>
                                            <th width="50">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/003954/"
                                                    target="_blank"
                                                    title="003954">
                                                    华泰柏瑞价值精选
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>9.56%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/003954/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/080005/"
                                                    target="_blank"
                                                    title="080005">
                                                    长盛量化红利混合
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>8.72%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/080005/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="yb01-2"  >
                            <div id="tab2" className={style.abo}>
                                <table width="100%" border="0">
                                    <thead>
                                        <tr style={{'background': 'rgb(255, 255, 255)'}}>
                                            <th width="110" className='pl20'>
                                                简称
                                            </th>
                                            <th width="100">7日年化</th>
                                            <th width="50">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/001233/"
                                                    target="_blank"
                                                    title="001233">
                                                    嘉合货币B
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>5.35%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/001233/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style={{background: "rgb(255, 255, 255)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/001232/"
                                                    target="_blank"
                                                    title="001232">
                                                    嘉合货币A
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>5.10%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/001232/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/004904/"
                                                    target="_blank"
                                                    title="004904">
                                                    人保货币B
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>5.10%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004904/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/004903/"
                                                    target="_blank"
                                                    title="004903">
                                                    人保货币A
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>4.85%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004903/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                            <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/000605/"
                                                    target="_blank"
                                                    title="000605">
                                                    银华多利宝货币B
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>4.78%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/000605/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style={{"background": "rgb(250, 250, 250)"}}>
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/004369/"
                                                    target="_blank"
                                                    title="004369">
                                                    前海开源聚财宝B
                                                </a>
                                            </td>
                                            <td className={`${style.color_red}  ${style.fl14}`}>4.78%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004369/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                               {/* <style>#yb01-2 .abo table tr td.color_red{padding-left: 3px;}</style>   */}
                        </div>
                    </div>  
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotFundsInner.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
HotFundsInner.defaultProps = {};

class HotFunds extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            
                
                // <Chip id=" " type="static" title="境内掘金热门基金" groupName="首屏" content={content.content}>
                    <HotFundsInner />
                // </Chip>
            
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotFunds.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
HotFunds.defaultProps = {};
export { HotFunds };
export default HotFunds;
