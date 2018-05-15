import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Slides from '@ifeng/ui_pc_slides';
import styles from './index.css';
import PropTypes from 'prop-types';
import { rel } from '../../../../../utils/rel';

class SimpleSlider extends React.PureComponent {
    changeCallback = function changeCallback(index, total) {
        console.log(index, total);
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const config = {
            arrows: false,
            dots: true,
            afterChange: this.changeCallback,
            beiginChange: this.changeCallback,
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
SimpleSlider.propTypes = {};

/**
 * 定义组件默认属性
 * */
SimpleSlider.defaultProps = { content: PropTypes.array };

export { SimpleSlider };
export default SimpleSlider;
