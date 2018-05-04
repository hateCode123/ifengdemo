import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import HeadTitle from '../../components/headTitle/';
import { Ad } from '../../../../../components/ad';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';
import TableTitle from '../../components/tableTitle/';
import Industry from './industry/';
import SingleStock from './singleStock/';

class HotSpots extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const marketAnalysisList = content.marketAnalysis.list;
        const hotPlateList = content.hotPlate.list;
        const {
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            industry,
            singleStockTitle,
            marketRadar,
            track,
            fiveDays,
        } = content;

        const data = [marketRadar, track, fiveDays];

        console.log(content.fiveDays);

        return (
            <div className={`${styles.hot_spots} clearfix`}>
                <Chip id="10067" type="static" title="操盘热点标题" groupName="操盘热点" content={hotSpotsTitle}>
                    <HeadTitle />
                </Chip>
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Chip
                            id="10070"
                            type="static"
                            title="操盘分析标题"
                            groupName="操盘热点"
                            content={hotSpotsSubTitle1}>
                            <Caption />
                        </Chip>
                        {marketAnalysisList.length > 0 ? <NewsList content={marketAnalysisList} limit={11} /> : ''}
                    </div>
                    <div className={styles.box}>
                        <Chip
                            id="10071"
                            type="static"
                            title="热点板块标题"
                            groupName="操盘热点"
                            content={hotSpotsSubTitle2}>
                            <Caption />
                        </Chip>
                        {hotPlateList.length > 0 ? <NewsList content={hotPlateList} limit={11} /> : ''}
                    </div>
                    <div className={styles.ad}>
                        <Ad content={content.hotSpotsAd} styleName={styles.ad_box} />
                    </div>
                </div>
                <div className={styles.col_R}>
                    <div className={styles.data_box}>
                        <TableTitle title={industry.title} url={industry.url} more={industry.more} />
                        <Industry tabs={industry.tabs} data={industry.data} max={8} />
                    </div>
                    <div className={styles.data_box}>
                        <TableTitle
                            title={singleStockTitle.title}
                            url={singleStockTitle.url}
                            more={singleStockTitle.more}
                        />
                        <SingleStock tabs={singleStockTitle.tabs} content={data} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotSpots.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
HotSpots.defaultProps = {};

export { HotSpots };
export default HotSpots;
