import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header';
import Logo from './logo';
import Tools from './tools';
import Shares from './shares';
import NewsDisplay from './news-display';

class Layout extends PureComponent {
    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;
        const headerData = {
            nav: content.nav
        };

        return (
            <Fragment>
                <ChipEdit />
                {/* 顶部导航 */}
                <Header content={ headerData } />
                {/* logo和时钟 */}
                <Logo />
                {/* 日历、直播、搜索 */}
                <Tools />
                <div className={ `${ styles.main } clearfix` }>
                    {/* 股票信息 */}
                    <Shares />
                    <div className={ styles.main_middle }>
                        {/* 新闻展示 */}
                        <NewsDisplay />
                    </div>
                </div>
            </Fragment>
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

export { Layout };
export default Layout;