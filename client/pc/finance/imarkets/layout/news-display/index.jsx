/**
 * 置顶新闻显示
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HtmlRegion from '../../components/html-region';
import Zhiboshi from './zhiboshi';

class NewsDisplay extends PureComponent{
    render(){
        const { content } = this.props;

        return (
            <div className={ styles.news_display_box }>
                {/* 置顶新闻 */}
                <HtmlRegion content={ content.topnews } />
                {/* 直播室链接 */}
                <Zhiboshi />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsDisplay.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
NewsDisplay.defaultProps = {};

export { NewsDisplay };
export default NewsDisplay;