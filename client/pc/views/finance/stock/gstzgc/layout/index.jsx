import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import '../reset.css';
import styles from './index.css';

import TopAd from './topAd/';
import Navigation from './navigation/';
import Zhibo from './zhibo/';
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

        console.log(content);

        return (
            <div>
                <div>公用顶部导航</div>
                <div>公用顶部搜索</div>
                <div className={styles.col_w1000}>
                    <TopAd content={content.topAd} />
                    {/* A股 导航 */}
                    <Navigation content={content.navigation} />
                </div>

                <div className={styles.col_w1000}>
                    <div className={styles.fl}>
                        <Zhibo />
                        {/* 左侧zhibo */}
                        {/* 左侧toutiao */}
                    </div>

                    {/* 右侧 */}
                </div>
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
