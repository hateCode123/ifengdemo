import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import React from 'react';
import Chip from 'Chip';
import transform from 'chipDataTransform';
import '../reset.css';
import style from './style.css';
import Ad from '@ifeng/ui_pc_ad';
import Banner from './banner/';
import Navigation from './nav/';
import SubNavigation from './subnav/';

import TopLinkTable from './topLinkTable/';
import Market from './market/';
import Slider from './slider/';
import NewsListDownSlider from './newsListDownSlider/';

import JueJin from './juejin/';
import TaoJin from './taojin/';
import Rediantuijian from './rediantuijian/';

// import Cnlc from './cnlc/';
import Partner from './partner/';
import Bottom from './bottom/';

import Header from './header/';
import BottomFooter from './footer/';

import FixedBar from './fixedBar/';

import TopCollapse from './collapse/';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    // componentDidMount() {
    //     console.log('componentDidMount');
    //     this.setState({ showTopCollapse: true });
    // }
    render() {
        const { content } = this.props;

        const initData = {
            marketTitle: {
                title: '理财超市',
                url: 'http://18.ifeng.com/',
                newOpen: true,
            },

            __jingneijuejinTitle: {
                title: '境内掘金',
                more: [
                    // {
                    //     txt: '更多基金',
                    //     url: 'https://etrade.fengfd.com/',
                    //     newOpen: true,
                    //     icon: true,
                    // },
                ],
            },
            __sudiTitle01: {
                title: '理财速递',
            },

            __haiwaitaojinTitle: {
                title: '海外淘金',
                more: [
                    // {
                    //     txt: '更多基金',
                    //     url: '//etrade.fengfd.com/',
                    //     newOpen: true,
                    //     icon: true,
                    // },
                ],
            },
            __sudiTitle02: {
                title: '理财速递',
            },

            __rediantuijianTitle: {
                title: '热点推荐',
                more: [
                    // {
                    //     txt: '收益排行',
                    //     url: '//etrade.fengfd.com/list/',
                    //     newOpen: true,
                    //     icon: false,
                    // },
                    // {
                    //     txt: '最新净值',
                    //     url: '//etrade.fengfd.com/list/',
                    //     newOpen: true,
                    //     icon: false,
                    // },
                ],
            },
            __cnlcTitle: {
                title: '分析师答疑',
                more: [],
            },
            __partnerTitle: {
                title: '合作伙伴',
                more: [],
            },
        };
        const {
            marketTitle,
            __jingneijuejinTitle,
            __sudiTitle01,
            __sudiContent01,
            __haiwaitaojinTitle,
            __sudiTitle02,
            __sudiContent02,
            __rediantuijianTitle,
            __cnlcTitle,
            __partnerTitle,
            __bottomWeiXin,
            __bottomProc,
            __bottomLink,
        } = initData;

        console.log('content==', content);

        const headerData = {
            nav: content.nav,
            topAd: content.topAd,
        };

        const bannerData = {
            search: content.search,
            bannerLogo: content.bannerLogo,
        };

        const juejin = {
            jingneijuejinTitle: __jingneijuejinTitle,
            sudiTitle01: __sudiTitle01,
            sudiContent01: content.sudiContent01,
            jingneiQuanyiHotFunds: content.jingneiQuanyiHotFunds,
            jingneiHuobiHotFunds: content.jingneiHuobiHotFunds,
        };

        const taojin = {
            haiwaitaojinTitle: __haiwaitaojinTitle,
            sudiTitle02: __sudiTitle02,
            sudiContent02: content.sudiContent02,
            haiwaiHotfunds: content.haiwaiHotfunds,
        };

        const redian = {
            rediantuijianTitle: __rediantuijianTitle,
            rediantuijianTableStock: content.rediantuijianTableStock,
            rediantuijianTableMix: content.rediantuijianTableMix,
            rediantuijianTableZhishu: content.rediantuijianTableZhishu,
            rediantuijianTableZhaiquan: content.rediantuijianTableZhaiquan,
            rediantuijianTableMoney: content.rediantuijianTableMoney,
        };

        // const cnlc = {
        //     cnlcTitle: __cnlcTitle,
        //     cnlcJijin: content.cnlcJijin,
        //     // cnlcListJijin: content.cnlcListJijin,
        //     cnlcP2P: content.cnlcP2P,
        //     // cnlcListP2P: content.cnlcListP2P,
        //     cnlcTrust: content.cnlcTrust,
        //     // cnlcListTrust: content.cnlcListTrust,
        //     cnlcPrivate: content.cnlcPrivate,
        //     // cnlcListPrivate: content.cnlcListPrivate,
        //     cnlcFinance: content.cnlcFinance,
        //     // cnlcListFinance: content.cnlcListFinance,
        // };

        const partner = {
            partnerTitle: __partnerTitle,
            list: content.partnerlist,
        };

        const footerData = {
            bottomAd: content.bottomAd,
            footer: content.footer,
        };

        const topCollapse = {
            topCollapse: content.topCollapse,
        };

        const slider = content.slider || [];

        const __market = {
            title: marketTitle,
            content: content.market,
        };

        return (
            <div>
                <Header content={headerData} />
                <Banner content={bannerData} />
                <Navigation content={content.navigation} />
                <SubNavigation content={content.subNavigation} />

                <div className="space20 " />
                <Chip
                    id="10160"
                    type="static"
                    title="顶部隐藏广告"
                    groupName="广告"
                    translate="jsonParse"
                    content={topCollapse}>
                    <TopCollapse />
                    {/*  init={showTopCollapse} */}
                </Chip>
                <div className="w1000 clearfix">
                    <div className={style.l_left}>
                        <Slider content={slider} />
                        <NewsListDownSlider content={content.newsListDownSlider || []} />
                        <Ad content={content.infoAd} />
                    </div>
                    <div className={style.l_right}>
                        <div className="clearfix">
                            <TopLinkTable content={content.topLinkTable} />
                            <Market content={__market} />
                        </div>
                        <div className="space27" />
                        <JueJin content={juejin} />
                        <TaoJin content={taojin} />
                        <Rediantuijian content={redian} />
                    </div>
                </div>

                {/* <Cnlc content={cnlc} /> */}
                <Ad content={content.hardAd} />
                <Partner content={partner} />
                <Bottom content={content.bottom} />
                <BottomFooter content={footerData} />
                <FixedBar />

                <ChipEdit transform={transform} />
            </div>
        );
    }
}

export default Layout;
