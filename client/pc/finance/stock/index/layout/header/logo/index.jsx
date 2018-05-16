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
                <Chip id="10133" type="static" title="Logo" groupName="头部" content={logo}>
                    <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
                </Chip>
            </a>
        );
        const ad = (
            <Chip key="ad" id="10134" type="static" title="Logo" groupName="头部" content={logo}>
                <img className={styles.ad} src={logoAd.src} width={logoAd.width} height={logoAd.height} />
            </Chip>
        );

        return [LOGO, ad];
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