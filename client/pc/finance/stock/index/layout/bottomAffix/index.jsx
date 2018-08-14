import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import { addEventListener } from '@ifeng/ui_base';

/**
 * 定义 BottomAffix 组件
 */
class BottomAffix extends React.PureComponent {
    state = {
        text: '代码/拼音/名称',
        isShow: false,
        quoteShow: false,
        fundsShow: false,
    };

    componentDidMount() {
        this.unHandleScroll = addEventListener(window, 'scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.unHandleScroll();
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

    handleFocus = e => {
        const val = e.currentTarget.value;

        this.setState({
            text: val === '代码/拼音/名称' ? '' : val,
        });
    };

    handleBlur = e => {
        const val = e.currentTarget.value;

        setTimeout(() => {
            this.setState({
                text: val === '' ? '代码/拼音/名称' : val,
            });
        }, 150);
    };

    handleQuoteShow = () => {
        const { quoteShow } = this.state;

        this.setState({ quoteShow: !quoteShow });
    };

    handleFundsShow = () => {
        const { fundsShow } = this.state;

        this.setState({ fundsShow: !fundsShow });
    };

    handleQuoteMouseOver = () => {
        this.setState({ quoteShow: false });
    };

    handleFundsMouseOver = () => {
        this.setState({ fundsShow: false });
    };

    handleQuoteChange = e => {
        this.setState({ text: e.currentTarget.value });
    };

    handleFundsChange = e => {
        this.setState({ text: e.currentTarget.value });
    };

    handleKeyDownQuoteSearch = e => {
        if (e.keyCode === 13) {
            const text = this.state.text;

            window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&q=${text}`);
        }
    };

    handleQuoteSearch = () => {
        const text = this.state.text;

        window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&q=${text}`);
    };

    handleKeyDownFundsSearch = e => {
        if (e.keyCode === 13) {
            const text = this.state.text;

            window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&search_type=zijin&q==${text}`);
        }
    };

    handleFundsSearch = () => {
        const text = this.state.text;

        window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&search_type=zijin&q==${text}`);
    };

    /**
     * 渲染组件
     */
    render() {
        const { text, isShow, quoteShow, fundsShow } = this.state;

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
                                    onMouseLeave={this.handleQuoteMouseOver}>
                                    <div className={styles.search}>
                                        <input
                                            className="quote"
                                            value={text}
                                            onKeyDown={this.handleKeyDownQuoteSearch}
                                            onChange={this.handleQuoteChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                        />
                                        <a onClick={this.handleQuoteSearch}>搜索</a>
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
                                    onMouseLeave={this.handleFundsMouseOver}>
                                    <div className={styles.search}>
                                        <input
                                            className="funds"
                                            value={text}
                                            onKeyDown={this.handleKeyDownFundsSearch}
                                            onChange={this.handleFundsChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                        />
                                        <a onClick={this.handleFundsSearch}>搜索</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {isShow ? (
                            <tr>
                                <td>
                                    <a href="javascript:void(0);" onClick={this.backToTop}>
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

        return ReactDOM.createPortal(bottomAffix, document.body);
    }
}

export default BottomAffix;
