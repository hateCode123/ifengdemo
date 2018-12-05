import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import { addEventListener } from '@ifeng/ui_base';
import Navigation from './navigation';
import Stock from './stock';
import Content from './content';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    componentDidMount() {
        // 上报首屏时间
        if (window && window.BJ_REPORT) window.BJ_REPORT.firstScreen();
        this.unHandleClick = addEventListener(document, 'click', this.handleClick);
    }

    componentWillUnmount() {
        this.unHandleClick();
    }

    // 全站渠道标记传递，文章页的任意跳转
    handleClick = e => {
        const tag = this.getATag(e.target);

        if (!tag) return;

        let localHref = tag.attributes['href'] ? tag.attributes['href'].value : '';

        if (
            localHref &&
            localHref !== 'undefined' &&
            localHref !== '' &&
            localHref !== '#' &&
            localHref.indexOf('javascript:') === -1
        ) {
            localHref = localHref.trim();

            tag.setAttribute('href', `${localHref}?_zbs_maxthon_cj`);
        }
    };

    getATag = tag => {
        if (!tag) {
            return null;
        }

        if (tag.tagName !== 'A') {
            return this.getATag(tag.parentElement);
        } else {
            return tag;
        }
    };

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;
        const contentData = {
            leftContent: {
                bannerPic: content.bannerPic,
                headline: content.headline,
                rights: content.rights,
                dayNews: content.dayNews,
                dayNewsAd: content.dayNewsAd,
                extraNews: content.extraNews,
                extraNewsAd: content.extraNewsAd,
            },
            middleContent: {
                comicBook: content.comicBook,
                talking: content.talking,
                finance: content.finance,
                financeList: content.financeList,
                stocks: content.stocks,
            },
            info: {
                infoAd: content.infoAd,
                hardAd: content.hardAd,
            },
            middleAd: content.middleAd,
            rightContent: {
                asideAd1: content.asideAd1,
                asideAd2: content.asideAd2,
                asideAd3: content.asideAd3,
                asideAd4: content.asideAd4,
                asideAd5: content.asideAd5,
                asideAd6: content.asideAd6,
                asideAd7: content.asideAd7,
                financeVideo: content.financeVideo,
                financeVideoAd: content.financeVideoAd,
                institute: content.institute,
                lark: content.lark,
                meeting: content.meeting,
                meetingAd: content.meetingAd,
                meetingListAd: content.meetingListAd,
                market: content.market,
                marketAd: content.marketAd,
                courier: content.courier,
                courierAd: content.courierAd,
            },
        };

        return (
            <div className={styles.ip_col}>
                <Chip
                    id="20008"
                    type="struct"
                    title="财经导航"
                    groupName="导航栏"
                    position="relative"
                    content={content.navigation}>
                    <Navigation />
                </Chip>
                <Stock content={content.production} />
                <Content content={contentData} />
                <ChipEdit transform={transform} />
            </div>
        );
    }
}

export default Layout;
