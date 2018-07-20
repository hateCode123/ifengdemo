import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../../utils/rel';
import { Ad } from '../../../../../components/ad';

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
                <a href={logo[0].url} target="_blank" rel={rel}>
                    <Chip id="10131" type="static" title="Logo" groupName="头部" content={logo[0]}>
                        <img src={logo[0].src} alt={logo[0].title} width={logo[0].width} height={logo[0].height} />
                    </Chip>
                </a>
                <div className={styles.ad_1}>
                    <Chip id="10132" type="static" title="LogoAd" groupName="头部" content={logoAd[0]}>
                        <img src={logoAd[0].src} width={logoAd[0].width} height={logoAd[0].height} />
                    </Chip>
                </div>
                <Ad content={channelAd} styleName={styles.ad_2} />
            </React.Fragment>
        );
    }
}

export default Logo;
