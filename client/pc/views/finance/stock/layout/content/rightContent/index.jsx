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

class RightContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_R}>
                <Subject content={content.subject} />
                <div className="clear" />
                <Market content={content.market} />
                <Courier content={content.courier} />
                <PlayItem content={content.playItem} />
                <div className={styles.ad}>
                    <Ad content={content.rightSideAd} styleName={styles.ad_box} />
                </div>
                <LinkList content={content.linkList} />
                <DayStock content={content.dayStock} />
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
