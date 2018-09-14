import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import PropTypes from 'prop-types';
import '../reset.css';
import styles from './index.css';

import Navigation from './Navigation/';
import SimpleSlider from './slide/';
import HotNews from './hotNews/';
import AdAside from './adAside/';
import NewsList from './newslist/';
import GoTop from './goTop/';
import Header from './header';
import BottomFooter from './footer';

/*
import Header from './components/header/';
import Footer from './components/footer/';
*/

class Layout extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;

        const headerData = {
            nav: content.nav,
            logo: content.logo,
        };

        const hotNewsData = {
            hotNewsTitle: content.hotNewsTitle,
            hotNews: content.hotNews,
        };

        const footerData = {
            copyright: content.copyright,
        };

        return (
            <div>
                <Header content={headerData} />
                <Navigation content={content.navigation} />

                <div className={styles.bodyCon}>
                    <div className={styles.bodyMes}>
                        <div className={styles.bodyLeftCon}>
                            <Chip
                                id="20034"
                                type="struct"
                                title="轮播"
                                groupName="leftContent"
                                content={content.slider}>
                                <SimpleSlider />
                            </Chip>
                            <Chip
                                id="20031"
                                type="struct"
                                title="新闻列表"
                                groupName="leftContent"
                                content={content.info}>
                                <NewsList />
                            </Chip>
                        </div>

                        <div className={styles.bodyRightCon}>
                            <HotNews content={hotNewsData} />
                            <AdAside content={content.adAside1} />
                            <AdAside content={content.adAside2} />
                            <AdAside content={content.adAside3} />
                            <AdAside content={content.adAside4} />
                            <AdAside content={content.adAside5} />
                        </div>
                    </div>
                </div>
                <BottomFooter content={footerData} />
                <GoTop />
                <ChipEdit transform={transform} />
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
