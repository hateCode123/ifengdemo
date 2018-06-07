import React from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import Chip from 'Chip';
import Slides from '@ifeng/ui_pc_slides';
import { rel } from '../../../../utils/rel';

class SliderInner extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        console.log('content', content);
        const sliderTmpl = function sliderTmpl(item) {
            return (
                <div className={style.bigPic04}>
                    <a href={item.url} target="_blank" rel={rel}>
                        <img src={item.src} width="400" height="180" alt={item.alt} className={style.trans} />
                    </a>
                    <div className={style.text} />
                    <p className={style.cWhite}>
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.title}
                        </a>
                    </p>
                </div>
            );
        };

        const config = {
            arrows: true,
            dots: true,
            axis: 'horizonta',
            sliderTmpl,
        };

        const dom = (
            <div className={style.fpic06}>
                <Slides content={content} config={config} />
            </div>
        );

        // return [BottomAd, footer];
        return dom;
    }
}

SliderInner.propTypes = { content: PropTypes.array };

SliderInner.defaultProps = {};

class Slider extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <Chip id="10130" type="static" title="幻灯" groupName="幻灯" content={content}>
                <SliderInner />
            </Chip>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Slider.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Slider.defaultProps = {};

export { Slider };
export default Slider;
