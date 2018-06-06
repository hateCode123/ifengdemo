import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import React from 'react';

import '../reset.css';
import style from './style.css';

import Banner from './banner/';
import Navigation from './nav/';
import SubNavigation from './subnav/';

import TopLinkTable from './topLinkTable/';
import Market from './market/';

// import Collapse from './collapse/';
import Slider from './slider/';
import NewsListDownSlider from './newsListDownSlider/';
import NewsListLeft from './newsListLeft/';

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
    /**
     * 渲染网页布局
     */
    state = {
        showTopCollapse: false,
        subNavigation: [
            {
                url: 'http://jr.ifeng.com/',
                title: '凤凰金融',
            },
            {
                url: 'http://ds.ifeng.com/',
                title: '报名炒股大赛赢百万奖金',
            },
            {
                url: 'http://finance.ifeng.com/app/hq/',
                title: '基金行情',
            },
        ],

        marketTitle: {
            title: '理财超市',
            url: 'http://18.ifeng.com/',
            newOpen: true,
        },

        __jingneijuejinTitle: {
            title: '境内掘金',
            more: [
                {
                    txt: '更多基金',
                    url: 'https://etrade.fengfd.com/',
                    newOpen: true,
                    icon: true,
                },
            ],
        },
        __sudiTitle01: {
            title: '理财速递',
        },
        __sudiContent01: {
            first: {
                url: 'https://etrade.fengfd.com/detail/180012',
                title: '银华富裕主题混合',
                txt: '近一年涨幅：',
                perc: '53.95%',
                buyLink: 'https://etrade.fengfd.com/detail/180012',
                buyTxt: '购买',
            },
            second: {
                url: 'https://etrade.fengfd.com/detail/001878/',
                title: '嘉实沪港深精选股票',
                txt: '近一年涨幅：',
                perc: '47.46%',
                buyLink: 'https://etrade.fengfd.com/detail/210004',
                buyTxt: '购买',
            },
            third: {
                url: 'https://etrade.fengfd.com/detail/217027/',
                title: '招商央视财经50指数A',
                txt: '近一年涨幅：',
                perc: '47.84%',
                recTitle: '推荐理由：',
                recTxt: '中国“漂亮A50”崛起，长期价值投资的典范。',
                buyLink: 'https://etrade.fengfd.com/detail/217027/',
                buyTxt: '购买',
            },
        },

        __haiwaitaojinTitle: {
            title: '海外淘金',
            more: [
                {
                    txt: '更多基金',
                    url: '//etrade.fengfd.com/',
                    newOpen: true,
                    icon: true,
                },
            ],
        },
        __sudiTitle02: {
            title: '理财速递',
        },
        __sudiContent02: {
            first: {
                url: '//etrade.fengfd.com/detail/000988',
                title: '嘉实全球互联网',
                txt: '近一年涨幅：',
                perc: '22.85%',
                buyLink: '//etrade.fengfd.com/detail/217023',
                buyTxt: '购买',
            },
            second: {
                url: '//etrade.fengfd.com/detail/000311',
                title: '景顺长城沪深300',
                txt: '近一年涨幅：',
                perc: '15.72%',
                buyLink: '//etrade.fengfd.com/detail/180028',
                buyTxt: '购买',
            },
            third: {
                url: '//etrade.fengfd.com/detail/164705',
                title: '汇添富恒生指数分级',
                txt: '近一年涨幅：',
                perc: '11.20%',
                recTitle: '推荐理由：',
                recTxt: '享受港股牛市，内地资金南下狩猎低估值港股市场。',
                buyLink: '//etrade.fengfd.com/detail/164705',
                buyTxt: '购买',
            },
        },

        __rediantuijianTitle: {
            title: '热点推荐',
            more: [
                {
                    txt: '收益排行',
                    url: '//etrade.fengfd.com/list/',
                    newOpen: true,
                    icon: false,
                },
                {
                    txt: '最新净值',
                    url: '//etrade.fengfd.com/list/',
                    newOpen: true,
                    icon: false,
                },
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
    componentDidMount() {
        console.log('componentDidMount');
        this.setState({ showTopCollapse: true });
    }
    render() {
        const { content } = this.props;
        const {
            subNavigation,
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
        } = this.state;
        console.log('content', content);

        const headerData = {
            nav: content.nav,
            topAd: content.topAd,
        };

        const bannerData = {
            search: content.search,
        };

        const juejin = {
            jingneijuejinTitle: __jingneijuejinTitle,
            sudiTitle01: __sudiTitle01,
            sudiContent01: __sudiContent01,
            jingneiQuanyiHotFunds: content.jingneiQuanyiHotFunds,
            jingneiHuobiHotFunds: content.jingneiHuobiHotFunds,
        };

        const taojin = {
            haiwaitaojinTitle: __haiwaitaojinTitle,
            sudiTitle02: __sudiTitle02,
            sudiContent02: __sudiContent02,
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
        };

        const footerData = {
            bottomAd: content.bottomAd,
            footer: content.footer,
        };

        const topCollapse = {
            topCollapse: content.topCollapse,
        };

        return (
            <div>
                <Header content={headerData} />
                <Banner content={bannerData} />
                <Navigation content={content.navigation} />
                <SubNavigation content={subNavigation} />

                <div className="space20 " />

                <TopCollapse content={topCollapse} init={this.state.showTopCollapse} />

                <div className="w1000 clearfix">
                    <div className={style.l_left}>
                        <Slider content={content.slider} />
                        <NewsListDownSlider content={content.newsListDownSlider} />
                        <NewsListLeft content={content.newsListLeft} />
                    </div>
                    <div className={style.l_right}>
                        <div className="clearfix">
                            <TopLinkTable />
                            <Market title={marketTitle} />
                        </div>
                        <div className="space27" />
                        <JueJin content={juejin} />
                        <TaoJin content={taojin} />
                        <Rediantuijian content={redian} />
                    </div>
                </div>

                {/* <Cnlc content={cnlc} /> */}
                <Partner content={partner} />
                <Bottom />
                <BottomFooter content={footerData} />
                <FixedBar />

                <ChipEdit />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Layout.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Layout.defaultProps = {};

export default Layout;
