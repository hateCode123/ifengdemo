/**
 * 热点专题
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class HotTopic extends PureComponent{
    // 渲染列表
    listView(list){
        const topList = [];
        for(let i = 0, j = 8; i < j; i++){
            const item = list[i];
            topList.push(
                <li key={ i }>
                    <a href={ item.url } target="_blank">{ item.title }</a>
                </li>
            );
        }
        return topList;
    }
    render(){
        const { content } = this.props;

        return (
            <Fragment>
                <h2 className={ styles.title }>热点专题</h2>
                <ul className={ styles.list }>
                    { this.listView(content.hottopic) }
                </ul>
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotTopic.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
HotTopic.defaultProps = {};

export { HotTopic };
export default HotTopic;