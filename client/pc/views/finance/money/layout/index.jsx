import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import React from 'react';
import '../reset.css';
import JueJin from './jueJin/';
import Market from './market/';
import Navigation from './nav/';
// import Collapse from './collapse/';
import NewsListDownSlider from './newsListDownSlider/';
import NewsListLeft from './newsListLeft/';
import Rediantuijian from './rediantuijian/';
import style from './style.css';
import SubNavigation from './subnav/';
import TaoJin from './taoJin/';
import TopLinkTable from './topLinkTable/';
import Cnlc from './cnlc/';

class Layout extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    render() {
        const { content } = this.props;

        // const { content } = this.state;
        /**
         * 导航
         */
        const nav = (
            <div className="g_col">
                <div className="w1000">
                    <Navigation content={content.navigation} />
                </div>
            </div>
        );

        /**
         * 二级导航
         */
        const subnav = (
            <div className="w1000">
                <SubNavigation content={content.subNavigation} />
            </div>
        );

        return (
            <div>
                {nav}
                {subnav}

                <div className="space20 " />
                {/* <Collapse content={content.collapse} /> */}

                {/* todo <!--凰家理财超市开始--> */}
                <div className="w1000">
                    <div className="col" style={{ position: 'relative' }} />
                </div>
                {/*  <!--凰家理财超市结束--> */}
                {/* <!--首屏部分 begin--> */}
                <div className="w1000 clearfix">
                    <div className={style.l_left}>
                        {/*todo  <!--焦点图--> */}
                        <div className={style.fpic06} />
                        {/* // id="tabSlide02" // onmouseover="onindex()" // onmouseout="outindex()" // cmpp-type="r" */}

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
