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
                    <li className={ `${ styles.news_item_has_image } clearfix` }>
                        <a className={ styles.image_link } href="#">
                            <img src="http://ued.ifeng.com/test/songbb/finance_iMarkets/images/tab_tu.jpg" />
                        </a>
                        <div className={ styles.news_item_infor }>
                            <h2 className={ styles.news_item_title }>
                                <a href="#">111111步取消微观领域的汇兑逐步取消微观111111步取消微观领域的汇兑逐步取消微观</a>
                            </h2>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsStream.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
NewsStream.defaultProps = {};

export { NewsStream };
export default NewsStream;