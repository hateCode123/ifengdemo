import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import MarketRadar from './marketRadar/';
import Track from './track/';
import FiveDays from './fiveDays/';

class SingleStock extends React.PureComponent {
    state = {
        current: 0,
    };

    handleMouseOver = index => {
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
            list = (
                <Chip id="10089" type="static" title="市场雷达" groupName="操盘热点" content={marketRadar}>
                    <MarketRadar tabs={marketRadarTabs[0].tabs} />
                </Chip>
            );
        } else if (current === 1) {
            list = (
                <Chip id="10090" type="static" title="大单追踪" groupName="操盘热点" content={track}>
                    <Track tabs={trackTabs[0].tabs} />
                </Chip>
            );
        } else {
            list = (
                <Chip
                    id="10091"
                    type="static"
                    title="5日增减仓"
                    groupName="操盘热点"
                    content={current === 2 ? fiveDaysBuy : fiveDaysSell}>
                    <FiveDays current={current} tabs={fiveDaysTabs[0].tabs} />
                </Chip>
            );
        }

        return (
            <div className={styles.data_box}>
                <ul className={`${styles.tabs} clearfix`}>
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            className={current === index ? styles.current : ''}
                            onMouseEnter={() => this.handleMouseOver(index)}>
                            {item}
                        </li>
                    ))}
                </ul>
                {list}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SingleStock.propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
SingleStock.defaultProps = {};

export { SingleStock };
export default SingleStock;
