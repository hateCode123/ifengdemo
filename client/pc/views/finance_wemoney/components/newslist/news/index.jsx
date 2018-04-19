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
        let typeName = [];
        {content.map((item,index) => (
            //styles.unslider-active
            typeName.push(item.type)
        ))} 

        const creatList = () =>(

            <ul >
                {content.map((item,index) => (
                    <div>
                        <a href="#" target="" class="img-l"><img src={item.poster} /></a>
                    </div>
                    
                ))} 
            </ul>
        )

        return (
            <div className={styles.listL +" "+styles.clearfix}>
                
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
