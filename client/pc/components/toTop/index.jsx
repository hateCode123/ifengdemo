/**
 * 返回顶部
 */

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { addEventListener } from '@ifeng/ui_base';
import styles from './index.css';

class ToTop extends PureComponent {
    unlistenerHandleWindowScroll = null; // 事件解绑
    top = null; // 当前滚动条位置
    timer = null; // 返回顶部定时器
    speed = null; // 返回顶部速度
    state = {
        isDisplay: false, // 判断返回顶部的按钮是否显示
        opacity: styles.opacity_0, // 初始化按钮是否显示隐藏
    };

    componentDidMount() {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (scroll >= 60) {
            this.setState({
                opacity: styles.opacity_1,
                isDisplay: true,
            });
        }
        this.unlistenerHandleWindowScroll = addEventListener(window, 'scroll', this.handleWindowScroll);
    }
    componentWillUnmount() {
        this.unlistenerHandleWindowScroll();
    }
    // 判断返回顶部按钮的显示隐藏
    handleWindowScroll = event => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const isDisplay = scroll >= 60;

        if (isDisplay !== this.state.isDisplay) {
            this.setState({
                opacity: isDisplay ? styles.opacity_0_to_1 : styles.opacity_1_to_0,
                isDisplay,
            });
        }
    };
    // 返回顶部动画
    animateGoToTop = () => {
        this.top = this.top - this.speed;
        if (this.top <= 0) {
            window.scroll(0, 0);
        } else {
            window.scroll(0, this.top);
            this.timer = setTimeout(this.animateGoToTop, 3);
        }
    };
    // 点击返回顶部，0.3s内返回到顶部
    handleGoToTopClick = event => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        this.speed = scroll / 80;
        this.top = scroll;
        this.timer = setTimeout(this.animateGoToTop, 3);
    };
    // 创建返回顶部
    goToTopView() {
        return ReactDOM.createPortal(
            <input
                className={`${styles.go_to_top} ${this.state.opacity}`}
                type="button"
                title="返回顶部"
                onClick={this.handleGoToTopClick}
            />,
            document.body,
        );
    }
    render() {
        return typeof document === 'object' ? this.goToTopView() : null;
    }
}

export { ToTop };
export default ToTop;
