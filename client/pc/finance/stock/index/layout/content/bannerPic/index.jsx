import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import CarouselPic from './carouselPic/';

class BannerPic extends React.PureComponent {
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
            num = 3;
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

        if (num === 3) {
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
            <div>
                <div className={styles.bannerPic} onMouseEnter={this.bannerOver} onMouseLeave={this.bannerOver}>
                    <CarouselPic content={content} currentPage={currentPage} />
                    <div className={slideShow ? styles.prevSlide : ''} onClick={this.handleLeftClick}>
                        <a>
                            <div className={styles.left} />
                        </a>
                        <div className={styles.btn} />
                    </div>
                    <div className={slideShow ? styles.nextSlide : ''} onClick={this.handleRightClick}>
                        <a>
                            <div className={styles.right} />
                        </a>
                        <div className={styles.btn} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
BannerPic.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
BannerPic.defaultProps = {};

export { BannerPic };
export default BannerPic;
