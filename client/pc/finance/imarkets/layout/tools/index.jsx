/**
 * 日历、直播nav和搜索
 */

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';
import Calendar from './calender';
import Search from './Search';

class Tools extends PureComponent{
    render(){
        return (
            <div className={ styles.tools_box }>
                <div className={ styles.tools_main }>
                    {/* 财经日历 */}
                    <Calendar />
                    {/* 全球直播 */}
                    <a className={ styles.zhibo_link } href="http://finance.ifeng.com/gold/zhibo/" target="_blank">
                        <i className={ styles.earth } />
                        <span className={ styles.link_title }>全球直播</span>
                        <i className={ styles.play } />
                    </a>
                    {/* 凤凰汇客厅 */}
                    <a className={ styles.zhibo_link } href="http://finance.ifeng.com/biz/special/fhhkt/" target="_blank">
                        <img className={ styles.fhhkt } src={ require('./feng-huang-hui-ke-ting.png') } />
                        <i className={ styles.play } />
                    </a>
                    {/* 行情中心 */}
                    <a className={ styles.zhibo_link } href="http://finance.ifeng.com/gold/zhibo/" target="_blank">
                        <i className={ styles.chart } />
                        <span className={ styles.link_title }>行情中心</span>
                        <i className={ styles.play } />
                    </a>
                    {/* 跳转搜索 */}
                    <Search />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Tools.propTypes = {};

/**
 * 定义组件默认属性
 * */
Tools.defaultProps = {};

export { Tools };
export default Tools;