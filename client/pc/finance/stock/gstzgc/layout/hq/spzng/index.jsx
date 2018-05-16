import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HqSubtitle from '../subtitle';
import { NgTabs } from './ngTabs';
import Chip from 'Chip';
import StockData from './stockData';
import { Search } from './search';

class Niugu extends React.PureComponent {
    state = {
        current: 0,
        nowTime: '',
    };

    /**
     * 切换hqTab操作
     */
    handleTabsChange = num => {
        this.setState({ current: num });
    };

    componentDidMount() {
        const refreshCalendarClock = () => {
            const now = new Date();
            let time = '';
            let hours = now.getHours();

            if (hours < 10) {
                hours = `0${hours}`;
            }
            time += `${hours}:`;
            let minutes = now.getMinutes();

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            time += minutes;

            this.setState({
                nowTime: time,
            });
        };

        refreshCalendarClock();
        setInterval(() => {
            refreshCalendarClock();
        }, 20000);
    }

    render() {
        const { content } = this.props;
        const { current, nowTime } = this.state;

        return (
            <div className={styles.hqzx}>
                <Chip id="10063" type="static" title="视频抓牛股" content={content.spzngTit}>
                    <HqSubtitle content={content.spzngTit} nowTime={nowTime} />
                </Chip>
                <div>
                    <NgTabs content={content.spzngTabs} current={current} handleTabsChange={this.handleTabsChange} />
                    <StockData current={current} />
                    <Search />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Niugu.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Niugu.defaultProps = {};

export default Niugu;
