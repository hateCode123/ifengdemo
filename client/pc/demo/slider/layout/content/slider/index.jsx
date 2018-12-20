import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class SliderControl extends React.PureComponent {
    static propTypes = {
        // defaultActiveIndex: PropTypes.number,
        interval: PropTypes.number,
        direction: PropTypes.string,
        number: PropTypes.number,
        imgWidth: PropTypes.number.isRequired,
        imgHeight: PropTypes.number.isRequired,
        children: PropTypes.array,
        dotsAction: PropTypes.string,
        arrow: PropTypes.bool,
    };

    static defaultProps = {
        direction: 'right',
        interval: 1000,
        boxStyle: 'content',
        dotsAction: 'click',
        dotsStyle: styles.dots,
        dotsActiveStyle: styles.active,
        arrow: true,
    };

    state = {
        activeIndex: 1,
        offsetDistance:
            this.props.direction === 'right' || this.props.direction === 'left'
                ? -this.props.imgWidth
                : -this.props.imgHeight,
        pause: false,
        flag: true,
    };

    // 生命周期函数 在首次渲染之前
    UNSAFE_componentWillMount() {
        this.direction = this.props.direction === 'left' || this.props.direction === 'right' ? 'x' : 'y';
    }
    componentDidMount() {
        this.autoPlay();
    }

    componentWillUnmount() {
        clearTimeout(this.timeOuter);
        clearInterval(this.timer);
    }

    autoPlay() {
        switch (this.props.direction) {
            case 'right':
                this.timerOuter = setTimeout(this.playRight.bind(this), this.props.interval);
                this.direction = 'x';
                break;
            case 'left':
                this.timerOuter = setTimeout(this.playLeft.bind(this), this.props.interval);
                this.direction = 'x';
                break;
            case 'top':
                this.timerOuter = setTimeout(this.playLeft.bind(this), this.props.interval);
                this.direction = 'y';
                break;
            case 'bottom':
                this.timerOuter = setTimeout(this.playRight.bind(this), this.props.interval);
                this.direction = 'y';
                break;
        }
    }

    // 对不同方向做的相应模板上样式的处理
    directionHandle() {
        if (this.direction === 'y') {
            return {
                top: `${this.state.offsetDistance}px`,
                width: this.props.imgWidth,
                height: this.props.imgHeight * (this.props.number + 2),
            };
        } else {
            return {
                left: `${this.state.offsetDistance}px`,
                width: this.props.imgWidth * (this.props.number + 2),
                height: this.props.imgHeight,
            };
        }
    }
    // 鼠标滑入，滑出
    mouseHandle(e) {
        if (e.type === 'mouseover') {
            this.setState({ pause: true });
        } else if (e.type === 'mouseleave') {
            this.setState({ pause: false });
            this.autoPlay();
        }
    }
    // 圆点显示效果
    checkDots(index) {
        let activeIndex = '';

        if (this.state.activeIndex === this.props.number + 1) {
            activeIndex = 1;
        } else if (this.state.activeIndex === 0) {
            activeIndex = this.props.number;
        } else {
            activeIndex = this.state.activeIndex;
        }

        return index + 1 === activeIndex ? `${styles.dots} ${styles.dots_active}` : `${styles.dots}`;
    }
    // 圆点自定义属性
    checkDotsAttr(index) {
        let activeIndex = '';

        if (this.state.activeIndex === this.props.number + 1) {
            activeIndex = 1;
        } else if (this.state.activeIndex === 0) {
            activeIndex = this.props.number;
        } else {
            activeIndex = this.state.activeIndex;
        }

        return index + 1 === activeIndex ? 'true' : 'false';
    }
    // 鼠标控制圆点
    dotsStep(index) {
        clearInterval(this.timer);
        this.setState({ activeIndex: index + 1 });
        this.position();
    }
    // 空函数
    emptyFun() {}

    // 向右或向下
    playRight(indexIn) {
        if (this.state.flag) {
            const index = indexIn ? indexIn : this.state.activeIndex + 1;

            this.setState({ activeIndex: index });
            this.position();
        }
    }
    // 向左或向上
    playLeft(indexIn) {
        if (this.state.flag) {
            const index = indexIn ? indexIn : this.state.activeIndex - 1;

            this.setState({ activeIndex: index });
            this.position();
        }
    }
    // 运动效果
    position() {
        this.setState({ flag: false });
        this.timer = setInterval(() => {
            let boxDistance = '';

            if (this.direction === 'x') {
                boxDistance = this.props.imgWidth;
            } else {
                boxDistance = this.props.imgHeight;
            }
            let offsetDistance = this.state.offsetDistance;

            if (Math.abs(offsetDistance - -boxDistance * this.state.activeIndex) <= 0.09) {
                offsetDistance = -boxDistance * this.state.activeIndex;
                clearInterval(this.timer);
                this.setState({ flag: true });
                if (this.state.activeIndex > this.props.number) {
                    offsetDistance = -boxDistance;
                    this.setState({ activeIndex: 1 });
                } else if (this.state.activeIndex === 0) {
                    offsetDistance = -boxDistance * this.props.number;
                    this.setState({ activeIndex: this.props.number });
                }
                this.setState({ offsetDistance });
                if (!this.state.pause) {
                    this.autoPlay();
                }
            } else {
                let temp = offsetDistance - (boxDistance * this.state.activeIndex - Math.abs(offsetDistance)) / 30;

                offsetDistance = temp;

                this.setState({ offsetDistance });
            }
        }, 10);
    }
    // 点击向左按钮
    left() {
        const oldIndex = this.state.activeIndex;

        this.playLeft(oldIndex - 1);
    }
    // 点击向右按钮
    right() {
        const oldIndex = this.state.activeIndex;

        this.playRight(oldIndex + 1);
    }

    render() {
        const { dotsAction } = this.props;

        // 用户可选圆点触发事件
        const clickFun = dotsAction === 'click' ? this.dotsStep : this.emptyFun;
        const hoverFun = dotsAction === 'hover' ? this.dotsStep : this.emptyFun;

        return (
            <React.Fragment>
                <div
                    className={styles.default_styles}
                    style={{ width: this.props.imgWidth, height: this.props.imgHeight }}
                    onMouseOver={this.mouseHandle.bind(this)}
                    onMouseLeave={this.mouseHandle.bind(this)}>
                    {this.props.arrow ? (
                        <React.Fragment>
                            <span className={styles.leftIcon} data-arrow-left onClick={this.left.bind(this)} />
                            <span className={styles.rightIcon} data-arrow-right onClick={this.right.bind(this)} />{' '}
                        </React.Fragment>
                    ) : null}

                    <div className={`${styles.dots_wrap} ${styles.clearfix}`} data-dots-wrap>
                        {React.Children.map(this.props.children, (elem, index) => {
                            return (
                                <span
                                    data-dots-active={this.checkDotsAttr(index)}
                                    className={this.checkDots(index)}
                                    onClick={clickFun.bind(this, index)}
                                    onMouseOver={hoverFun.bind(this, index)}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.container}>
                        <ul className={styles.ul} style={this.directionHandle()}>
                            {this.props.children[this.props.number - 1]}
                            {this.props.children}
                            {this.props.children[0]}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

class Slider extends React.PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                <SliderControl
                    interval={this.props.config.interval}
                    number={this.props.config.number}
                    boxStyle={this.props.config.boxStyle}
                    imgWidth={this.props.config.imgWidth}
                    imgHeight={this.props.config.imgHeight}
                    direction={this.props.config.direction}
                    dotsAction={this.props.config.dotsAction}
                    arrow={this.props.config.arrow}>
                    {this.props.data.map((item, index) => {
                        return (
                            <li className={styles.li} key={index}>
                                <a href={item.linkUrl}>
                                    <img
                                        className={styles.img}
                                        width={this.props.config.imgWidth}
                                        height={this.props.config.imgHeight}
                                        src={item.imgUrl}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </SliderControl>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Slider);
