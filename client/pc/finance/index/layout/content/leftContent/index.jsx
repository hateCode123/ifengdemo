import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Topic from './topic';
import BannerPic from './bannerPic';
import Headline from './headline';
import DateNews from './dateNews';

class LeftContent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_L}>
                <Topic />
                {content.bannerPic.length > 0 ? (
                    <Chip
                        id="30028"
                        type="struct"
                        title="焦点图广告权益"
                        groupName="焦点图广告权益"
                        position="relative"
                        content={content.bannerPic}>
                        <BannerPic />
                    </Chip>
                ) : (
                    ''
                )}
                <Headline content={content.headline} rights={content.rights} />
                <DateNews
                    content={content.dayNews}
                    extraNews={content.extraNews}
                    ad={content.dayNewsAd}
                    extraNewsAd={content.extraNewsAd}
                />
            </div>
        );
    }
}

export default LeftContent;
