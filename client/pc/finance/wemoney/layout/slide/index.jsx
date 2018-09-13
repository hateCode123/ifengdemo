import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Slides from '@ifeng/ui_pc_slides';
import styles from './index.css';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

class SimpleSlider extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const config = {
            arrows: false,
            dotStyle: styles.dot,
            dotCurrentStyle: styles.current,
        };

        return (
            <div className={styles.box}>
                <Slides content={content} config={config} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SimpleSlider.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
SimpleSlider.defaultProps = {};

export default errorBoundary(SimpleSlider);
