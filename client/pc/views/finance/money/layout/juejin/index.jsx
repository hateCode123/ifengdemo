import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';
import CommonTitleL from '../commonTitleL/';
import Licaisudi from '../licaisudi/';

class Juejin extends React.PureComponent {
    /**
     * 渲染组件
     */

    render() {
        const { content } = this.props;

        return (
            <div className="juej">
                <Chip
                    id="10039"
                    type="static"
                    title="境内掘金title"
                    groupName="首屏"
                    content={content.jingneijuejinTitle}>
                    <CommonTitleL />
                </Chip>
                {/* <div className="title_03" cmpp-type="s">
                    <div className="more">
                        <a href="https://etrade.fengfd.com/" target="_blank">
                            更多基金
                        </a>
                    </div>境内掘金
                </div> */}
                <div className="clearfix  pt20">
                    {/* <div className="w240 fl" cmpp-type="s">
                        <ul id="yb01" className="labe_01 clearfix">
                            <li className="">热门权益类基金</li>
                            <li className="current">热门货币类基金</li>
                        </ul>
                        <div id="yb01-1" style="display: none;">
                            <div id="tab1" className="abo">
                                <table width="100%" border="0">
                                    <thead>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <th width="110" className="pl20">
                                                简称
                                            </th>
                                            <th width="100">近一个月收益</th>
                                            <th width="50">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background: rgb(250, 250, 250);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/001647/"
                                                    target="_blank"
                                                    title="001647">
                                                    天弘聚利灵活配置
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">29.47%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/001647/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/001614/"
                                                    target="_blank"
                                                    title="001614">
                                                    东方区域发展混合
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">10.24%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/001614/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(250, 250, 250);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/002860/"
                                                    target="_blank"
                                                    title="002860">
                                                    前海开源沪港深新
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">9.70%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/002860/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/003175/"
                                                    target="_blank"
                                                    title="003175">
                                                    华泰柏瑞多策略灵
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">9.68%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/003175/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(250, 250, 250);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/003954/"
                                                    target="_blank"
                                                    title="003954">
                                                    华泰柏瑞价值精选
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">9.56%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/003954/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/080005/"
                                                    target="_blank"
                                                    title="080005">
                                                    长盛量化红利混合
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">8.72%</td>
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

                        <div id="yb01-2" style="display: block;">
                            <div id="tab2" className="abo">
                                <table width="100%" border="0">
                                    <thead>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <th width="110" className="pl20">
                                                简称
                                            </th>
                                            <th width="100">7日年化</th>
                                            <th width="50">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background: rgb(250, 250, 250);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/001233/"
                                                    target="_blank"
                                                    title="001233">
                                                    嘉合货币B
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">5.35%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/001233/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/001232/"
                                                    target="_blank"
                                                    title="001232">
                                                    嘉合货币A
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">5.10%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/001232/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(250, 250, 250);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/004904/"
                                                    target="_blank"
                                                    title="004904">
                                                    人保货币B
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">5.10%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004904/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/004903/"
                                                    target="_blank"
                                                    title="004903">
                                                    人保货币A
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">4.85%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004903/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(250, 250, 250);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/000605/"
                                                    target="_blank"
                                                    title="000605">
                                                    银华多利宝货币B
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">4.78%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/000605/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <td>
                                                <a
                                                    href="https://etrade.fengfd.com/detail/004369/"
                                                    target="_blank"
                                                    title="004369">
                                                    前海开源聚财宝B
                                                </a>
                                            </td>
                                            <td className="color_red  fl14">4.78%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004369/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            //  <style>#yb01-2 .abo table tr td.color_red{padding-left: 3px;}</style>  
                        </div>
                    </div> */}

                    <Licaisudi content={{ title: content.sudiTitle01, content: content.sudiContent01 }} />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Juejin.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Juejin.defaultProps = {};

export { Juejin };
export default Juejin;
