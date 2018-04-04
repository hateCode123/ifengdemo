import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import './reset.css';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';

import Header from './components/header/';
import Hot from './components/hot/';
import Article from './components/article/index.jsx';
import FinancialRecommend from './components/financialRecommend/index.jsx';
import Comment from './components/comment/index.jsx';
import AdMid from './components/adMid/index.jsx';
import RecommandMid from './components/recommendMid/index.jsx';
import AdGameMid from './components/adGameMid/index.jsx';
import AdAside from './components/adAside/index.jsx';
import ChannelRecommend from './components/channelRecommend/index.jsx';
import VideoRecommend from './components/videoRecommend/index.jsx';
import WealthRecommend from './components/wealthRecommend/index.jsx';
import WirelessRecommend from './components/wirelessRecommend/index.jsx';
import Weixin from './components/weixin/index.jsx';
import Footer from './components/footer/index.jsx';

const recommendNews = JSON.parse(__jsonData__.recommendNews);
const recommendVideos = JSON.parse(__jsonData__.recommendVideos);
const mainTuiguang = JSON.parse(__jsonData__.mainTuiguang);

const render = function() {
    ReactDOM.render(
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.space40} />
            <div className={styles.layout}>
                <div className={styles.hot}>
                    <Hot content={jsonData.hot} />
                </div>
                <div className={styles.right}>
                    <div className={styles.main}>
                        <Article
                            content={jsonData.article}
                            qrCode={jsonData.qrCode}
                            ad={jsonData.articleAd}
                            recommendArtical={mainTuiguang}
                        />
                        <FinancialRecommend/>
                        <Comment/>
                        <AdMid content={jsonData.admid1}/>
                        <AdMid content={jsonData.admid2}/>
                        <RecommandMid content={jsonData.recommendMid}/>
                        <AdGameMid content={jsonData.adGameMid}/>
                        <AdMid content={jsonData.admid3}/>
                    </div>
                    <div className={styles.aside} >
                        <AdAside content={jsonData.adaside1}/>
                        <Chip id={recommendNews.id} type="recommend" title={recommendNews.name} groupName="侧栏" content={JSON.parse(recommendNews.data)}>
                            <ChannelRecommend />
                        </Chip>
                        <AdAside content={jsonData.adaside2}/>
                        <Weixin />
                        <AdAside content={jsonData.adaside3}/>
                        <AdAside content={jsonData.adaside4}/>
                        <VideoRecommend content={jsonData.videoRecommand} />
                        <AdAside content={jsonData.adaside5}/>
                        <AdAside content={jsonData.adaside6}/>
                        <WealthRecommend content={jsonData.wealthRecommand} />
                        <AdAside content={jsonData.adaside7}/>
                        <AdAside content={jsonData.adaside8}/>
                        <AdAside content={jsonData.adaside9}/>
                        <WirelessRecommend content={jsonData.wirelessRecommand} />
                        <AdAside content={jsonData.adaside10}/>
                        <AdAside content={jsonData.adaside11}/>
                    </div>
                </div>
                
            </div>
            <Footer content={jsonData.footer}/>
            <ChipEdit />
        </div>,
        document.getElementById('root'),
    );
};
render();
