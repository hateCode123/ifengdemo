import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import NewsList from '../newsList/';
import errorBoundary from '@ifeng/errorBoundary';

class MainTop extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { hk_lzzx, hk_xgsswl, hk_ggwl, hk_wdnszzjlrlc },
        } = this.props;

        return (
            <div className={styles.col_1000}>
                <div className={styles.bottom_box_line}>
                    <div className={styles.bottom_box_L}>
                        <NewsList content={hk_lzzx} mode="pureList" />
                    </div>
                    <div className={styles.bottom_box_M}>
                        <NewsList content={hk_ggwl} mode="inIframe" />
                    </div>
                    <div className={styles.bottom_box_R}>
                        <NewsList content={hk_wdnszzjlrlc} mode="inIframe" />
                    </div>
                </div>
                <div className={styles.bottom_box_line}>
                    <NewsList content={hk_xgsswl} mode="inIframe" />
                </div>
            </div>
        );
    }
}

export default errorBoundary(MainTop);
