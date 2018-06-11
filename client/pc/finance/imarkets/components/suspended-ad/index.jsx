/**
 * 悬浮的广告
 */

import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { addEventListener } from '@ifeng/ui_base';
import styles from './index.css';
import Ad from '../../../../components/ad';

class SuspendedAd extends PureComponent{
    adBox = createRef();          // 悬浮窗口
    unlistenerHandleWindowScroll = null;  // 事件解绑
    top = null;                   // 记录当前DOM的位置
    state = {
        isFixed: false            // 是否悬浮
    };

    componentDidMount(){
        // 记录当前DOM的位置
        const current = this.adBox.current;
        this.top = current.offsetTop;
        // 绑定并初始化事件
        this.unlistenerHandleWindowScroll = addEventListener(window, 'scroll', this.handleWindowScroll);
        this.handleWindowScroll();
    }
    componentWillUnmount(){
        this.unlistenerHandleWindowScroll();
    }
    // 窗口滚动事件
    handleWindowScroll = (event)=>{
        const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const current = this.adBox.current; 
        const isFixed = scroll + 40 >= this.top;
        if(isFixed !== this.state.isFixed){
            this.setState({
                isFixed
            });
        }
    };
    render(){
        return (
            <div className={ styles.ad_box } ref={ this.adBox } style={ this.state.isFixed ? { position: 'fixed' } : null }>
                <Ad styleName={ styles.ad } />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SuspendedAd.propTypes = {};

/**
 * 定义组件默认属性
 * */
SuspendedAd.defaultProps = {};

export { SuspendedAd };
export default SuspendedAd;