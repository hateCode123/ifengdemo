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

        //const list = content.slice(0)
        /*var content = [{
                title: '1迷你世界联机：抢凳子小游戏 汤米不小心被淘汰',
                url: '//finance.ifeng.com/a/20180223/15993655_0.shtml&#10;',
                poster:'http://p2.ifengimg.com/a/2018_08/033dafb51076bff_size16_w550_h306.jpg'
            }, {
                title: '2迷你世界联机：抢凳子小游戏 汤米不小心被淘汰',
                url: '//finance.ifeng.com/a/20180223/15993294_0.shtml&#10;',
               poster:'http://p1.ifengimg.com/a/2018_08/567c1a67e008fdf_size121_w580_h330.jpg'
            }]
            */
        const creatList = () =>(
            <ul >
                {content.map((item,index) => (
                    //styles.unslider-active
                    <li >
                        <a href={item.url} target="_blank">
                            <img src={item.poster}  />
                        </a>
                        <div >
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
                    <li data-slide={index} >{index}</li>
                ))}
            </ol>
        )


        return (
            <div>               
                <div style={{overflow: 'hidden'}}>
                    {creatList()}
                </div>
                <nav>
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