import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import LeftContent from './leftContent/';
import BannerPic from './bannerPic';
import RightContent from './rightContent';
import MiddleContent from './middleContent';

class Content extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col}>
                <LeftContent content={content.leftContent} />
                <div className={styles.col_R}>
                    <Chip id="10075" type="static" title="焦点图" groupName="正文" content={content.bannerPic}>
                        <BannerPic />
                    </Chip>
                    <div className="clearfix">
                        <MiddleContent content={content.middleContent} />
                        <RightContent content={content.rightContent} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Content.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Content.defaultProps = {};

export { Content };
export default Content;
