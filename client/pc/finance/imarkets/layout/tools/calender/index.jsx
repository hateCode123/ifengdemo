/**
 * 显示日历
 * 每隔一秒刷新日历日期
 */

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

class Calender extends PureComponent{
    timer = null;                     // 定时器
    state = {
        date: new Date().getDate()    // 当前日期
    };

    // 修改日期定时器方法
    changeDate = ()=>{
        const date = new Date().getDate();
        if(date !== this.state.date){
            this.setState({
                date
            });
        }
        this.timer = setTimeout(this.changeDate, 1000); 
    };
    componentDidMount(){
        this.timer = setTimeout(this.changeDate, 1000); 
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
        this.timer = null;
    }
    render(){
        return (
            <div className={ styles.calendar }>{ this.state.date }</div>
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