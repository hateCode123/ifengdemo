import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import NewsList from '../newsList/';
import BannerMap from './bannerMap/';
import errorBoundary from '@ifeng/errorBoundary';

class MainTop extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { hk_toutiao, bannerData, hk_dxgl, hk_xgdp, hk_xgpj, hk_xgss, hk_rdzt, hk_ssgs },
        } = this.props;

        return (
            <div className={styles.col_1000}>
                <div className={styles.content_l}>
                    <NewsList content={hk_toutiao} mode="eachPic" />
                </div>
                <div className={styles.content_r}>
                    <BannerMap content={bannerData} />
                    <div className={styles.siderBox}>
                        <div className={styles.col_L}>
                            <NewsList content={hk_dxgl} mode="singlePic" />
                        </div>
                        <div className={styles.col_R}>
                            <NewsList content={hk_xgdp} mode="pureList" />
                        </div>
                    </div>
                    <div className={styles.siderBox}>
                        <div className={styles.col_L}>
                            <NewsList content={hk_xgpj} mode="singlePic" />
                        </div>
                        <div className={styles.col_R}>
                            <NewsList content={hk_xgss} mode="inIframe" />
                        </div>
                    </div>
                    <div className={styles.siderBox}>
                        <div className={styles.col_L}>
                            <NewsList content={hk_rdzt} mode="singlePic" />
                        </div>
                        <div className={styles.col_R}>
                            <NewsList content={hk_ssgs} mode="singlePic" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(MainTop);
