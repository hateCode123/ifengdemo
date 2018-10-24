/**
 * 日历盒子
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Calender from '../../components/calendar';

class CalenderBox extends PureComponent {
    render() {
        return (
            <div className={styles.box}>
                <img className={styles.rili} src={require('./rili.jpg')} />
                <Calender />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CalenderBox.propTypes = {};

/**
 * 定义组件默认属性
 * */
CalenderBox.defaultProps = {};

export { CalenderBox };
export default CalenderBox;
