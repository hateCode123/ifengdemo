/**
 * 在线答疑模块
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HumanTab from './human-tab';
import SendQuestion from './send-question';

class Question extends PureComponent{
    render(){
        return (
            <Fragment>
                <div className={ styles.q_box }>
                    <img className={ styles.zai_xian_da_yi } src={ require('./zai-xian-da-yi.png') } />
                    <HumanTab />
                </div>
                <SendQuestion />
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Question.propTypes = {};

/**
 * 定义组件默认属性
 * */
Question.defaultProps = {};

export { Question };
export default Question;