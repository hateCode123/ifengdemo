import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';

/**
 * 定义 GoTop 组件
 */
class GoTop extends React.PureComponent {
    // 渲染之后
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
    }

    handleScroll = () => {
        const t = document.documentElement.scrollTop || document.body.scrollTop;
        const topView = document.getElementById('goTop');

        if (topView !== null) {
            topView.style.display = t >= 700 ? 'block' : 'none';
        }
    };

    // 返回顶部
    scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    /**
     * 渲染组件
     */
    render() {
        return <div id="goTop" className={styles.goTop} onClick={this.scrollToTop} />;
    }
}

/**
 * 定义组件属性类型
 * */
GoTop.propTypes = {};

/**
 * 定义组件默认属性
 * */
GoTop.defaultProps = {};

export { GoTop };
export default GoTop;
