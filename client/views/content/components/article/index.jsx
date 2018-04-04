import React from 'react';
import styles from './index.css';
import Video from './video.jsx';
import Content from './content.jsx';
import QrCode from './qrCode.jsx';
import Ad from './ad.jsx';
import Chip from 'Chip';
import Recommend from './recommend.jsx';

class Artical extends React.Component {
    render() {
        const { content, qrCode, ad, recommendArtical} = this.props;
        return (
            <div className={styles.box}>
                <h1 className={styles.title}>{content.article_topic}</h1>
                <div className={styles.info}>
                    <div className={styles.base_info}>
                        <div>{content.datePublished}</div>
                        <div>
                            来源：
                            <a href={content.source_url} target="_blank">
                                {content.source_title}
                            </a>
                        </div>
                    </div>
                    <div className={styles.share_box} >分享组件</div>
                    <div className={styles.comment_count_box} >评论数组件</div>
                </div>
                <div className={styles.main}>
                    {content.contents.map(
                        (item, index) =>
                            item.type === 'video' ? (
                                <Video guid={item.guid} key={index} />
                            ) : (
                                <Content content={item.content} key={index} />
                            ),
                    )}
                </div>
                <QrCode content={qrCode}/>
                <Ad content={ad} />
                <div className={styles.editor}>[责任编辑：{content.editor}]</div>
                <div className={styles.tools}>
                    <div className={styles.share_box} >分享组件</div>
                    <div className={styles.recommend_box} >推荐组件</div>
                </div>
                <Chip id={recommendArtical.id} type="static" title={recommendArtical.name} groupName="文章" content={recommendArtical.content}>
                    <Recommend/>
                </Chip>
                <div className={styles.declare}>免责声明：本文仅代表作者个人观点，与凤凰网无关。其原创性以及文中陈述文字和内容未经本站证实，对本文以及其中全部或者部分内容、文字的真实性、完整性、及时性本站不作任何保证或承诺，请读者仅作参考，并请自行核实相关内容。</div>
            </div>
        );
    }
}

export default Artical;
