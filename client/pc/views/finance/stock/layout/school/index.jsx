import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HeadTitle from '../../components/headTitle/';
import { Ad } from '../../../../../components/ad';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';

class School extends React.PureComponent {
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
        ];

        return (
            <div className={`${styles.school} clearfix`}>
                <HeadTitle content={content.schoolTitle}>
                    <div className={styles.search}>研报搜索</div>
                </HeadTitle>
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Caption content={content.schoolSubTitle1} />
                        <NewsList content={newsList} limit={6} />
                    </div>
                    <div className={styles.box}>
                        <Caption content={content.schoolSubTitle2} />
                        <NewsList content={newsList} limit={6} />
                    </div>
                    <div className={styles.ad}>
                        <Ad content={content.schoolAd} styleName={styles.ad_box} />
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
School.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
School.defaultProps = {};

export { School };
export default School;
