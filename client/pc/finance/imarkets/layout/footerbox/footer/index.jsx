/**
 * 定义 Footer 组件
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class Footer extends PureComponent{
    // 渲染content
    contentView(content){
        return content.map((item, index)=>{
            return (
                <a key={ `${ item.title }_${ item.url }` } className={ styles.link } href={ item.url } target="_blank" rel={ rel }>
                    { item.title }
                </a>
            );
        });
    }
    render(){
        const { content } = this.props;
        const copyrightData = content.pop();

        return (
            <div className={ styles.footer }>
                <div className={ `${ styles.foot_link } clearfix` }>
                    <div className={ styles.list }>{ this.contentView(content) }</div>
                </div>
                <div className={ styles.copyright }>
                    <span>{ copyrightData.text0 }</span>
                    <span>{ copyrightData.text1 }</span>
                    <span>{ copyrightData.text2 }</span>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Footer.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Footer.defaultProps = {};

export { Footer };
export default Footer;
