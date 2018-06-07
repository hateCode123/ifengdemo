/**
 * 置顶新闻显示
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Zhiboshi from './zhiboshi';

class NewsDisplay extends PureComponent{
    render(){
        return (
            <div className={ styles.news_display_box }>
                {/* TODO: 置顶新闻待确认 */}
                {/* 直播室链接 */}
                <Zhiboshi />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsDisplay.propTypes = {};

/**
 * 定义组件默认属性
 * */
NewsDisplay.defaultProps = {};

export { NewsDisplay };
export default NewsDisplay;