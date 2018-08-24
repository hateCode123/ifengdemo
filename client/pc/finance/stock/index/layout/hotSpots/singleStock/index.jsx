import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import MarketRadar from './marketRadar/';
import Track from './track/';
import FiveDays from './fiveDays/';

class SingleStock extends React.PureComponent {
    static propTypes = {
        tabs: PropTypes.array,
        content: PropTypes.object,
    };

    state = {
        current: 0,
    };

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.state;
        const { tabs, content } = this.props;
        const { marketRadarTabs, marketRadar, trackTabs, track, fiveDaysTabs, fiveDaysBuy, fiveDaysSell } = content;

        let list = null;

        if (current === 0) {
            list = <MarketRadar tabs={marketRadarTabs[0].tabs} content={marketRadar} />;
        } else if (current === 1) {
            list = <Track tabs={trackTabs[0].tabs} content={track} />;
        } else {
            list = (
                <FiveDays
                    current={current}
                    tabs={fiveDaysTabs[0].tabs}
                    content={current === 2 ? fiveDaysBuy : fiveDaysSell}
                />
            );
        }

        return (
            <div className={styles.data_box}>
                <ul className={`${styles.tabs} clearfix`}>
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            data-index={index}
                            className={current === index ? styles.current : ''}
                            onMouseEnter={this.handleMouseOver}>
                            {item}
                        </li>
                    ))}
                </ul>
                {list}
            </div>
        );
    }
}

export default errorBoundary(SingleStock);
