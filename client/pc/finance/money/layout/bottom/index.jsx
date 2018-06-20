import React from 'react';
import PropTypes from 'prop-types';
import { rel } from '../../../../utils/rel';
import style from './style.css';
import '../../reset.css';

class Bottom extends React.PureComponent {
    render() {
        return (
            <div className={style.box_10}>
                <div className={style.box_10z}>
                    <div className={style.flog01}>
                        <img
                            src="http://p3.ifengimg.com/37780e23b9ea2d8b/2017/38/logoMoney.png"
                            width="161"
                            height="27"
                            alt="凤凰网财经"
                        />
                    </div>
                    <div className={style.wei}>
                        <img src="http://y3.ifengimg.com/a/2015_42/b32824459e3fdf7.jpg" width="102" height="102" />
                    </div>
                    <p>凤凰新媒体 财经频道</p>
                    <p>互动/投稿邮箱：all_cj@ifeng.com</p>
                    <p>凤凰财经官方微博</p>
                    <p>http://weibo.com/financeifeng/</p>
                </div>
                <div className={style.box_10z01}>
                    <h4>优势栏目与产品</h4>
                    <ul>
                        <li>
                            <a
                                href="http://finance.ifeng.com/news/special/summerdavos2017/"
                                rel={rel}
                                target="_blank"
                                title="2017夏季达沃斯">
                                2017夏季达沃斯
                            </a>
                        </li>

                        <li>
                            <a href="http://finance.ifeng.com/news/special/2017ljzlt/" rel={rel} target="_blank">
                                2017陆家嘴论坛
                            </a>
                        </li>

                        <li>
                            <a
                                href="http://finance.ifeng.com/news/special/2017boao/"
                                rel={rel}
                                target="_blank"
                                title="2017博鳌亚洲论坛">
                                2017博鳌亚洲论坛
                            </a>
                        </li>

                        <li>
                            <a
                                href="http://finance.ifeng.com/gold/special/2017davos/"
                                rel={rel}
                                target="_blank"
                                title="2017冬季达沃
斯">
                                2017冬季达沃斯
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://finance.ifeng.com/news/special/asianfinancialforum/"
                                rel={rel}
                                target="_blank">
                                第十届亚洲金融论坛
                            </a>
                        </li>

                        <li>
                            <a
                                href="http://finance.ifeng.com/news/special/summerdavos2016/"
                                rel={rel}
                                target="_blank"
                                title="2016夏季达沃斯">
                                2016夏季达沃斯
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://finance.ifeng.com/gold/special/2016ljzjrlt/"
                                rel={rel}
                                target="_blank"
                                title="2016陆家嘴论坛">
                                2016陆家嘴论坛
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://finance.ifeng.com/news/special/2015summit/"
                                rel={rel}
                                target="_blank"
                                title="2015凤凰财经峰会">
                                2015凤凰财经峰会
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={style.box_10z02}>
                    <h4>友情链接</h4>
                    <ul>
                        <li>
                            <a href="http://www.ifengweekly.com/" rel={rel} target="_blank" title="凤凰周刊">
                                凤凰周刊
                            </a>
                        </li>
                        <li>
                            <a href="http://www.caijing.com.cn/?ifeng" rel={rel} target="_blank" title="财经网">
                                财经网
                            </a>
                        </li>
                        <li>
                            <a href="http://www.gemag.com.cn/?ifeng" rel={rel} target="_blank" title="环球企业家">
                                环球企业家
                            </a>
                        </li>
                        <li>
                            <a href="http://www.yicai.com/" rel={rel} target="_blank" title="一财网 ">
                                一财网
                            </a>
                        </li>
                        <li>
                            <a href="http://caifu.baidu.com/?zt=18feng" rel={rel} target="_blank" title="百度财富">
                                百度财富
                            </a>
                        </li>
                        <li>
                            <a href="http://cn.reuters.com/?ifeng" rel={rel} target="_blank" title="路透">
                                路透
                            </a>
                        </li>
                        <li>
                            <a href="http://www.rmbtimes.com/" rel={rel} target="_blank" title="中金观察">
                                中金观察
                            </a>
                        </li>
                        <li>
                            <a href="http://www.p5w.net/?ifeng" rel={rel} target="_blank" title="全景网">
                                全景网
                            </a>
                        </li>
                        <li>
                            <a href="http://www.cb.com.cn/" rel={rel} target="_blank" title="中国经营网">
                                中国经营网
                            </a>
                        </li>
                        <li>
                            <a href="http://www.ljzfin.com/?ifeng" rel={rel} target="_blank" title="陆家嘴金融网">
                                陆家嘴金融网
                            </a>
                        </li>
                        <li>
                            <a href="http://www.nbd.com.cn/?ifeng" rel={rel} target="_blank" title="每日经济新闻">
                                每日经济新闻
                            </a>
                        </li>
                        <li>
                            <a href="https://www.leqian.com/?ifeng" rel={rel} target="_blank" title="乐钱">
                                乐钱
                            </a>
                        </li>
                        <li>
                            <a href="http://www.hbrchina.org/" rel={rel} target="_blank" title="哈佛商业评论">
                                哈佛商业评论
                            </a>
                        </li>
                        <li>
                            <a href="http://www.pbc.gov.cn/?ifeng" rel={rel} target="_blank" title="中国央行">
                                中国央行
                            </a>
                        </li>
                        <li>
                            <a href="http://www.hkma.gov.hk/chi/?ifeng" rel={rel} target="_blank" title="香港金管局">
                                香港金管局
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://www.csrc.gov.cn/pub/newsite/?ifeng"
                                rel={rel}
                                target="_blank"
                                title="中国证监会">
                                中国证监会
                            </a>
                        </li>
                        <li>
                            <a href="http://www.fengjr.com/?ifeng" rel={rel} target="_blank" title="凤凰金融">
                                凤凰金融
                            </a>
                        </li>
                        <li>
                            <a href="http://www.7tin.cn/?ifeng" rel={rel} target="_blank" title="青亭网">
                                青亭网
                            </a>
                        </li>
                        <li>
                            <a href="http://www.bwchinese.com/" rel={rel} target="_blank" title="BWC中文网">
                                BWC中文网
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Bottom.propTypes = {};

/**
 * 定义组件默认属性
 * */
Bottom.defaultProps = {};
export { Bottom };
export default Bottom;
