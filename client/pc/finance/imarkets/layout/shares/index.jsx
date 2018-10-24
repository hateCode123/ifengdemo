/**
 * 股票信息
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Shares extends PureComponent {
    iframe = `<iframe
    class="${styles.iframe}"
    src="https://unews.fx678.com/union/HaoSTZ/EC/Fhw/FhwInterface.html"
    scrolling="no"
    frameBorder="0"
    border="0"
/>`;

    render() {
        return (
            <div className={styles.shares}>
                <div dangerouslySetInnerHTML={{ __html: this.iframe }} />
                <p>
                    数据来源：
                    <a href="http://www.fx678.com/" target="_blank">
                        汇通网
                    </a>
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
