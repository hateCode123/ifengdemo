import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import '../reset.css';
import styles from './layout.css';

import Navigation from './Navigation/';
import SimpleSlider from './slider/';
import HotNews from './hotNews/';
import AdAside from './adAside/';
import NewsList from './newslist/';
import GoTop from './goTop/';

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
        console.log(content)

        return (
            <div>
                <div>公用头部导航</div>
                <Navigation content={content.navigation} />

                <div className={`${styles.bodyCon } ${ styles.clearfix}`}>
                    <div className={styles.bodyMes}>

                        <div className={styles.bodyLeftCon}>
                            <SimpleSlider content={content.slider} />
                            <NewsList content={content.info} />
                        </div>


                        <div className={styles.bodyRightCon}>
                            <HotNews content={content.hotNews} />
                            <AdAside content={content.adAside} />
                        </div>

                    </div>
                </div>
                <div>底部版权</div>
                <GoTop />
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
