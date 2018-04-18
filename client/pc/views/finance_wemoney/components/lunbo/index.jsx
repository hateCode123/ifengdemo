import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';

/**
 * 定义 Lunbo 组件
 */
class Lunbo extends React.PureComponent {
    /**
     * 绑定属性
     * @param {*} props

    /**
     * 渲染组件
     */
    render() {
        const content = this.props.content ;

        const creatList = () =>(
            <ul >
                {content.map((item,index) => (
                    //styles.unslider-active
                    <li key={index} className={styles.unsliderWrap}>
                        <a href={item.url} target="_blank">
                            <img src={item.poster}  className={styles.trans}/>
                        </a>
                        <div className={styles.bannerTitleCon}>
                            <a href={item.url} target="_blank">
                                <p><strong><span style={{fonSize:'14pt'}}>{item.title}</span></strong></p>
                            </a>
                        </div>
                        <a href={item.url} target="_blank"></a>
                    </li>
                ))} 
            </ul>
        )

        const creatTag = () =>(
            <ol>
                {content.map((item,index) => (
                    //styles.unslider-active
                    <li data-slide={index} key={index}>{index}</li>
                ))}
            </ol>
        )


        return (
            <div className={styles.unslider}>               
                <div className={styles.wrapCon + " "+ styles.unsliderFade}>
                    {creatList()}
                </div>
                <nav className={styles.unsliderNav}>
                    {creatTag()}
                </nav>
                    
            </div>

        );
    }
}

/**
 * 定义组件属性类型
 * */
Lunbo.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Lunbo.defaultProps = {};

export { Lunbo };
export default Lunbo;