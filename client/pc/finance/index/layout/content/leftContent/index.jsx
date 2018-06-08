import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Topic from './topic';
import BannerPic from './bannerPic';
import Headline from './headline';
import DateNews from './dateNews';

class LeftContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_L}>
                <Topic />
                <BannerPic content={content.bannerPic.slice(0, 5)} />
                <Headline content={content.headline} rights={content.rights} limit={6} />
                <DateNews content={content.dayNews} extraNews={content.extraNews} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
LeftContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
LeftContent.defaultProps = {};

export { LeftContent };
export default LeftContent;
