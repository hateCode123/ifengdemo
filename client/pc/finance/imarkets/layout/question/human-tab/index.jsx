import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

// TODO: 在线答疑头像可以切换
class HumanTab extends PureComponent{
    render(){
        return (
            <div className={ styles.human_tab_box }>
                <input className={ `${ styles.btn } ${ styles.btn_left }` } type="button" value="&lt;" />
                <input className={ `${ styles.btn } ${ styles.btn_right }` } type="button" value="&gt;" />
                <img className={ styles.head } src="http://p1.ifengimg.com/a/2017/0921/b38c49677cfc86bsize28_w119_h119.png" />
                <p className={ styles.text }>郑晓嵘 KVB昆仑国际全球交易总监</p>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HumanTab.propTypes = {};

/**
 * 定义组件默认属性
 * */
HumanTab.defaultProps = {};

export { HumanTab };
export default HumanTab;