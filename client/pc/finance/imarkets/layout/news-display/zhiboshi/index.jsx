import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import { jsonp } from '@ifeng/ui_base';
import styles from './index.css';

class Zhiboshi extends PureComponent{
    timer = null;     // 定时器
    state = {
        title: null,  // 直播间标题
        id: null      // 当前的标题id
    };
    
    componentDidMount(){
        this.getNewTitle();
        this.timer = setInterval(this.getNewTitle, 30000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
    }
    // 删除文本内的标签，测试文字：
    deleteHtmlTag = (text) => text.replace(/<\/?[a-zA-Z]+>/g, '');
    // 获取新的直播间标题
    getNewTitle = async()=>{
        try{
            const data = await jsonp('http://api3.finance.ifeng.com/live/getnew', {
                data: {
                    level: 1,
                    dist: 1, 
                    cb: 'setNewCont'
                },
                cache: false,
                jsonpCallback: 'setNewCont'
            });
            const infor = data[0];
            if(this.state.id !== infor.id){
                let title = this.deleteHtmlTag(infor.title[0]);
                if(title.length > 26){
                    title = title.substring(0, 26) + '...';
                }
                this.setState({
                    id: infor.id,
                    title
                });
            }
        }catch(err){
            console.error(err);
        }
    };
    render(){
        return (
            <div className={ styles.zhiboshi }>
                <a className={ styles.link } href="http://finance.ifeng.com/gold/zhibo/index.shtml" target="_blank">{ this.state.title }</a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Zhiboshi.propTypes = {};

/**
 * 定义组件默认属性
 * */
Zhiboshi.defaultProps = {};

export { Zhiboshi };
export default Zhiboshi;