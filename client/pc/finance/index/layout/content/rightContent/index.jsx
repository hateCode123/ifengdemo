import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Ad } from '../../../../../components/ad';
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

        return (
            <div className={styles.col_R}>
                <BoxTitle url="#" title="财经视频" />
                <FinanceVideo content={content.financeVideo} />
                <Ad content={content.asideAd1} styleName={styles.box_1} />
                <div className={styles.box_finance}>
                    <BoxTitle url="#" title="财经智库" />
                    <ul className={`${styles.list} clearfix`}>
                        <ThinkTank tip="研究院" content={content.institute} />
                        <ThinkTank tip="国子策" content={content.lark} />
                    </ul>
                </div>
                <Ad content={content.asideAd2} styleName={styles.box_2} />
                <div className={styles.meeting}>
                    <BoxTitle url="//finance.ifeng.com/zhuanti/" title="专题·会议" />
                    <Meeting content={content.meeting} />
                </div>
                <div className={styles.ad_box}>
                    <Ad content={content.asideAd3} styleName={styles.box_3} />
                    <Ad content={content.asideAd4} styleName={styles.box_4} />
                </div>
                <Chip id="10014" type="static" title="理财超市静态碎片" groupName="正文" content={content.market}>
                    <Market />
                </Chip>
                <Ad content={content.asideAd5} styleName={styles.box_5} />
                <Chip id="10016" type="static" title="理财速递静态碎片" groupName="正文" content={content.courier}>
                    <Courier />
                </Chip>
                <Ad content={content.asideAd6} styleName={styles.box_6} />
                <Ad content={content.asideAd7} styleName={styles.box_7} />
            </div>
        );
    }
}

export default RightContent;
