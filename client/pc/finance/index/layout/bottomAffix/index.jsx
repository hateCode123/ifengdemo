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
        quote: '',
        funds: '',
    };

    componentDidMount() {
        this.unHandleScroll = addEventListener(document, 'scroll', this.handleScroll);
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
        this.setState({ quote: e.currentTarget.value });
    };

    handleFundsChange = e => {
        this.setState({ funds: e.currentTarget.value });
    };

    handleQuoteSearch = () => {
        const quote = this.state.quote;

        window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&q=${quote}`);
    };

    handleFundsSearch = () => {
        const funds = this.state.funds;

        window.open(`//app.finance.ifeng.com/hq/search.php?type=stock&search_type=zijin&q==${funds}`);
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

export default BottomAffix;
