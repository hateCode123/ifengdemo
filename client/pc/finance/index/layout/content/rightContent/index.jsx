import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import BoxTitle from './boxTitle/';
import FinanceVideo from './financeVideo';
import ThinkTank from './thinkTank/';
import Meeting from './meeting/';
import Market from './market/';
import Courier from './courier/';

class RightContent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const data = {
            financeVideo: content.financeVideo,
            financeVideoAd: content.financeVideoAd,
        };

        return (
            <div className={styles.col_R}>
                {content.financeVideo.length > 0 ? (
                    <React.Fragment>
                        <BoxTitle url="#" title="财经推荐" />
                        <Chip
                            id="55016"
                            type="recommend"
                            title="财经推荐"
                            groupName="正文"
                            position="relative"
                            translate="handleFinanceVideoData"
                            content={data}>
                            <FinanceVideo />
                        </Chip>
                    </React.Fragment>
                ) : (
                    ''
                )}
                <Ad content={content.asideAd1} styleName={styles.box_1} />
                <div className={styles.box_finance}>
                    <BoxTitle url="#" title="策划 · 智库" />
                    <ul className={`${styles.list} clearfix`}>
                        <ThinkTank tip="研究院" content={content.institute} />
                        <ThinkTank tip="国子策" content={content.lark} />
                    </ul>
                </div>
                <Ad content={content.asideAd2} styleName={styles.box_2} />
                <div className={styles.meeting}>
                    <BoxTitle url="//finance.ifeng.com/zhuanti/" title="专题 · 会议">
                        <Ad content={content.meetingAd} styleName={styles.meetingAd} />
                    </BoxTitle>
                    <Meeting content={content.meeting} ad={content.meetingListAd} />
                </div>
                <div className={styles.ad_box}>
                    <Ad content={content.asideAd3} styleName={styles.box_3} />
                    <Ad content={content.asideAd4} styleName={styles.box_4} />
                </div>
                <div className={styles.market}>
                    <BoxTitle title="投教学堂">
                        <Ad content={content.marketAd} styleName={styles.marketAd} />
                    </BoxTitle>
                    <Chip
                        id="10080"
                        type="static"
                        title="投教学堂静态碎片"
                        groupName="正文"
                        position="relative"
                        content={content.market}>
                        <Market />
                    </Chip>
                </div>
                <Ad content={content.asideAd5} styleName={styles.box_5} />
                <Chip
                    id="10082"
                    type="static"
                    title="理财速递静态碎片"
                    groupName="正文"
                    position="relative"
                    content={content.courier}>
                    <Courier ad={content.courierAd} />
                </Chip>
                <Ad content={content.asideAd6} styleName={styles.box_6} />
                <Ad content={content.asideAd7} styleName={styles.box_7} />
            </div>
        );
    }
}

export default RightContent;
