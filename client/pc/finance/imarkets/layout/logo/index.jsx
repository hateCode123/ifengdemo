/**
 * logo和时钟
 */

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

/* 配置flash大小的常量 */
const FLASH_BOX = {
    width: 490,
    height: 180
};

class Logo extends PureComponent{
    render(){
        return (
            <div className={ styles.logo_box }>
                <div className={ `${ styles.logo_main } clearfix` }>
                    <a className={ styles.logo_link } href="http://finance.ifeng.com/gold/" target="_blank" />
                    {/* 时间 */}
                    <div className={ styles.time }>
                        <object
                            classID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" 
                            codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"
                            width={ FLASH_BOX.width }
                            height={ FLASH_BOX.height }
                        >
                            <param name="movie" value="http://y1.ifengimg.com/a/2015/0310/a40afde56b53ef1.swf" />
                            <param name="quality" value="high" />
                            <param name="wmode" value="transparent" />
                            <embed
                                src="http://y1.ifengimg.com/a/2015/0310/a40afde56b53ef1.swf"
                                width={ FLASH_BOX.width }
                                height={ FLASH_BOX.height }
                                quality="high"
                                pluginspage="http://www.macromedia.com/go/getflashplayer"
                                type="application/x-shockwave-flash"
                                wmode="transparent"
                            />
                        </object>  
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Logo.propTypes = {};

/**
 * 定义组件默认属性
 * */
Logo.defaultProps = {};

export { Logo };
export default Logo;