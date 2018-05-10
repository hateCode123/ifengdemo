import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Ad } from '../../../../../../components/ad/';
import BoxTitle from './boxTitle/';
import FinanceVideo from './financeVideo';
import ThinkTank from './thinkTank/';
import Meeting from './meeting/';
import Market from './market/';
import Courier from './courier/';

class RightContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const titleAd = {
            content: content.titleAd,
            id: '10012',
            type: 'static',
            title: '财经视频广告',
            groupName: '正文',
        };

        /**
         * 国子策数据源不确定，先用推荐位代替
         */
        return (
            <div className={styles.col_R}>
                <BoxTitle url="#" title="财经视频" titleAd={titleAd} />
                <FinanceVideo content={content.financeVideo} />
                <Ad content={content.asideAd1} styleName={styles.box_1} />
                <div className={styles.box_finance}>
                    <BoxTitle url="#" title="财经智库" />
                    <ul className={`${styles.list} clearfix`}>
                        <Chip id="20008" type="recommend" title="研究院" groupName="正文" content={content.institute}>
                            <ThinkTank tip="研究院" />
                        </Chip>
                        <ThinkTank tip="国子策" />
                    </ul>
                </div>
                <Ad content={content.asideAd2} styleName={styles.box_2} />
                <div className={styles.meeting}>
                    <BoxTitle url="//finance.ifeng.com/zhuanti/" title="专题·会议" />
                    <Meeting content={content.meeting} />
                </div>
                <div className={styles.ad_box}>
                    <Ad content={content.asideAd3} styleName={styles.box_3} />
                </div>
                <Chip id="10014" type="static" title="理财超市" groupName="正文" content={content.market}>
                    <Market />
                </Chip>
                <Ad content={content.asideAd4} styleName={styles.box_4} />
                <Chip id="10016" type="static" title="理财速递" groupName="正文" content={content.courier}>
                    <Courier />
                </Chip>
                <Ad content={content.asideAd5} styleName={styles.box_5} />
                <Ad content={content.asideAd6} styleName={styles.box_6} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
RightContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
RightContent.defaultProps = {};

export { RightContent };
export default RightContent;
