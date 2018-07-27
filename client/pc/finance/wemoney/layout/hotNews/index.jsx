import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../utils/rel';

/**
 * 定义 HotNews 组件
 */
class HotNews extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { hotNews, hotNewsTitle } = content;
        const creatList = () => (
            <ul>
                {hotNews.map((item, index) => (
                    <li key={index}>
                        <i className={styles.hotCircleIcon} />
                        <a href={item.url} target="_blank" rel={rel}>
                            <span>{item.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
        );

        return (
            <div className={styles.onlineResolve}>
                <div className={styles.hotSpecial}>
                    <Chip id="10122" type="static" title="热门新闻排行标题" translate="jsonParse" content={content}>
                        <a href="">
                            {/* <span className={styles.hotTitle}>{hotNewsTitle[0].title}</span> */}
                            <span className={styles.hotTitle}>{hotNewsTitle.title}</span>
                        </a>
                    </Chip>
                    <i className={styles.hotLineIcon} />
                    <Chip id="10005" type="static" title="热门新闻排行" translate="jsonParse" content={content}>
                        <div className={styles.hotMesCon}>{creatList()}</div>
                    </Chip>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotNews.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
HotNews.defaultProps = {};

export { HotNews };
export default HotNews;
