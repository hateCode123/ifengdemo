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

import JueJin from './jueJin/';
import TaoJin from './taoJin/';
import Rediantuijian from './rediantuijian/';

import Cnlc from './cnlc/';
import Partner from './partner/';
import Bottom from './bottom/';

import Header from './header/';
import BottomFooter from './footer/';

import FixedBar from './fixedBar/';

class Layout extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    render() {
        const { content } = this.props;

        const headerData = {
            nav: content.nav,
            // topAd: content.topAd,
            // logo: content.logo,
            // logoAd: content.logo_ad,
        };

        const footerData = {
            // bottomAd: content.bottomAd,
            footer: content.footer,
        };

        return (
            <div>
                <Header content={headerData} />
                <Banner content={content} />
                <Navigation content={content.navigation} />
                <SubNavigation content={content.subNavigation} />

                <div className="space20 " />
                {/* <Collapse content={content.collapse} /> */}

                {/* todo 压顶动态碎片 */}
                <div className="w1000">
                    <div className="col" style={{ position: 'relative' }} />
                </div>

                <div className="w1000 clearfix">
                    <div className={style.l_left}>
                        <Slider content={content.slider} />
                        <NewsListDownSlider content={content.newsListDownSlider} />
                        <NewsListLeft content={content.newsListLeft} />
                    </div>
                    <div className={style.l_right}>
                        <div className="clearfix">
                            <TopLinkTable content={content.topLinkTable} />
                            <Market content={content.market} title={content.marketTitle} />
                        </div>
                        <div className="space27" />
                        <JueJin content={content} />
                        <TaoJin content={content} />
                        <Rediantuijian content={content} />
                    </div>
                </div>

                <Cnlc content={content} />
                <Partner content={content} />
                <Bottom content={content} />
                <BottomFooter content={footerData} />
                <FixedBar content={content.fixedBar} />

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
