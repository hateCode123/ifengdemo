/**
 * 搜索组件
 */

import React, { PureComponent, createRef } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

class Search extends PureComponent{
    searchTextRef = createRef();

    // 点击跳转新页面搜索
    handleSearchClick = (event)=>{
        const value = this.searchTextRef.current.value;
        window.open(`http://search.ifeng.com/sofeng/search.action?q=${ value }&c=1`);
    };
    // input有焦点时，如果值是“search”，值变成空
    handleSearchFocus = (event)=>{
        const current = this.searchTextRef.current;
        const value = current.value;
        if(value === 'search'){
            current.value = '';
        }
    };
    // input失去焦点时，如果没有值，值为“search”
    handleSearchBlur = (event)=>{
        const current = this.searchTextRef.current;
        const value = current.value;
        if(value === ''){
            current.value = 'search';
        }
    };
    render(){
        return (
            <div className={ styles.search_box }>
                <input 
                    className={ styles.search_text }
                    ref={ this.searchTextRef } type="text"
                    defaultValue="search"
                    onFocus={ this.handleSearchFocus }
                    onBlur={ this.handleSearchBlur }
                />
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