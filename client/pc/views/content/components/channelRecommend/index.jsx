import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { createUrl } from '../../utils/index';
import AsidePannel from '../../commons/asidePannel/index';

/**
 * 定义 ChannelRecommend 组件
 */
class ChannelRecommend extends React.PureComponent {
    /**
     * 绑定属性
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = { commentCount: null };
    }

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const top = content[0];
        const list = content.slice(1);
        const { commentCount } = this.state;
        const extraContent = (
            <span className={styles.extra}>
                <a
                    href="//gongyi.ifeng.com/hot/special/fhwytjh/ "
                    target="_blank"
                    rel="nofollow me noopener noreferrer">
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
                        <a
                            href={createUrl(top.id)}
                            title={top.title}
                            target="_blank"
                            rel="nofollow me noopener noreferrer">
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

/**
 * 定义组件属性类型
 * */
ChannelRecommend.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
ChannelRecommend.defaultProps = {};

export { ChannelRecommend };
export default ChannelRecommend;
