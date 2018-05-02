import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class ResearchSearch extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={styles.researchSearch}>
                <div className={`${styles.box} clearfix`}>
                    <a className={styles.title}>研报搜索</a>
                    <div className={`${styles.radio} clearfix`}>
                        <input type="radio" value="title" name="yb_search_type" />{'标题 '}
                        <input type="radio" value="org" name="yb_search_type" />{'机构 '}
                        <input type="radio" value="report" name="yb_search_type" />{'公司 '}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ResearchSearch.propTypes = {};

/**
 * 定义组件默认属性
 * */
ResearchSearch.defaultProps = {};

export { ResearchSearch };
export default ResearchSearch;
