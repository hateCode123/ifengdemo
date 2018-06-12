import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HtmlRegion from '../../components/html-region';
import Ad from '../../../../components/ad';
import Footer from './footer';

class FooterBox extends PureComponent{
    render(){
        const { content } = this.props;
        return (
            <div className={ styles.footerbox }>
                {/* 底部合作链接 */}
                <div className={ styles.cooperation }>
                    <HtmlRegion content={ content.cooperation } />
                </div>
                {/* 底部广告 */}
                <Ad styleName={ styles.ad } />
                {/* 底部公共导航 */}
                <Footer content={ content.footer } />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
FooterBox.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
FooterBox.defaultProps = {};

export { FooterBox };
export default FooterBox;