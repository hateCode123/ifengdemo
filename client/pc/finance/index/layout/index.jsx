import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import { addEventListener } from '@ifeng/ui_base';
import Header from './header';
import Navigation from './navigation';
import Stock from './stock';
import Content from './content';
import BottomFooter from './footer';
import Cooperation from './cooperation';
import QrCode from './qrCode';
import BottomAffix from './bottomAffix';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    componentDidMount() {
        this.unHandleClick = addEventListener(document, 'click', this.handleClick);
    }

    componentWillUnmount() {
        this.unHandleClick();
    }

    // 全站渠道标记传递，文章页的任意跳转
    handleClick = e => {
        const tag = this.getATag(e.target);

        if (!tag) return;

        let localHref =
            (tag.attributes['sign-trs-href'] ? tag.attributes['sign-trs-href'].value : '') ||
            (tag.attributes['href'] ? tag.attributes['href'].value : '');

        if (
            localHref &&
            localHref !== 'undefined' &&
            localHref !== '' &&
            localHref !== '#' &&
            localHref.indexOf('javascript:') === -1
        ) {
            localHref = localHref.trim();
            const localSearch = location.search;
            const localHash = location.hash;

            tag.setAttribute('sign-trs-href', localHref);

            let newUrl = '';
            let inWhitelist = false;
            const whitelist = ['//dol.deliver.ifeng.com/'];

            for (let i = 0, len = whitelist.length; i < len; i++) {
                if (localHref.indexOf(whitelist[i]) > -1) {
                    inWhitelist = true;
                }
            }
            // 传递下划线开头的统计
            const curSrc = this.getParam(localSearch, localHash);

            if ((localSearch || localHash) && curSrc && !inWhitelist) {
                if (localHref.indexOf('?') > -1) {
                    newUrl = `${localHref}&${curSrc}`;
                } else {
                    newUrl = `${localHref}?${curSrc}`;
                }

                tag.setAttribute('href', newUrl);
            }
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

    getSign = (localSearch, ret) => {
        const localSearchArr = localSearch.split('#');

        for (let i = 0; i < localSearchArr.length; i++) {
            const localParam = localSearchArr[i];

            if (localParam.indexOf('_') === -1) continue;

            const localParamArr = localParam.split('?');

            for (let j = 0; j < localParamArr.length; j++) {
                const localParam2 = localParamArr[j];

                if (localParam2.indexOf('_') === -1) continue;

                const localParam2Arr = localParam2.split('&');

                for (let m = 0; m < localParam2Arr.length; m++) {
                    const localParam3 = localParam2Arr[m];

                    if (localParam3.indexOf('_') === -1) continue;

                    const localParam3Arr = localParam3.split('|');

                    for (let k = 0; k < localParam3Arr.length; k++) {
                        const localParam4 = localParam3Arr[k];

                        if (localParam4.indexOf('_') !== 0) continue;

                        if (ret === '') {
                            ret += localParam4;
                        } else {
                            ret = `${ret}&${localParam4}`;
                        }
                    }
                }
            }
        }

        return ret;
    };

    getParam = (localSearch, localHash) => {
        let ret = '';

        if (localSearch.indexOf('_zbs') > -1) {
            ret = this.getSign(localSearch, ret);
        }
        if (localHash.indexOf('_zbs') > -1) {
            ret = this.getSign(localHash, ret);
        }

        return ret;
    };

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;
        const headerData = {
            nav: content.nav,
            search: content.search,
            topAd: content.topAd,
            logo: content.logo,
            logoAd: content.logoAd,
            channelAd: content.channelAd,
        };
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
                infoTitle: content.infoTitle,
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
        const footerData = {
            bottomAd: content.bottomAd,
            footer: content.footer,
        };
        const cooperation = content.cooperation;
        const qrCode = content.qrCode;
        const bottomAffixData = {
            floatAd1: content.floatAd1,
            floatAd2: content.floatAd2,
            floatAd3: content.floatAd3,
            floatAd4: content.floatAd4,
            floatAd5: content.floatAd5,
            floatAd6: content.floatAd6,
        };

        return (
            <div className={styles.ip_col}>
                <Header content={headerData} />
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
                <Chip
                    id="10015"
                    type="static"
                    title="底部合作链接"
                    groupName="底部合作链接"
                    position="relative"
                    content={cooperation}>
                    <Cooperation />
                </Chip>
                <BottomFooter content={footerData} />
                <div className={styles.bottom} />
                <Chip id="20013" type="struct" title="二维码" groupName="二维码" position="relative" content={qrCode}>
                    <QrCode />
                </Chip>
                <BottomAffix content={bottomAffixData} />
                <ChipEdit transform={transform} />
            </div>
        );
    }
}

export default Layout;
