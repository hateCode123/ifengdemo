import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Headline from './headline/';
import NewsLive from './newsLive/';
import News from './news/';
import Answer from './answer/';
import { Ad } from '../../../../../../components/ad';

class LeftContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_L}>
                <Chip id="10162" type="static" title="头条新闻" groupName="正文" content={content.headline}>
                    <Headline />
                </Chip>
                <div className={styles.space10} />
                <NewsLive content={content.newsLive} />
                <div className={styles.space10} />
                <News content={content.news} />
                <div className={styles.space3} />
                <Answer content={content.answer} />
                <div className={styles.ad}>
                    <Ad content={content.leftAsideAd} styleName={styles.ad_box} />
                </div>
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
