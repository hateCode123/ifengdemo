/**
 * 日历、直播nav和搜索
 */

import React, { PureComponent, Fragment } from 'react';
import { formatUrl } from '@ifeng/public_method';
import styles from './index.css';
import Calendar from './calender';
import Search from './search';
import { rel as relText } from '../../../../utils/rel';

class Tools extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.tools_box}>
                    <div className={styles.tools_main}>
                        {/* 财经日历 */}
                        <Calendar />
                        {/* 全球直播 */}
                        <a
                            className={`${styles.ml14} ${styles.zhibo_link}`}
                            href="//finance.ifeng.com/gold/zhibo/"
                            target="_blank"
                            ref={relText}>
                            <i className={styles.earth} />
                            <span className={styles.link_title}>全球直播</span>
                            <i className={styles.play} />
                        </a>
                        <a className={styles.xwhkt} href="//wenda.ifeng.com" target="_blank" ref={relText}>
                            <img src={require('./fhhkt.png')} alt="凤凰汇客厅" />
                        </a>
                        {/* 跳转搜索 */}
                        <Search />
                    </div>
                </div>
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Tools.propTypes = {};

/**
 * 定义组件默认属性
 * */
Tools.defaultProps = {};

export { Tools };
export default Tools;
