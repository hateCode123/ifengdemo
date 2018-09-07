import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import Subject from './subject';
import Market from './market';
import Courier from './courier/';
import PlayItem from './playItem/';
import DayStock from './dayStock/';
import RightSideTitle from '../../../components/rightSideTitle';

class RightContent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_R}>
                <div className={styles.box}>
                    <Chip
                        id="10076"
                        type="static"
                        title="热点专题标题"
                        groupName="正文"
                        translate="jsonParse"
                        content={content.subjectTitle}
                        position="relative">
                        <RightSideTitle />
                    </Chip>
                    <Subject content={content.subject} />
                </div>
                <div className="clear" />
                <Chip
                    id="10077"
                    type="static"
                    title="投教学堂标题"
                    groupName="正文"
                    translate="jsonParse"
                    content={content.marketTitle}
                    position="relative">
                    <RightSideTitle />
                </Chip>
                <Chip
                    id="10080"
                    type="static"
                    title="投教学堂"
                    groupName="正文"
                    content={content.market}
                    position="relative">
                    <Market />
                </Chip>
                <Courier content={content.courier} />
                <Chip
                    id="10083"
                    type="static"
                    title="视频播放项"
                    groupName="正文"
                    translate="jsonParse"
                    content={content.playItem}
                    position="relative">
                    <PlayItem />
                </Chip>
                <div className={styles.ad0}>
                    <Ad content={content.rightSideAd0} styleName={styles.ad_box0} />
                </div>
                <div className={styles.ad1}>
                    <Ad content={content.rightSideAd1} styleName={styles.ad_box1} />
                </div>
                <div className={styles.box}>
                    <Chip
                        id="20040"
                        type="recommend"
                        title="每日论股"
                        groupName="正文"
                        content={content.dayStock}
                        translate="handleDayStockData"
                        position="relative">
                        <DayStock />
                    </Chip>
                </div>
            </div>
        );
    }
}

export default RightContent;
