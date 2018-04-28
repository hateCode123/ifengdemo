import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HeadTitle from '../../components/headTitle/';
import { Ad } from '../../../../../components/ad';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';

class HotSpots extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const newsList = [
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '0 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '1 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '2 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '3 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '4 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '5 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '6 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '7 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '8 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '9 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '10 持股还是持币过春节？机构们几乎站在了同一战线',
            },
            {
                url: '//finance.ifeng.com/a/20180205/15968336_0.shtml',
                title: '11 持股还是持币过春节？机构们几乎站在了同一战线',
            },
        ];

        return (
            <div className={`${styles.hot_spots} clearfix`}>
                <HeadTitle content={content.hotSpotsTitle} />
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Caption content={content.hotSpotsSubTitle1} />
                        <NewsList content={newsList} limit={11} />
                    </div>
                    <div className={styles.box}>
                        <Caption content={content.hotSpotsSubTitle2} />
                        <NewsList content={newsList} limit={11} />
                    </div>
                    <div className={styles.ad}>
                        <Ad content={content.hotSpotsAd} styleName={styles.ad_box} />
                    </div>
                </div>
                <div className={styles.col_R} />
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
