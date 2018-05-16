import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import CarouselPic from './carouselPic/';

class FinanceVideo extends React.PureComponent {
    state = {
        currentPage: 0,
        slideShow: false,
    };

    /**
     * 鼠标移入移出，侧边切换按钮显示
     */
    bannerOver = () => {
        const { slideShow } = this.state;

        this.setState({ slideShow: !slideShow });
    };

    /**
     * 左切换按钮点击事件
     */
    handleLeftClick = () => {
        const { currentPage } = this.state;
        let num = currentPage;

        if (num === 0) {
            num = 2;
        } else {
            num--;
        }

        this.setState({ currentPage: num });
    };

    /**
     * 右切换点击事件
     */
    handleRightClick = () => {
        const { currentPage } = this.state;
        let num = currentPage;

        if (num === 2) {
            num = 0;
        } else {
            num++;
        }

        this.setState({ currentPage: num });
    };

    /**
     * 渲染组件
     */
    render() {
        const { currentPage, slideShow } = this.state;
        const { content } = this.props;

        return (
            <div className={styles.financeVideo} onMouseEnter={this.bannerOver} onMouseLeave={this.bannerOver}>
                <CarouselPic content={content} currentPage={currentPage} />
                <div className={slideShow ? styles.prevSlide : styles.hidden} onClick={this.handleLeftClick}>
                    <a>
                        <div className={styles.left} />
                    </a>
                    <div className={styles.btnBg} />
                </div>
                <div className={slideShow ? styles.nextSlide : styles.hidden} onClick={this.handleRightClick}>
                    <a>
                        <div className={styles.right} />
                    </a>
                    <div className={styles.btnBg} />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
FinanceVideo.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
FinanceVideo.defaultProps = {};

export { FinanceVideo };
export default FinanceVideo;
