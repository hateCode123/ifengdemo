import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Search 组件
 */
class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { value: 'search' };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    handleOnFocus() {
        this.setState({ value: '' });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSearch() {
        const keyword = this.state.value;
        const searchUrl = '//zhannei.baidu.com/cse/search?p=0&s=16378496155419916178&entry=1&area=2&q=';

        window.addEventListener('open', window.open(searchUrl + keyword));
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={styles.searchBtnCon}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                    onKeyPress={this.onKeyPress}
                />
                <span onClick={this.handleSearch}>搜索</span>
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
