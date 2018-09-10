import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import HeadTitle from '../../components/headTitle/';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';
import TableTitle from '../../components/tableTitle/';
import Industry from './industry/';
import SingleStock from './singleStock/';

class HotSpots extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const marketAnalysisList = content.marketAnalysis;
        const hotPlateList = content.hotPlate;
        const {
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            industryTitle,
            industry,
            hyin,
            hyout,
            gnin,
            gnout,
            singleStockTitle,
            marketRadarTabs,
            marketRadar,
            trackTabs,
            track,
            fiveDaysTabs,
            fiveDaysBuy,
            fiveDaysSell,
        } = content;

        const industryData = {
            industry,
            hyin,
            hyout,
            gnin,
            gnout,
        };
        const data = { marketRadarTabs, marketRadar, trackTabs, track, fiveDaysTabs, fiveDaysBuy, fiveDaysSell };

        return (
            <div className={`${styles.hot_spots} clearfix`}>
                <Chip
                    id="20059"
                    type="struct"
                    title="操盘热点标题"
                    groupName="操盘热点"
                    content={hotSpotsTitle}
                    position="relative">
                    <HeadTitle />
                </Chip>
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Chip
                            id="20060"
                            type="struct"
                            title="操盘分析标题"
                            groupName="操盘热点"
                            content={hotSpotsSubTitle1}
                            position="relative">
                            <Caption />
                        </Chip>
                        {marketAnalysisList.length > 0 ? <NewsList content={marketAnalysisList} /> : ''}
                    </div>
                    <div className={styles.box}>
                        <Chip
                            id="20061"
                            type="struct"
                            title="热点板块标题"
                            groupName="操盘热点"
                            content={hotSpotsSubTitle2}
                            position="relative">
                            <Caption />
                        </Chip>
                        {hotPlateList.length > 0 ? <NewsList content={hotPlateList} /> : ''}
                    </div>
                    <div className={styles.ad}>
                        <Ad content={content.hotSpotsAd} styleName={styles.ad_box} />
                    </div>
                </div>
                <div className={styles.col_R}>
                    <div className={styles.data_box}>
                        <Chip
                            id="20062"
                            type="struct"
                            title="行业概念资金流向标题"
                            groupName="操盘热点"
                            content={industryTitle}
                            position="relative">
                            <TableTitle />
                        </Chip>
                        <Industry content={industryData} />
                    </div>
                    <div className={styles.data_box}>
                        <Chip
                            id="20064"
                            type="struct"
                            title="个股资金流向标题"
                            groupName="操盘热点"
                            content={singleStockTitle}
                            position="relative">
                            <TableTitle />
                        </Chip>
                        <SingleStock tabs={singleStockTitle.tabs} content={data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(HotSpots);
