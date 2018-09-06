import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

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
        const { logo, logoAd } = this.props.content;

        const LOGO = (
            <a key="logo" href={logo.url} target="_blank" rel={rel}>
                <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
            </a>
        );
        const ad = <img key="ad" className={styles.ad} src={logoAd.src} width={logoAd.width} height={logoAd.height} />;

        return [LOGO, ad];
    }
}

export default errorBoundary(Logo);
