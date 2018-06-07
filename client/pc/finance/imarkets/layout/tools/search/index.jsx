/**
 * 搜索组件
 */

import React, { PureComponent, createRef } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

class Search extends PureComponent{
    searchText = createRef();

    // 点击跳转新页面搜索
    handleSearchClick = (event)=>{
        const value = this.searchText.current.value;
        window.open(`http://search.ifeng.com/sofeng/search.action?q=${ value }&c=1`);
    }
    render(){
        return (
            <div className={ styles.search_box }>
                <input className={ styles.search_text } ref={ this.searchText } type="text" placeholder="search" />
                <input className={ styles.sousuo_btn } type="button" onClick={ this.handleSearchClick } />
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