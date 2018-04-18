import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import News from './news';
/**
 * 定义 Comment 组件
 */
class NewsList extends React.Component {
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
            <div className={styles.list}>
                <div className={styles.sp}>
                    <News content={content}/>
                </div>
                <div className={styles.more +" " +styles.mt22}>
                    <a href="#" target="_blank">查看更多新闻</a>
                </div>
            </div>

        )
    }
}

/**
 * 定义组件属性类型
 * */
NewsList.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
NewsList.defaultProps = {};

export { NewsList };
export default NewsList;
