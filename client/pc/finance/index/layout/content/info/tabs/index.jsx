import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Tabs extends React.PureComponent {
    state = {
        isFixed: false,
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
        const { isFixed } = this.state;
        const { content, current, handleTabsChange } = this.props;

        return (
            <ul id="tabs" className={`${styles.tabs} ${isFixed ? styles.fix : ''}`}>
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={index === current ? styles.current : ''}
                        onClick={() => handleTabsChange(index, this.tabsTop)}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Tabs.propTypes = {
    content: PropTypes.array,
    current: PropTypes.number,
    handleTabsChange: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
Tabs.defaultProps = {};

export { Tabs };
export default Tabs;
