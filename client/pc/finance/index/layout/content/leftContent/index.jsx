import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Topic from './topic';
import BannerPic from './bannerPic';
import Headline from './headline';
import DateNews from './dateNews';
import Recommend from './recommend';

class LeftContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_L}>
                <Topic />
                <Chip id="20002" type="recommend" title="焦点图" groupName="正文" content={content.bannerPic}>
                    <BannerPic />
                </Chip>
                <Chip id="20003" type="recommend" title="头条新闻" groupName="正文" content={content.headline}>
                    <Headline />
                </Chip>
                <DateNews content={content.dayNews} extraNews={content.extraNews} />
                <Chip id="20004" type="recommend" title="推荐" groupName="正文" content={content.recommend}>
                    <Recommend />
                </Chip>
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
