import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { jsonp } from '@ifeng/ui_base';
import styles from './index.css';

class SendQuestion extends PureComponent{
    questionRef = createRef();  // 输入问题
    emailRef = createRef();     // 邮箱
    nicknameRef = createRef();  // 昵称

    // textarea有焦点时，如果值是“请在此输入您的问题”，值变成空
    handleQuestionFocus = (event)=>{
        const current = this.questionRef.current;
        const value = current.value;
        if(value === '请在此输入您的问题'){
            current.value = '';
        }
    };
    // textarea失去焦点时，如果值为空，值变成“请在此输入您的问题”
    handleQuestionBlur = (event)=>{
        const current = this.questionRef.current;
        const value = current.value;
        if(value === ''){
            current.value = '请在此输入您的问题';
        }
    };
    // 发送问题
    async sendQuestion(qValue, eValue, nValue){
        const subData = {
            content: qValue,
            email: eValue,
            name: nValue,
            src: 'im'  //固定传im
        }
        try{
            const data = await jsonp('http://creative.ifeng.com/psm_v1/kvbs/index.php?_c=kvbs&_a=message&callback=zaixiandayi', {
                data: subData,
                cache: false,
                jsonpCallback: 'zaixiandayi'
            });
            console.log(data);
            if(data.msg === 1){
                alert('提交成功，小编正在审核，请稍后查看！');
            }else{
                alert('亲，留言没有成功哦');
            }
        }catch(err){
            console.error(err);
        }
    }
    // 提交答疑问题
    handleSendQuestionClick = (event)=>{
        const EMAIL_REG = /^([a-zA-Z0-9]+[_|\_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/;
        const qValue = this.questionRef.current.value;
        const eValue = this.emailRef.current.value;
        const nValue = this.nicknameRef.current.value;
        // 文本验证
        if(qValue === '' || qValue === '请在此输入您的问题'){
            alert("请输入您的问题，再进行提交!");
            return false;
        }else if(eValue === ''){
            alert("请输入您的邮箱，再进行提交!");
            return false;
        }else if(nValue === ''){
            alert("请输入您的昵称，再进行提交!");
            return false;
        }else if(!EMAIL_REG.test(eValue)){
            alert("请输入正确的邮箱格式");
            return false;
        }else{
            this.sendQuestion(qValue, eValue, nValue);
        }
    };
    render(){
        return (
            <div className={ `${ styles.question_box } clearfix` }>
                <textarea 
                    className={ styles.question }
                    ref={ this.questionRef }
                    aria-label="请在此输入您的问题"
                    defaultValue="请在此输入您的问题"
                    onFocus={ this.handleQuestionFocus }
                    onBlur={ this.handleQuestionBlur }
                />
                <div className={ styles.box1 }>
                    <label htmlFor="send-question-email">邮箱</label>
                    <input className={ styles.input } id="send-question-email" ref={ this.emailRef } type="text" />
                </div>
                <div className={ styles.box2 }>
                    <label htmlFor="send-question-nickname">昵称</label>
                    <input className={ styles.input } id="send-question-nickname" ref={ this.nicknameRef } type="text" />
                </div>
                <input className={ styles.submit } type="button" value="提交" onClick={ this.handleSendQuestionClick } />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SendQuestion.propTypes = {};

/**
 * 定义组件默认属性
 * */
SendQuestion.defaultProps = {};

export { SendQuestion };
export default SendQuestion;