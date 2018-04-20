import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
/**
 * 定义 HotNews 组件
 */
class HotNews extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const  {content}  = this.props;

        const creatList = () =>(
            <ul >
                {content.map((item,index) => (
                    <li key={index}>
                        <i className={styles.hotCircleIcon}></i>
                        <a href={item.url} target="_blank"><span>{item.title}</span></a>
                    </li>
                ))} 
            </ul>
        )

        return (
            <div className={styles.onlineResolve}>
                <div className={styles.hotSpecial}>
                <Chip
                    id="10005" type="static" title="wemoney热门新闻排行"
                    groupName="文章" content={ content}
                >
                    <a href=""><span className={styles.hotTitle}>热门新闻排行</span></a>
                    <i className={styles.hotLineIcon}></i>
                    
                    <div className={styles.hotMesCon}>
                            {creatList()}
                    </div>
                </Chip>
                </div>
            </div>

        )
    }
}

/**
 * 定义组件属性类型
 * */
HotNews.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
HotNews.defaultProps = {};

export { HotNews };
export default HotNews;
