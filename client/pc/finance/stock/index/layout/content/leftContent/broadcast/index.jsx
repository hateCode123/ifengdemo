import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Slides from '@ifeng/ui_pc_slides';
import { rel } from '../../../../../../../utils/rel';

class Broadcast extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    sliderTmpl = item => {
        return (
            <div className={styles.item}>
                <span className={styles.title}>最新播报</span>
                <a href={item.commentUrl} target="_blank" rel={rel} title={item.title}>
                    {item.title}
                </a>
            </div>
        );
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
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
                <Slides content={content.list} config={config} />
            </div>
        );
    }
}

export default Broadcast;
