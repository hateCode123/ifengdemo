import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import './reset.css';
import styles from './layout.css';
import Header from './components/header/';
import Hot from './components/hot/';
import Article from './components/article/';
import FinancialRecommend from './components/financialRecommend/';
import Comment from './components/comment/';
import AdMid from './components/adMid/';
import RecommandMid from './components/recommendMid/';
import AdGameMid from './components/adGameMid/';
import AdAside from './components/adAside/';
import ChannelRecommend from './components/channelRecommend/';
import VideoRecommend from './components/videoRecommend/';
import WealthRecommend from './components/wealthRecommend/';
import WirelessRecommend from './components/wirelessRecommend/';
import Weixin from './components/weixin/';
import Footer from './components/footer/';
import Ad from './commons/ad/';

/**
 * 网页布局
 */
class Layout extends React.Component {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.space40} />
                <div className={styles.layout}>
                    <div className={styles.hot}>
                        <Hot content={content.hot} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.main}>
                            <Article
                                content={content.article}
                                qrCode={content.qrCode}
                                ad={content.articleAd}
                                recommendArtical={content.mainTuiguang}
                            />
                            <FinancialRecommend />
                            <Comment />
                            <Ad styleName={styles.adMidBox} content={content.admid1} />
                            <Ad styleName={styles.adMidBox} content={content.admid2} />
                            <RecommandMid content={content.recommendMid} />
                            <Ad styleName={styles.adGamebox} content={content.adGameMid} />
                            <Ad styleName={styles.adMidBox} content={content.admid3} />
                        </div>
                        <div className={styles.aside}>
                            <Ad styleName={styles.adAsideBox} content={content.adaside1} />
                            <Chip
                                id={content.recommendNews.id}
                                type="recommend"
                                title={content.recommendNews.name}
                                groupName="侧栏"
                                content={JSON.parse(content.recommendNews.data)}>
                                <ChannelRecommend />
                            </Chip>
                            <Ad styleName={styles.adAsideBox} content={content.adaside2} />
                            <Weixin />
                            <Ad styleName={styles.adAsideBox} content={content.adaside3} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside4} />
                            <VideoRecommend content={content.videoRecommand} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside5} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside6} />
                            <WealthRecommend content={content.wealthRecommand} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside7} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside8} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside9} />
                            <WirelessRecommend content={content.wirelessRecommand} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside10} />
                            <Ad styleName={styles.adAsideBox} content={content.adaside11} />
                        </div>
                    </div>
                </div>
                <Footer content={content.footer} />
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
