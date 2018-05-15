import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { MidTitle } from '../../../components/midTitle';
import CattleStocks from './cattleStocks/';
import Rank from './rank/';
import FundsFlow from './fundsFlow/';
import CustomStocks from './customStocks/';
import Qa from './QA/';

class MiddleContent extends React.PureComponent {
    state = {
        nowTime: '',
    };

    componentDidMount() {
        this.refreshCalendarClock();
        setInterval(() => {
            this.refreshCalendarClock();
        }, 1000);
    }

    /**
     * 获取当前时间
     */
    refreshCalendarClock = () => {
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

    /**
     * 渲染组件
     */
    render() {
        const { nowTime } = this.state;
        const { content } = this.props;

        return (
            <div className={styles.col_M}>
                <div className={styles.cattle_stocks}>
                    <Chip
                        id="10100"
                        type="static"
                        title="视频抓牛股标题"
                        groupName="正文"
                        content={content.cattleStocksTitle}>
                        <MidTitle nowTime={nowTime} />
                    </Chip>
                    <CattleStocks />
                </div>
                <div className={styles.space16} />
                <div className={styles.rank_box}>
                    <Chip id="10101" type="static" title="涨跌排行榜标题" groupName="正文" content={content.rankTitle}>
                        <MidTitle />
                    </Chip>
                    <Rank />
                </div>
                <div className={styles.space16} />
                <div className={styles.funds_flow}>
                    <Chip
                        id="10102"
                        type="static"
                        title="资金流向标题"
                        groupName="正文"
                        content={content.fundsFlowTitle}>
                        <MidTitle />
                    </Chip>
                    <FundsFlow />
                </div>
                <div className={styles.space16} />
                <div className={styles.custom_stocks}>
                    <Chip
                        id="10103"
                        type="static"
                        title="自选股登录标题"
                        groupName="正文"
                        content={content.customStocksTitle}>
                        <MidTitle />
                    </Chip>
                    <CustomStocks />
                </div>
                <div className={styles.space20} />
                <div className={styles.qa}>
                    <Chip id="10104" type="static" title="分析师答疑标题" groupName="正文" content={content.QaTitle}>
                        <MidTitle />
                    </Chip>
                    <Qa tabs={content.QaTabs} />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MiddleContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
MiddleContent.defaultProps = {};

export { MiddleContent };
export default MiddleContent;
