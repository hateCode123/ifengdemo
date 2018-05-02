import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HeadTitle from '../../components/headTitle/';
import { Ad } from '../../../../../components/ad';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';
import TableTitle from '../../components/tableTitle/';
import Industry from './industry/';

class HotSpots extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const marketAnalysisList = content.marketAnalysis.list;
        const hotPlateList = content.hotPlate.list;
        const industry = content.industry;

        console.log(content.industry);

        return (
            <div className={`${styles.hot_spots} clearfix`}>
                <HeadTitle content={content.hotSpotsTitle} />
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Caption content={content.hotSpotsSubTitle1} />
                        {marketAnalysisList.length > 0 ? <NewsList content={marketAnalysisList} limit={11} /> : ''}
                    </div>
                    <div className={styles.box}>
                        <Caption content={content.hotSpotsSubTitle2} />
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
