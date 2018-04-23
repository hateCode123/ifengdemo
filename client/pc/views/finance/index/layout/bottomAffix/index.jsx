import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 BottomAffix 组件
 */
class BottomAffix extends React.PureComponent {
    state = {
        isShow: false,
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.tabsTop = document.getElementById('tabs').offsetTop;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * 滚动条滚动
     */
    handleScroll = () => {
        const tabsTop = this.tabsTop;

        // 兼容各主流浏览器
        const currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if (currentTop > tabsTop) {
            this.setState({ isFixed: true });
        } else {
            this.setState({ isFixed: false });
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const bottomAffix = (
            <div className={styles.box}>
                <div className={styles.fdockbar} />
            </div>
        );

        return ReactDOM.createPortal(bottomAffix, document.getElementById('root'));
    }
}

/**
 * 定义组件属性类型
 * */
BottomAffix.propTypes = {};

/**
 * 定义组件默认属性
 * */
BottomAffix.defaultProps = {};

export { BottomAffix };
export default BottomAffix;
