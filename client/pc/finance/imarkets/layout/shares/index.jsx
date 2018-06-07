/**
 * 股票信息
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Shares extends PureComponent{
    render(){
        return (
            <div className={ styles.shares }>
                <iframe className={ styles.iframe } src="http://unews.fx678.com/union/HaoSTZ/EC/Fhw/FhwInterface.html" scrolling="no" />
                <p>
                    数据来源：
                    <a href="http://www.fx678.com/" target="_blank">汇通网</a>
                </p>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Shares.propTypes = {};

/**
 * 定义组件默认属性
 * */
Shares.defaultProps = {};

export { Shares };
export default Shares;