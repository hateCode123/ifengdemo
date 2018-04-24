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
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * 滚动条滚动
     */
    handleScroll = () => {
        // 兼容各主流浏览器
        const currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if (currentTop > 100) {
            this.setState({ isShow: true });
        } else {
            this.setState({ isShow: false });
        }
    };

    /**
     * 回到顶部
     */
    backToTop = () => {
        scrollTo(0, 0);
    };

    /**
     * 渲染组件
     */
    render() {
        const { isShow } = this.state;

        const bottomAffix = (
            <div className={styles.affix_box}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <a href="javascript:void(0);">
                                    <div className={styles.quote} />
                                    <p>查行情</p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="javascript:void(0);">
                                    <div className={styles.funds} />
                                    <p>查资金</p>
                                </a>
                            </td>
                        </tr>
                        {isShow ? (
                            <tr>
                                <td>
                                    <a href="#" onClick={this.backToTop}>
                                        <div className={styles.back} />
                                    </a>
                                </td>
                            </tr>
                        ) : (
                            <tr />
                        )}
                    </tbody>
                </table>
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
