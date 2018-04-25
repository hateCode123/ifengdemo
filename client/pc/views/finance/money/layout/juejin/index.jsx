import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../../utils/rel';

class Juejin extends React.PureComponent {
    /**
     * 渲染组件
     */

    render() {
        const { content } = this.props;

        return (
            <div class="juej">
                <div class="title_03" cmpp-type="s">
                    <div class="more">
                        <a href="https://etrade.fengfd.com/" target="_blank">
                            更多基金
                        </a>
                    </div>境内掘金
                </div>
                <div class="clearfix  pt20">
                    <div class="w240 fl" cmpp-type="s">
                        <ul id="yb01" class="labe_01 clearfix">
                            <li class="">热门权益类基金</li>
                            <li class="current">热门货币类基金</li>
                        </ul>
                        <div id="yb01-1" style="display: none;">
                            <div id="tab1" class="abo">
                                <table width="100%" border="0">
                                    <thead>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <th width="110" class="pl20">
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
                                            <td class="color_red  fl14">29.47%</td>
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
                                            <td class="color_red  fl14">10.24%</td>
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
                                            <td class="color_red  fl14">9.70%</td>
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
                                            <td class="color_red  fl14">9.68%</td>
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
                                            <td class="color_red  fl14">9.56%</td>
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
                                            <td class="color_red  fl14">8.72%</td>
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
                            <div id="tab2" class="abo">
                                <table width="100%" border="0">
                                    <thead>
                                        <tr style="background: rgb(255, 255, 255);">
                                            <th width="110" class="pl20">
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
                                            <td class="color_red  fl14">5.35%</td>
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
                                            <td class="color_red  fl14">5.10%</td>
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
                                            <td class="color_red  fl14">5.10%</td>
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
                                            <td class="color_red  fl14">4.85%</td>
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
                                            <td class="color_red  fl14">4.78%</td>
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
                                            <td class="color_red  fl14">4.78%</td>
                                            <td>
                                                <a href="https://etrade.fengfd.com/detail/004369/" target="_blank">
                                                    申购
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <style>#yb01-2 .abo table tr td.color_red{padding-left: 3px;}</style> */}
                        </div>
                    </div>
                    <div class="w300 fl bor" cmpp-type="s">
                        <div class="title_02">理财速递</div>
                        <div class="clearfix">
                            <div class="sdcp r_bag fl pr17">
                                <h3>
                                    <a href="https://etrade.fengfd.com/detail/180012" target="_blank">
                                        银华富裕主题混合
                                    </a>
                                </h3>
                                <p>
                                    近一年涨幅：<span>53.95%</span>
                                </p>
                                <div class="gm">
                                    <a href="https://etrade.fengfd.com/detail/180012" target="_blank">
                                        购买
                                    </a>
                                </div>
                            </div>
                            <div class="sdcp fl">
                                <h3>
                                    <a href="https://etrade.fengfd.com/detail/001878/" target="_blank">
                                        嘉实沪港深精选股票
                                    </a>
                                </h3>
                                <p>
                                    近一年涨幅：<span>47.46%</span>
                                </p>
                                <div class="gm">
                                    <a href="https://etrade.fengfd.com/detail/210004" target="_blank">
                                        购买
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="sdcp_02 t_bag">
                            <div class="clearfix">
                                <h3>
                                    <a href="https://etrade.fengfd.com/detail/217027/" target="_blank">
                                        招商央视财经50指数A
                                    </a>
                                    <span>47.84%</span>
                                </h3>
                            </div>
                            <div class="clearfix">
                                <p>
                                    <span>推荐理由：</span>中国“漂亮A50”崛起，长期价值投资的典范。<a
                                        href="https://etrade.fengfd.com/detail/217027/"
                                        target="_blank"
                                        class="gm02">
                                        购买
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Juejin.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Juejin.defaultProps = {};

export { Juejin };
export default Juejin;
