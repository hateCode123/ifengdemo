import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

/**
 * 定义 Logo 组件
 */
class Logo extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { logo, logoAd } = this.props.content;

        const LOGO = (
            <a key="logo" href={logo.url} target="_blank" rel={rel}>
                <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
            </a>
        );
        const ad1 = (
            <div key="ad_1" className={styles.ad_1}>
                <img src={logoAd.src} width={logoAd.width} height={logoAd.height} />
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
