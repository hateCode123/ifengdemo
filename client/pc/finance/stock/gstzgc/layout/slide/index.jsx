import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Slides from '@ifeng/ui_pc_slides';
import styles from './index.css';
import PropTypes from 'prop-types';

class Slide extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const config = {
            arrows: false,
            dots: true,
            dotsAction: 'hover',
            autoplay: true,
            direction: 'forward',
            pauseOnHover: true,
            autoplayInterval: 3000,
            axis: 'horizonta',
            className: 'mySliders',
            effect: 'slide',
            initialSlide: 0,
            speed: 300,
        };

        return (
            <div className={styles.slide}>
                <Slides content={content} config={config} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Slide.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Slide.defaultProps = {};

export { Slide };
export default Slide;
