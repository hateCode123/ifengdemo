import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Search 组件
 */
class Search extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={ styles.h_find } >search 组件</div>
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
