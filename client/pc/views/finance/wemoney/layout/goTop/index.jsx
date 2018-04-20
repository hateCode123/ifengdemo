import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
/**
 * 定义 GoTop 组件
 */
class GoTop extends React.PureComponent {
    /**
     * 渲染组件
     */
    
    // 渲染之后
    componentDidMount() {
        window.onscroll = function () {
            // 变量t就是滚动条滚动时，到顶部的距离
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            const top_view = document.getElementById('goTop');
            if (top_view !== null) {
                top_view.style.display = t >= 700 ? 'block' : 'none';
            }
        };
    }


    // 返回顶部
    scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    render() {

        return (
            <div id="goTop" className={styles.goTop} onClick={this.scrollToTop}>

            </div>

        )
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
