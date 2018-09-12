import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../utils/rel';

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
        const {
            content: { logo, logoAd, channelAd },
        } = this.props;

        return (
            <React.Fragment>
                <Chip id="20006" type="struct" title="Logo" groupName="头部" content={logo}>
                    <a href={logo.url} target="_blank" rel={rel}>
                        <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
                    </a>
                </Chip>
                <div className={styles.ad_1}>
                    <Chip id="20007" type="struct" title="LogoAd" groupName="头部" content={logoAd}>
                        <img src={logoAd.src} width={logoAd.width} height={logoAd.height} />
                    </Chip>
                </div>
                <Ad content={channelAd} styleName={styles.ad_2} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Logo);
