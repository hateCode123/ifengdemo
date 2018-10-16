import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import NewsList from '../newsList/';
import Ad from '../../ad/';
import errorBoundary from '@ifeng/errorBoundary';

class MainTop extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { hk_ggyw, hk_mgyw, hk_zs, hk_jgdt, hk_ggxt, hk_mjyhs, ad_content_R_side_03 },
        } = this.props;

        return (
            <div className={styles.col_1000}>
                <div className={styles.content_l}>
                    <NewsList content={hk_ggyw} mode="pureList" />
                    <div className={styles.h_40} />
                    <NewsList content={hk_mgyw} mode="pureList" />
                </div>
                <div className={styles.content_r}>
                    <div className={styles.siderBox}>
                        <div className={styles.col_L}>
                            <NewsList content={hk_zs} mode="inIframe" />
                        </div>
                        <div className={styles.col_R}>
                            <NewsList content={hk_jgdt} mode="singlePic" />
                        </div>
                    </div>
                    <Chip
                        id="30012"
                        type="struct"
                        title="页面主体右侧广告03"
                        groupName="广告"
                        content={ad_content_R_side_03}>
                        <Ad />
                    </Chip>
                    <div className={`${styles.siderBox} ${styles.p_20}`}>
                        <div className={styles.col_L}>
                            <NewsList content={hk_ggxt} mode="singlePic" />
                        </div>
                        <div className={styles.col_R}>
                            <NewsList content={hk_mjyhs} mode="singlePic" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(MainTop);
