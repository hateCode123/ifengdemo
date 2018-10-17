import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { addEventListener } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';

class Tabs extends React.PureComponent {
    static propTypes = {
        children: PropTypes.any,
    };

    state = {
        current: 0,
        isFixed: false,
    };

    componentDidMount() {
        this.unHandleScroll = addEventListener(window, 'scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.unHandleScroll();
    }

    // 兼容 ie7 的 offsetTop 获取方法
    getOffsetTop = dom => {
        let offsetTop = dom.offsetTop;

        if (dom.offsetParent) {
            offsetTop += this.getOffsetTop(dom.offsetParent);
        }

        return offsetTop;
    };

    /**
     * 滚动条滚动
     */
    handleScroll = () => {
        const offsetTop = this.getOffsetTop(document.getElementById('tabs'));

        this.tabsTop = document.getElementById('tabs').offsetTop || offsetTop;

        // 兼容各主流浏览器
        const currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if (currentTop > this.tabsTop) {
            this.setState({ isFixed: true });
        } else {
            this.setState({ isFixed: false });
        }
    };

    handleClick = e => {
        scrollTo(0, this.tabsTop);

        const index = Number(e.currentTarget.getAttribute('index'));

        if (index !== this.state.current) {
            this.setState({
                current: index,
            });
        }
    };

    renderTabHead = () => {
        const { isFixed, current } = this.state;

        return (
            <div className={`${styles.tabHead} ${isFixed ? styles.fix : ''}`}>
                {React.Children.map(this.props.children, (item, index) => {
                    return (
                        <div
                            className={`${styles.tabHeadItem} ${index === current ? styles.current : ''}`}
                            key={index}
                            index={index}
                            onClick={this.handleClick}>
                            {item.props.tab}
                        </div>
                    );
                })}
            </div>
        );
    };

    renderBody() {
        return (
            <div className={styles.tabBody}>
                {React.Children.map(this.props.children, (item, index) =>
                    React.cloneElement(item, { active: this.state.current === index }),
                )}
            </div>
        );
    }

    /**
     * 渲染组件
     */
    render() {
        return (
            <div id="tabs">
                {this.renderTabHead()}
                {this.renderBody()}
            </div>
        );
    }
}

export default errorBoundary(Tabs);
