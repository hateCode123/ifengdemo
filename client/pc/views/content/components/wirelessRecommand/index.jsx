import React from 'react';
import styles from './index.css';
import AsidePannel from '../../commons/asidePannel/index.jsx';

class WealthRecommand extends React.Component {
    render() {
        const { content } = this.props;
        const extra = (
            <span className={styles.nav}>
                <a href="//talk.ifeng.com/index.shtml" target="_blank">
                    讲堂
                </a>
                <a href="//yue.ifeng.com/index.shtml" target="_blank">
                    音乐
                </a>
                <a href="//rbt.ifeng.com/index.shtml" target="_blank">
                    彩铃
                </a>
                <a href="//vip.v.ifeng.com/phone/index.shtml" target="_blank">
                    视频
                </a>
            </span>
        );
        return (
            <AsidePannel title="凤凰无线" extraContent={extra}>
                <ul className={styles.list}>
                    {content.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank">
                                <img src={item.pic} alt={item.title} />
                            </a>
                            <p>
                                <a href={item.url} target="_blank">
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

export default WealthRecommand;
