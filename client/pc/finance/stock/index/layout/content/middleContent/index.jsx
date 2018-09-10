import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import MidTitle from '../../../components/midTitle';
import CattleStocks from './cattleStocks/';
import Rank from './rank/';
import FundsFlow from './fundsFlow/';
import CustomStocks from './customStocks/';
import Qa from './QA/';

class MiddleContent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_M}>
                <div className={styles.cattle_stocks}>
                    <Chip
                        id="20049"
                        type="struct"
                        title="视频抓牛股标题"
                        groupName="正文"
                        content={content.cattleStocksTitle}
                        position="relative">
                        <MidTitle nowTime />
                    </Chip>
                    <CattleStocks />
                </div>
                <div className={styles.space16} />
                <div className={styles.rank_box}>
                    <Chip
                        id="20050"
                        type="struct"
                        title="涨跌排行榜标题"
                        groupName="正文"
                        content={content.rankTitle}
                        position="relative">
                        <MidTitle />
                    </Chip>
                    <Rank />
                </div>
                <div className={styles.space16} />
                <div className={styles.funds_flow}>
                    <Chip
                        id="20051"
                        type="struct"
                        title="资金流向标题"
                        groupName="正文"
                        content={content.fundsFlowTitle}
                        position="relative">
                        <MidTitle />
                    </Chip>
                    <FundsFlow />
                </div>
                <div className={styles.space16} />
                <div className={styles.custom_stocks}>
                    <Chip
                        id="20052"
                        type="struct"
                        title="自选股登录标题"
                        groupName="正文"
                        content={content.customStocksTitle}
                        position="relative">
                        <MidTitle />
                    </Chip>
                    <CustomStocks />
                </div>
                <div className={styles.space20} />
                <div className={styles.qa}>
                    <Chip
                        id="20053"
                        type="struct"
                        title="分析师答疑标题"
                        groupName="正文"
                        content={content.QaTitle}
                        position="relative">
                        <MidTitle />
                    </Chip>
                    <Qa tabs={content.QaTabs} />
                </div>
            </div>
        );
    }
}

export default MiddleContent;
