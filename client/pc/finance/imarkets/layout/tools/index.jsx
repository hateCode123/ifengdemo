/**
 * 日历、全球直播和搜索
 */

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';
import Search from './Search';

class Tools extends PureComponent{
    render(){
        return (
            <div className={ styles.tools_box }>
                <div className={ styles.tools_main }>
                    {/* 财经日历 */}
                    <div className={ styles.calendar }>7</div>
                    {/* 全球直播 */}
                    <a className={ styles.zhibo_link } href="http://finance.ifeng.com/gold/zhibo/" target="_blank">
                        <i className={ styles.earth } />
                        <span className={ styles.link_title }>全球直播</span>
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