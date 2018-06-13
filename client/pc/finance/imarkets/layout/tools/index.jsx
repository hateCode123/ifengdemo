/**
 * 日历、直播nav和搜索
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Calendar from './calender';
import Search from './Search';

class Tools extends PureComponent{
    state = {
        isActive: null  // 行情中心是否显示
    };

    // 显示行情中心
    handleDisplayHangqingzhongxinClick = (event) => this.setState({ isActive: !this.state.isActive });
    render(){
        return (
            <Fragment>
                <div className={ styles.tools_box }>
                    <div className={ styles.tools_main }>
                        {/* 财经日历 */}
                        <Calendar />
                        {/* 全球直播 */}
                        <a className={ `${ styles.ml14 } ${ styles.zhibo_link }` } href="http://finance.ifeng.com/gold/zhibo/" target="_blank">
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
                        <a className={ styles.zhibo_link + (this.state.isActive ? ` ${ styles.is_active }` : '')  } onClick={ this.handleDisplayHangqingzhongxinClick }>
                            <i className={ styles.chart } />
                            <span className={ styles.link_title }>行情中心</span>
                            <i className={ styles.play } />
                        </a>
                        {/* 跳转搜索 */}
                        <Search />
                    </div>
                </div>
                {
                    this.state.isActive !== null ? (
                        <iframe className={ styles.hangqingzhongxin } style={{ display: this.state.isActive ? 'block' : 'none' }} src="http://fx.caiku.com/coop/ifeng/pair_new" />
                    ) : null
                }
            </Fragment>
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