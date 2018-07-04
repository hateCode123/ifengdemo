import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Subject from './subject';
import Market from './market';
import Courier from './courier/';
import PlayItem from './playItem/';
import DayStock from './dayStock/';
import { Ad } from '../../../../../../components/ad';
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
                    <Chip id="10076" type="static" title="热点专题标题" groupName="正文" content={content.subjectTitle}>
                        <RightSideTitle />
                    </Chip>
                    <Chip id="10079" type="static" title="热点专题" groupName="正文" content={content.subject}>
                        <Subject />
                    </Chip>
                </div>
                <div className="clear" />
                <div>
                    <Chip id="10077" type="static" title="理财超市标题" groupName="正文" content={content.marketTitle}>
                        <RightSideTitle />
                    </Chip>
                    <Chip id="10080" type="static" title="理财超市" groupName="正文" content={content.market}>
                        <Market />
                    </Chip>
                </div>
                <Courier content={content.courier} />
                <Chip id="10083" type="static" title="视频播放项" groupName="正文" content={content.playItem}>
                    <PlayItem />
                </Chip>
                <div className={styles.ad0}>
                    <Ad content={content.rightSideAd} styleName={styles.ad_box0} />
                </div>
                <div className={styles.ad1}>
                    <Ad content={content.rightSideAd} styleName={styles.ad_box1} />
                </div>
                <div className={styles.box}>
                    <Chip id="20040" type="recommend" title="每日论股" groupName="正文" content={content.dayStock}>
                        <DayStock />
                    </Chip>
                </div>
            </div>
        );
    }
}

export default RightContent;
