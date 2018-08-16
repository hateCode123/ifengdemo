/**
 * 悬浮的广告
 */

import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { addEventListener } from '@ifeng/ui_base';
import Ad from '../../../../components/ad';
import styles from './index.css';

class SuspendedAd extends PureComponent {
    adBox = createRef(); // 悬浮窗口
    unlistenerHandleWindowScroll = null; // 事件解绑
    state = {
        isFixed: false, // 是否悬浮
    };

    componentDidMount() {
        // 记录当前DOM的位置
        const current = this.adBox.current;

        // 绑定并初始化事件
        this.unlistenerHandleWindowScroll = addEventListener(window, 'scroll', this.handleWindowScroll);
        this.handleWindowScroll();
    }
    componentWillUnmount() {
        this.unlistenerHandleWindowScroll();
    }
    // 窗口滚动事件
    handleWindowScroll = event => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const current = this.adBox.current;
        const isFixed = scroll + 40 >= current.offsetTop;

        if (isFixed !== this.state.isFixed) {
            this.setState({
                isFixed,
            });
        }
    };
    render() {
        return (
            <div className={styles.ad_box} ref={this.adBox}>
                <div className={styles.ad_fixed} style={this.state.isFixed ? { position: 'fixed' } : null}>
                    <Ad styleName={styles.ad} />
                </div>
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
