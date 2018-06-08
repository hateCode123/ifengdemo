/**
 * 文章排行榜
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

// TODO: 选项卡的切换
class ArticleRankings extends PureComponent{
    render(){
        return (
            <Fragment>
                <div className={ `${ styles.title_box } clearfix` }>
                    <h2 className={ styles.title }>文章点击排行</h2>
                    <input className={ styles.btn } type="button" value="日排行" />
                    <input className={ styles.btn + ' ' + styles.selected } type="button" value="周排行" />
                </div>
                {/* 日排行 */}
                <ul className={ styles.news_list }>
                    <li>
                        <span>1</span>
                        <a href="http://finance.ifeng.com/a/20170513/15372360_0.shtml" target="_blank">A股下周将发生这一幕(图)</a>
                    </li>
                    <li>
                        <span>2</span>
                        <a href="http://finance.ifeng.com/a/20170513/15372360_0.shtml" target="_blank">A股下周将发生这一幕(图)</a>
                    </li>
                    <li>
                        <span>3</span>
                        <a href="http://finance.ifeng.com/a/20170513/15372360_0.shtml" target="_blank">A股下周将发生这一幕(图)</a>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ArticleRankings.propTypes = {};

/**
 * 定义组件默认属性
 * */
ArticleRankings.defaultProps = {};

export { ArticleRankings };
export default ArticleRankings;