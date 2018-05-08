import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Slides from '@ifeng/ui_pc_slides';
import { rel } from '../../../../../../../utils/rel';

class Broadcast extends React.PureComponent {
    state = {
        list: [
            {
                title: '马云46.8亿入股万达 让王健林暂时松了一口气',
                url: '//finance.ifeng.com/a/20180206/15972127_0.shtml',
            },
            {
                title: '亚太股市全线暴跌：沪深创大幅下挫跌逾2% 恒指跌近5%',
                url: '//finance.ifeng.com/a/20180206/15972125_0.shtml',
            },
            {
                title: '美股大跌验证我们黑天鹅判断 现在A股应该买什么？',
                url: '//finance.ifeng.com/a/20180206/15972106_0.shtml',
            },
            {
                title: '超50亿港元资金南下抄底港股 北上资金净流出超63亿',
                url: '//finance.ifeng.com/a/20180206/15972092_0.shtml',
            },
        ],
    };

    sliderTmpl = item => {
        return (
            <div className={styles.item}>
                <span className={styles.title}>最新播报</span>
                <a href={item.url} target="_blank" rel={rel} title={item.title}>
                    {item.title}
                </a>
            </div>
        );
    };

    /**
     * 渲染组件
     */
    render() {
        const { list } = this.state;
        const config = {
            arrows: false,
            dots: false,
            autoplay: true,
            direction: 'forward',
            pauseOnHover: true,
            autoplayInterval: 3000,
            axis: 'vertical',
            className: 'mySliders',
            effect: 'slide',
            initialSlide: 0,
            speed: 300,
            infinite: true,
            sliderTmpl: this.sliderTmpl,
        };

        return (
            <div className={styles.broadcast}>
                <Slides content={list} config={config} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Broadcast.propTypes = {};

/**
 * 定义组件默认属性
 * */
Broadcast.defaultProps = {};

export { Broadcast };
export default Broadcast;
