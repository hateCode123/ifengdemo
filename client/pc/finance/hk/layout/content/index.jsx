import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import MainTop from './mainTop/';
import MainMiddle from './mainMiddle/';
import MainBottom from './mainBottom/';
import Ad from '../ad/';
import InIframe from './inIframe/';
import errorBoundary from '@ifeng/errorBoundary';

class Content extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: {
                mainTopData,
                mainMiddleData,
                mainBottomData,
                mainBody_ad: { ad_content_02, ad_content_04 },
                headerFrame: { topBannerFrame },
            },
        } = this.props;

        return (
            <div className={styles.main_box}>
                <div className={styles.searchBox}>
                    <Chip
                        id="30016"
                        type="struct"
                        title="头部通栏iframe2"
                        groupName="iframe引用"
                        content={topBannerFrame}>
                        <InIframe />
                    </Chip>
                </div>
                <MainTop content={mainTopData} />
                <Chip id="30011" type="struct" title="页面主体通栏广告02" groupName="广告" content={ad_content_02}>
                    <Ad />
                </Chip>
                <MainMiddle content={mainMiddleData} />
                <Chip id="30013" type="struct" title="页面主体通栏广告04" groupName="广告" content={ad_content_04}>
                    <Ad />
                </Chip>
                <MainBottom content={mainBottomData} />
            </div>
        );
    }
}

export default errorBoundary(Content);
