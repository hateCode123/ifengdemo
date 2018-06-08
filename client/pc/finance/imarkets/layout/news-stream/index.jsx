import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class NewsStream extends PureComponent{
    render(){
        return (
            <div>
                <img className={ styles.title_image } src={ require('./news-stream-title.jpg') } />
                <h4 className={ styles.news_title }>NEWS</h4>
                <ul className={ styles.news_list }>
                    {/* 置顶类 */}
                    <li className={ `${ styles.news_item_has_image } clearfix` }>
                        <a className={ styles.image_link } href="#">
                            <img src="http://ued.ifeng.com/test/songbb/finance_iMarkets/images/tab_tu.jpg" />
                        </a>
                        <div className={ styles.news_item_infor }>
                            <h2 className={ styles.news_item_title }>
                                <a href="#">111111步取消微观领域的汇兑逐步取消微观</a>
                            </h2>
                            <div className="clearfix">
                                <b className={ `${ styles.tag } ${ styles.tag_top }` }>置顶</b>
                                <span className={ styles.text }>凤凰网</span>
                                <time className={ styles.text }>03-17</time>
                                <time className={ styles.text }>12:56</time>
                                <a className={ styles.ly } href="#">1233</a>
                            </div>
                        </div>
                    </li>
                    {/* 广告 */}
                    <li className={ `${ styles.news_item_no_image } clearfix` }>
                        <div className={ styles.news_item_infor }>
                            <h2 className={ styles.news_item_title }>
                                <a href="#">111111步取消微观领域的汇兑逐步取消微观</a>
                            </h2>
                            <div className="clearfix">
                                <b className={ styles.text2 }>广告</b>
                            </div>
                        </div>
                    </li>
                    {/* 图片广告 */}
                    <li className={ styles.image_ad }>
                        <a href="#">
                            <img src="http://ued.ifeng.com/test/songbb/finance_iMarkets/images/gg_01.jpg" />
                        </a>
                    </li>
                </ul>
                {/* 点击查看更多 */}
                <div className={ styles.more_box }>
                    <a className={ styles.more } role="button">点击查看更多</a>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsStream.propTypes = {};

/**
 * 定义组件默认属性
 * */
NewsStream.defaultProps = {};

export { NewsStream };
export default NewsStream;