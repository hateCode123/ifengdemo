import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../../../utils/rel';

/**
 * 定义 Logo 组件
 */
class Logo extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const logo = this.props.content.logo[0];
        const logoAd = this.props.content.logoAd[0];

        const LOGO = (
            <a key="logo" href={logo.url} target="_blank" rel={rel}>
                <Chip id="10131" type="static" title="Logo" groupName="头部" content={logo}>
                    <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
                </Chip>
            </a>
        );
        const ad1 = (
            <div key="ad_1" className={styles.ad_1}>
                <Chip id="10132" type="static" title="LogoAd" groupName="头部" content={logoAd}>
                    <img src={logoAd.src} width={logoAd.width} height={logoAd.height} />
                </Chip>
            </div>
        );
        const ad2 = <div key="ad_2" className={styles.ad_2} />;

        return [LOGO, ad1, ad2];
    }
}

/**
 * 定义组件属性类型
 * */
Logo.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Logo.defaultProps = {};

export { Logo };
export default Logo;
