/**
 * 热点专题
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class HotTopic extends PureComponent{
    render(){
        return (
            <Fragment>
                <h2 className={ styles.title }>热点专题</h2>
                <ul className={ styles.list }>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                    <li>
                        <a href="#">凤凰网财经特别策划：走不出去的东北人</a>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotTopic.propTypes = {};

/**
 * 定义组件默认属性
 * */
HotTopic.defaultProps = {};

export { HotTopic };
export default HotTopic;