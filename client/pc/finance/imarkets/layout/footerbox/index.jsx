import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import styles from './index.css';
import HtmlRegion from '../../components/html-region';
import Footer from './footer';

class FooterBox extends PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className={styles.footerbox}>
                {/* 底部合作链接 */}
                <div className={styles.cooperation}>
                    <Chip
                        id="10164"
                        type="static"
                        title="底部合作链接"
                        groupName="底部"
                        translate="jsonParse"
                        content={content.cooperation}>
                        <HtmlRegion />
                    </Chip>
                </div>
                {/* 底部广告 */}
                <Ad styleName={styles.ad} content={content.footerAd} />
                {/* 底部公共版权 */}
                <Chip
                    id="20012"
                    type="struct"
                    title="底部公共版权"
                    groupName="底部"
                    translate="jsonParse"
                    content={content.footer}>
                    <Footer />
                </Chip>
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
