import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import HeadTitle from '../../components/headTitle/';
import ResearchSearch from './researchSearch/';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';
import TableTitle from '../../components/tableTitle/';
import StarAnalyst from './starAnalyst/';
import StockPicking from './stockPicking/';

class School extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const logsList = content.logs;
        const schoolList = content.school;
        const {
            starAnalystTitle,
            starAnalyst,
            starSrank,
            starMrank,
            starLrank,
            stockPickingTitle,
            stockpool,
            stockpoolData,
            chgpctest,
            chgpctestData,
            levelup,
            levelupData,
            firstfocus,
            firstfocusData,
            focusest,
            focusestData,
        } = content;
        const starAnalystData = [starAnalyst, starSrank, starMrank, starLrank];
        const stockPickingData = [
            [stockpool, stockpoolData],
            [chgpctest, chgpctestData],
            [levelup, levelupData],
            [firstfocus, firstfocusData],
            [focusest, focusestData],
        ];

        return (
            <div className={`${styles.school} clearfix`}>
                <Chip
                    id="20068"
                    type="struct"
                    title="高手学堂标题"
                    groupName="高手学堂"
                    content={content.schoolTitle}
                    position="relative">
                    <HeadTitle>
                        <ResearchSearch />
                    </HeadTitle>
                </Chip>
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Chip
                            id="20069"
                            type="struct"
                            title="高手操盘日志标题"
                            groupName="高手学堂"
                            content={content.schoolSubTitle1}
                            position="relative">
                            <Caption />
                        </Chip>
                        {logsList.length > 0 ? <NewsList content={logsList} /> : ''}
                    </div>
                    <div className={styles.box}>
                        <Chip
                            id="20070"
                            type="struct"
                            title="股民学校标题"
                            groupName="高手学堂"
                            content={content.schoolSubTitle2}
                            position="relative">
                            <Caption />
                        </Chip>
                        {schoolList.length > 0 ? <NewsList content={schoolList} /> : ''}
                    </div>
                    <div className={styles.ad}>
                        <Ad content={content.schoolAd} styleName={styles.ad_box} />
                    </div>
                </div>
                <div className={styles.col_R}>
                    <div>
                        <Chip
                            id="20071"
                            type="struct"
                            title="明星分析师标题"
                            groupName="高手学堂"
                            content={starAnalystTitle}
                            position="relative">
                            <TableTitle />
                        </Chip>
                        <StarAnalyst tabs={starAnalystTitle.tabs} content={starAnalystData} />
                    </div>
                    <div className={styles.data_box}>
                        <Chip
                            id="20073"
                            type="struct"
                            title="研报选股标题"
                            groupName="高手学堂"
                            translate="jsonParse"
                            content={stockPickingTitle}
                            position="relative">
                            <TableTitle />
                        </Chip>
                        <StockPicking tabs={stockPickingTitle.tabs} content={stockPickingData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(School);
