import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import AsidePannel from '../../commons/asidePannel/';

/**
 * 定义 WirelessRecommend 组件
 */
class WirelessRecommend extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const extra = (
            <span className={styles.nav}>
                <a href="//talk.ifeng.com/index.shtml" target="_blank" rel="nofollow me noopener noreferrer">
                    讲堂
                </a>
                <a href="//yue.ifeng.com/index.shtml" target="_blank" rel="nofollow me noopener noreferrer">
                    音乐
                </a>
                <a href="//rbt.ifeng.com/index.shtml" target="_blank" rel="nofollow me noopener noreferrer">
                    彩铃
                </a>
                <a href="//vip.v.ifeng.com/phone/index.shtml" target="_blank" rel="nofollow me noopener noreferrer">
                    视频
                </a>
            </span>
        );

        return (
            <AsidePannel title="凤凰无线" extraContent={extra}>
                <ul className={styles.list}>
                    {content.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer">
                                <img src={item.pic} alt={item.title} />
                            </a>
                            <p>
                                <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer">
                                    {item.title}
                                </a>
                            </p>
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
WirelessRecommend.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
WirelessRecommend.defaultProps = {};

export { WirelessRecommend };
export default WirelessRecommend;
