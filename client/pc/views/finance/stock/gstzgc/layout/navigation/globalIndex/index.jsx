import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class GlobalIndex extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    render() {
        return (
            <ul className={styles.qqList}>
                <li className={styles.l1}>
                    A股指数
                    <span>|</span>
                </li>
                <li>
                    <ul id="global_index" className={styles.globalIndex}>
                        <li className={styles.lR}>
                            上证指数：
                            <span className={styles.kaipan}>0</span>&nbsp;
                            <span className={styles.zhangfu}>0</span>
                        </li>
                        <li className={styles.lR}>
                            深证指数：
                            <span className={styles.kaipan}>0</span>&nbsp;
                            <span className={styles.zhangfu}>0</span>
                        </li>
                        <li className={styles.lR}>
                            创业板指：
                            <span className={styles.kaipan}>0</span>&nbsp;
                            <span className={styles.zhangfu}>0</span>
                        </li>
                        <li className={styles.lR}>
                            恒生指数：
                            <span className={styles.kaipan}>0</span>&nbsp;
                            <span className={styles.zhangfu}>0</span>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
GlobalIndex.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
GlobalIndex.defaultProps = {};

export default GlobalIndex;
