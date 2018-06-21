import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class HumanTab extends PureComponent{
    maxIndex = null;  // 头像数组的最大值
    state = {
        index: 0      // 切换头像的数组
    };
    componentDidMount(){
        this.maxIndex = this.props.content.length - 1;
    }
    // 向左切换
    handleLeftClick = (event)=>{
        this.setState({
            index: this.state.index === 0 ? this.maxIndex : (this.state.index - 1)
        });
    };
    // 向右切换
    handleRightClick = (event)=>{
        this.setState({
            index: this.state.index === this.maxIndex ? 0 : (this.state.index + 1)
        });
    };
    render(){
        const { image, name } = this.props.content[this.state.index];
        return (
            <div className={ styles.human_tab_box }>
                <input className={ `${ styles.btn } ${ styles.btn_left }` } type="button" value="&lt;" onClick={ this.handleLeftClick } />
                <input className={ `${ styles.btn } ${ styles.btn_right }` } type="button" value="&gt;" onClick={ this.handleRightClick } />
                <img className={ styles.head } src={ image } />
                <p className={ styles.text }>{ name }</p>
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