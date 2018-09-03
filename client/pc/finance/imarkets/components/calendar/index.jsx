/**
 * 日历
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel as relText } from '../../../../utils/rel';

class Calender extends PureComponent {
    constructor(...argu) {
        super(argu);

        const date = new Date();

        // 记录当前的日期
        this.todayYear = date.getFullYear();
        this.todayMonth = date.getMonth() + 1;
        this.todayDate = date.getDate();

        this.state = {
            year: this.todayYear,
            month: this.todayMonth,
        };
    }
    // 上一月
    handleLastMonthClick = event => {
        const { year, month } = this.state;

        if (month === 1) {
            this.setState({
                year: year - 1,
                month: 12,
            });
        } else {
            this.setState({
                month: month - 1,
            });
        }
    };
    // 下一月
    handleNextMonthClick = event => {
        const { year, month } = this.state;

        if (month === 12) {
            this.setState({
                year: year + 1,
                month: 1,
            });
        } else {
            this.setState({
                month: month + 1,
            });
        }
    };
    // 判断当前的月份有多少天
    getDayLen(year, month) {
        let day = null;

        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                day = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                day = 30;
                break;
            case 2:
                day = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
                break;
        }

        return day;
    }
    // 判断是否是今天
    isToday = (year, month, date) => year === this.todayYear && month === this.todayMonth && date === this.todayDate;
    // 判断是否为当前时间之后
    isTomorrow = (todayYear, todayMonth, todayDate, year, month, date) => {
        if (year > todayYear) return true;
        if (month > todayMonth) return true;
        if (date > todayDate) return true;
    };
    // 渲染日期
    dateView() {
        const today = new Date(); // 当前日期
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const date = new Date(this.state.year, this.state.month - 1, 1); // 计算日期
        const day = date.getDay(); // 获取当前是周几，前空td数量
        const dayLen = this.getDayLen(this.state.year, this.state.month); // 判断当前的月份有多少天
        const spaceAfterTd = 42 - dayLen - day; // 后空td数量
        const td = []; // 构建td
        const tr = []; // 构建tr

        // 输出前空td
        for (let i = 0; i < day; i++) {
            td.push(<td key={`before_${i}`} />);
        }
        // 输出带日期的td
        for (let i = 1; i <= dayLen; i++) {
            const href = `//finance.ifeng.com/gold/snapshots/${this.state.year}/${String(this.state.month).padStart(
                '2',
                '0',
            )}${String(i).padStart('2', '0')}10.html`;
            const aHref = this.isTomorrow(todayYear, todayMonth, todayDate, this.state.year, this.state.month, i)
                ? null
                : href;

            td.push(
                <td
                    key={`day_${i}`}
                    className={this.isToday(this.state.year, this.state.month, i) ? styles.current : null}>
                    <a href={aHref} target="_blank" rel={relText}>
                        {i}
                    </a>
                </td>,
            );
        }
        // 输出后空td
        for (let i = 0; i <= spaceAfterTd; i++) {
            td.push(<td key={`after_${i}`} />);
        }
        // 构建tr
        for (let i = 0; i < 6; i++) {
            const st = 7 * i;

            tr.push(<tr key={`tr_${i}`}>{td.slice(st, st + 7)}</tr>);
        }

        return tr;
    }
    render() {
        return (
            <div className={styles.calender}>
                <div className={styles.tools}>
                    <span>
                        {this.state.year}年{this.state.month}月
                    </span>
                    <input
                        className={`${styles.btn} ${styles.btn_left}`}
                        type="button"
                        onClick={this.handleLastMonthClick}
                    />
                    <input
                        className={`${styles.btn} ${styles.btn_right}`}
                        type="button"
                        onClick={this.handleNextMonthClick}
                    />
                </div>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th>SUN</th>
                            <th>MON</th>
                            <th>TUE</th>
                            <th>WED</th>
                            <th>THU</th>
                            <th>FRL</th>
                            <th>SAT</th>
                        </tr>
                    </thead>
                    <tbody>{this.dateView()}</tbody>
                </table>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Calender.propTypes = {};

/**
 * 定义组件默认属性
 * */
Calender.defaultProps = {};

export { Calender };
export default Calender;
