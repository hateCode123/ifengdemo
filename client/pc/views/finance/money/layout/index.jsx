import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import { rel } from '../../../../../utils/rel';

import '../reset.css';
import style from './style.css';

import Navigation from './nav/';
import SubNavigation from './subnav/';
// import Collapse from './collapse/';
import NewsListDownSlider from './newsListDownSlider/';
import NewsListLeft from './newsListLeft/';
class Layout extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    state = {
        content: {
            navigation: [{ title: '财经首页', url: 'http://fdasfd/' }],
            subNavigation: [
                { title: '123', url: 'http://fdasfd/' },
                { title: '123', url: 'http://fdasfd/' },
                { title: '123', url: 'http://fdasfd/' },
            ],
            newsListDownSlider: [
                { title: '0绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '1绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '2绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '3绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '4绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '5绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '6绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '10绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '11绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '12绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '13绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '14绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '15绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '16绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
            ],
            newsListLeft: [
                { title: '0绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '1绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '2绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '3绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '4绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '5绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '6绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '10绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '11绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '12绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '13绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '14绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '15绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '16绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
                { title: '17绩规模双飙升 上海基金业为何能强势崛起', url: 'http://fdasfd/' },
            ],
        },
    };

    createMarkup = content => {
        return { __html: content };
    };
    render() {
        // todo  mockdata
        // const { content } = this.props;
        const { content } = this.state;
        /**
         * 导航
         */
        const nav = (
            <div className={style.g_col}>
                <div className={style.w1000}>
                    <Navigation content={content.navigation} />
                </div>
            </div>
        );

        /**
         * 二级导航
         */
        const subnav = (
            <div className={style.w1000}>
                <SubNavigation content={content.subNavigation} />
            </div>
        );

        /**
         * 理财产品
         */
        const topLinkTable = (
            <Chip
                id="10029"
                type="static"
                title="理财产品"
                groupName="首屏"
                content={this.props.content.topLinkTable.content}>
                <div
                    className={` ${style.caption01} ${style.w240} ${style.fl} `}
                    dangerouslySetInnerHTML={this.createMarkup(this.props.content.topLinkTable.content)}
                />
            </Chip>
        );

        /**
         * 理财超市
         */
        const marker = (
            <div className={`${style.bor} ${style.w300} ${style.fl}`}>
                <div className={style.title_02}>
                    <a href="http://18.ifeng.com" rel={rel}>
                        理财超市
                    </a>
                </div>
                <Chip
                    id="10035"
                    type="static"
                    title="理财超市"
                    groupName="首屏"
                    content={this.props.content.market.content}>
                    <div dangerouslySetInnerHTML={this.createMarkup(this.props.content.market.content)} />
                </Chip>
            </div>
        );

        return (
            <div>
                <div className={style.navCon}>
                    {nav}
                    {subnav}
                </div>
                <div className="space20 " />
                {/* <Collapse content={content.collapse} /> */}

                {/* todo <!--凰家理财超市开始--> */}
                <div className="w1000">
                    <div className="col" style={{ position: 'relative' }} />
                </div>
                {/*  <!--凰家理财超市结束--> */}
                {/* <!--首屏部分 begin--> */}
                <div className="w1000">
                    <div className={style.l_left}>
                        {/*todo  <!--焦点图--> */}
                        <div className={style.fpic06} />
                        {/* // id="tabSlide02" // onmouseover="onindex()" // onmouseout="outindex()" // cmpp-type="r" */}
                        <div className="space30" />
                        <NewsListDownSlider content={content.newsListDownSlider} />
                        <NewsListLeft content={content.newsListLeft} />
                    </div>
                    <div className={style.l_right}>
                        <div className="clearfix">
                            {topLinkTable}
                            {marker}
                        </div>
                        <div className="space27" />
                    </div>
                </div>

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
