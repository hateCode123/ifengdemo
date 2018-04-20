import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
/**
 * 定义 News 组件
 */
class News extends React.Component {
    /**
     * 渲染组件
     */
    render() {
        const  {content}  = this.props;
//        let typeName = [];
//        {content.map((item,index) => (
//            //styles.unslider-active
//            typeName.push(item.type)
//        ))} 

        const creatList = () =>(
            <div>
                {content.map((item,index) => (
                    <div key={index} className={styles.listL + " "+ styles.clearfix}>

                        <a href={item.url} target="_blank" className = {styles.imgStyle}><img src={item.poster} /></a>
                        
                        <div className={styles.listText}>
                            <p className={styles.text}>
                                <a href={item.url}> {item.title} </a>
                            </p>
                            <p className={styles.time}>
                                <b>{item.type}</b>
                                <span>{item.source}</span>
                                <span>{item.date}</span> 
                                <span>{item.time}</span>
                            </p>
                        </div>

                        <div className={styles.ly}>
                            <a href="#" target="_blank" ></a>
                        </div>

                    </div>
                    
                ))} 
            </div>
            )

        return (
            <div className={styles.sp}>
            <Chip
                id="10007" type="static" title="wemoney新闻信息流"
                groupName="文章" content={ content}
            >
                {creatList()}
            </Chip>
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
