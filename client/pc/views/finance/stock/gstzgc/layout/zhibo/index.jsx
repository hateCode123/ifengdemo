import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class Zhibo extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    render() {
        return (
            <div className={styles.zhibo}>
                <a
                    href="http://finance.ifeng.com/gold/zhibo/"
                    target="_blank"
                    rel={rel}
                    title="英国4月CBI工业订单预期差值，实际4，前值4，预期值4">
                    英国4月CBI工业订单预期差值，实际4，前值4，预期值4
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Zhibo.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Zhibo.defaultProps = {};

export default Zhibo;
