import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
/**
 * 定义 Comment 组件
 */
class News extends React.Component {
    /**
     * 渲染组件
     */
    render() {
        const  {content}  = this.props;

        const creatList = () =>(
            <ul >
                {content.map((item,index) => (
                    //styles.unslider-active
                    <li key={index}>
                        <i className={styles.hotCircleIcon}></i>
                        <a href={item.url} target="_blank"><span>{item.title}</span></a>
                    </li>
                ))} 
            </ul>
        )

        return (
            <div>
                hello news
            </div>

        )
    }
}

/**
 * 定义组件属性类型
 * */
News.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
News.defaultProps = {};

export { News };
export default News;
