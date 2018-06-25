import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import CarouselPic from './carouselPic/';

class BannerPic extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

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
            num = 4;
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

        if (num === 4) {
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
            <div className={styles.bannerPic} onMouseEnter={this.bannerOver} onMouseLeave={this.bannerOver}>
                <CarouselPic content={content} currentPage={currentPage} />
                <div className={slideShow ? styles.prevSlide : ''} onClick={this.handleLeftClick}>
                    <a>
                        <div className={styles.left} />
                    </a>
                </div>
                <div className={slideShow ? styles.nextSlide : ''} onClick={this.handleRightClick}>
                    <a>
                        <div className={styles.right} />
                    </a>
                </div>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(BannerPic));
