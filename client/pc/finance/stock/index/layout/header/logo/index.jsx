import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../utils/rel';

/**
 * 定义 Logo 组件
 */
class Logo extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const logo = this.props.content.logo;
        const logoAd = this.props.content.logoAd;

        const LOGO = (
            <a key="logo" href={logo.url} target="_blank" rel={rel}>
                <Chip id="20037" type="struct" title="Logo" groupName="头部" content={logo}>
                    <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
                </Chip>
            </a>
        );
        const ad = (
            <Chip key="ad" id="20038" type="struct" title="LogoAd" groupName="头部" content={logo}>
                <img className={styles.ad} src={logoAd.src} width={logoAd.width} height={logoAd.height} />
            </Chip>
        );

        return [LOGO, ad];
    }
}

export default errorBoundary(Logo);
