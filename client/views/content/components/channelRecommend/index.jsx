import React from 'react';
import styles from './index.css';
import { createUrl } from '../../utils/index';
import AsidePannel from '../../commons/asidePannel/index.jsx';


class ChannelRecommend extends React.Component {
    state = {
        commentCount: null,
    };
    render() {
        const { content } = this.props;
        const top = content[0];
        const list = content.slice(1);
        const { commentCount } = this.state;
        const extraContent = (
            <span className={styles.extra}>
                <a href="//gongyi.ifeng.com/hot/special/fhwytjh/ " target="_blank">
                    <img
                        src="//p1.ifengimg.com/a/2017/0817/donate_4.jpg"
                        width="145"
                        height="20"
                        alt="凤凰网公益基金救助直达"
                    />
                </a>
            </span>
        );
        return (
            <AsidePannel title="频道推荐" extraContent={extraContent}>
                <div className={styles.top}>
                    <h3>
                        <a href={createUrl(top.id)} title={top.title} target="_blank">
                            {top.title}
                        </a>
                    </h3>
                    <div className={styles.extend}>
                        <span className={styles.time}>{top.publishedTime}</span>
                        {commentCount !== null ? (
                            <span className={styles.comment}>
                                <a
                                    href={`//gentie.ifeng.com/view.html?docUrl=${top.docUrl}&docName=${
                                        top.title
                                    }&skey=${top.skey}&pcUrl=${top.url}`}>
                                    <em>{commentCount}</em>条评论
                                </a>
                            </span>
                        ) : null}
                    </div>
                </div>
                <ul className={styles.list}>
                    {list.map((item, index) => (
                        <li key={index}>
                            <a href={createUrl(item.id)} title={item.title} target="_blank">
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </AsidePannel>
        );
    }
}

export default ChannelRecommend;
