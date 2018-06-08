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
    unHandleWindowScroll = null;  // 事件解绑
    state = {
        isFixed: false            // 是否悬浮
    };

    componentDidMount(){
        this.unHandleWindowScroll = addEventListener(window, 'scroll', this.handleWindowScroll);
        const current = this.adBox.current;
        this.handleWindowScroll();
    }
    // 窗口滚动事件
    handleWindowScroll = (event)=>{
        const current = this.adBox.current;
        const rect = current.getBoundingClientRect();
        const gt40 = rect.top < 40; 
        if(gt40 && gt40 !== this.state.isFixed){
            this.setState({
                isFixed: gt40
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