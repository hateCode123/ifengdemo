import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

import style from './index.css';
import Slides from '@ifeng/ui_pc_slides';
import { rel } from '../../../../utils/rel';
import { formatImage } from '@ifeng/public_method';

class SliderInner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    /**
     * 渲染组件
     */
    getData = data => {
        try {
            const __data = data.filter((item, i) => i < 5);

            const res = __data.map(item => {
                const thu = item.thumbnails;
                const count = parseInt(item.thumbnailsCount, 10);
                const img = count !== 0 ? thu.image : [];
                const src = img && img.length > 0 ? img[0].url : '';

                item.src = formatImage(src, 400, 180);

                return item;
            });

            return res;
        } catch (e) {
            console.error(e);
        }
    };
    render() {
        const { content } = this.props;

        const sliderTmpl = function sliderTmpl(item) {
            return (
                <div className={style.bigPic04}>
                    <a href={item.url} target="_blank" rel={rel}>
                        <img src={item.src} width="400" height="180" alt={item.title} className={style.trans} />
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
            // dotStyle: style.dot,
            dotCurrentStyle: style.dotCurrent,
            autoplayInterval: 10000,
        };
        const __data = this.getData(content);
        const dom = (
            <div className={style.fpic06}>
                <Slides content={__data} config={config} />
            </div>
        );

        return __data.length > 0 ? dom : '';
    }
}

class Slider extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    render() {
        const { content } = this.props;

        return (
            // <Chip id="10130" type="static" title="幻灯" groupName="幻灯" >
            <SliderInner content={content} />
            // </Chip>
        );
    }
}

export default errorBoundary(Slider);
