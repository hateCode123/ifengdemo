import React from 'react';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';

/**
 * 定义 Search 组件
 */
class Search extends React.PureComponent {
    state = { searchTxt: '' };

    handleChange = async e => {
        const val = e.currentTarget.value;

        const data = await jsonp('//app.finance.ifeng.com/hq/suggest_v2.php', {
            data: {
                t: 'all',
                q: val,
                cb: 'suggestCallback(suggest_json)',
            },
            jsonpCallback: 'suggestCallback',
        });

        this.setState({ searchTxt: data[0] });
    };

    handleStockSearch = () => {
        const { searchTxt } = this.state;

        window.open(`//finance.ifeng.com/app/hq/${searchTxt.t}/${searchTxt.c}/index.shtml`);
    };

    handleFundsSearch = () => {
        const { searchTxt } = this.state;

        window.open(`//finance.ifeng.com/zjlx/${searchTxt.c}`);
    };

    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={styles.czj}>
                <input placeholder="代码/拼音/名称" onKeyUp={this.handleChange} />
                <a className={styles.chq} onClick={this.handleStockSearch}>
                    查行情
                </a>
                <a onClick={this.handleFundsSearch}>查资金</a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Search.propTypes = {};

/**
 * 定义组件默认属性
 * */
Search.defaultProps = {};

export { Search };
export default Search;
