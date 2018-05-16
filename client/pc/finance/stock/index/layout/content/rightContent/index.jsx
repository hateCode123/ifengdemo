import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Subject from './subject';
import Market from './market';
import Courier from './courier/';
import PlayItem from './playItem/';
import LinkList from './linkList/';
import DayStock from './dayStock/';
import { Ad } from '../../../../../../components/ad';
import RightSideTitle from '../../../components/rightSideTitle';

class RightContent extends React.PureComponent {
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
                <div className={styles.ad}>
                    <Ad content={content.rightSideAd} styleName={styles.ad_box} />
                </div>
                <Chip id="10084" type="static" title="跳转链接列表" groupName="正文" content={content.linkList}>
                    <LinkList />
                </Chip>
                <div className={styles.box}>
                    <Chip
                        id="10078"
                        type="static"
                        title="每日论股标题"
                        groupName="正文"
                        content={content.dayStockTitle}>
                        <RightSideTitle />
                    </Chip>
                    <Chip id="10081" type="static" title="每日论股" groupName="正文" content={content.dayStock}>
                        <DayStock />
                    </Chip>
                </div>
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
