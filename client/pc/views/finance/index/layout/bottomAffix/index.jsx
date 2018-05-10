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
        quoteShow: false,
        fundsShow: false,
        quote: '',
        funds: '',
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

    handleQuoteShow = () => {
        const { quoteShow } = this.state;

        this.setState({ quoteShow: !quoteShow });
    };

    handleFundsShow = () => {
        const { fundsShow } = this.state;

        this.setState({ fundsShow: !fundsShow });
    };

    handleMouseOver = flag => {
        if (flag === 0) {
            this.setState({ quoteShow: false });
        } else if (flag === 1) {
            this.setState({ fundsShow: false });
        }
    };

    handleQuoteChange = e => {
        this.setState({ quote: e.target.value });
    };

    handleFundsChange = e => {
        this.setState({ funds: e.target.value });
    };

    handleSearch = flag => {
        if (flag === 0) {
            const quote = this.state.quote;

            window.open(`http://app.finance.ifeng.com/hq/search.php?type=stock&q=${quote}`);
        } else if (flag === 1) {
            const funds = this.state.funds;

            window.open(`http://app.finance.ifeng.com/hq/search.php?type=stock&search_type=zijin&q==${funds}`);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { isShow, quoteShow, fundsShow } = this.state;

        const bottomAffix = (
            <div className={styles.affix_box}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <a href="javascript:void(0);" onClick={this.handleQuoteShow}>
                                    <div className={styles.quote} />
                                    <p>查行情</p>
                                </a>
                                <div
                                    className={`${styles.caption} ${quoteShow ? styles.show : styles.hide}`}
                                    onMouseLeave={() => this.handleMouseOver(0)}>
                                    <div className={styles.search}>
                                        <input
                                            className="quote"
                                            placeholder="代码/拼音/名称"
                                            onChange={this.handleQuoteChange}
                                        />
                                        <a onClick={() => this.handleSearch(0)}>搜索</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="javascript:void(0);" onClick={this.handleFundsShow}>
                                    <div className={styles.funds} />
                                    <p>查资金</p>
                                </a>
                                <div
                                    className={`${styles.caption} ${fundsShow ? styles.show : styles.hide}`}
                                    onMouseLeave={() => this.handleMouseOver(1)}>
                                    <div className={styles.search}>
                                        <input
                                            className="funds"
                                            placeholder="代码/拼音/名称"
                                            onChange={this.handleFundsChange}
                                        />
                                        <a onClick={() => this.handleSearch(1)}>搜索</a>
                                    </div>
                                </div>
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
