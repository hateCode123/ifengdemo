import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { jsonp } from '@ifeng/ui_base';
import styles from './index.css';

class NewsStream extends PureComponent{
    idList = [];     // 文章id列表

    componentDidMount(){
        this.getCount();
    }
    // 获取评论列表
    async getCount(){
        const data = await jsonp('http://comment.ifeng.com/get/multicount', {
            data: {
                doc_url: this.idList.join('|'),
                format: 'js'
            }
        });
        const newsList = document.getElementById('news-stream-list').getElementsByTagName('li');
        for(let i = 0, j = 36; i < j; i++){
            const a = newsList[i].getElementsByTagName('a')[2];
            if(data[i].count !== 0){
                a.innerText = data[i].count + 'x';
            }
        }
    }
    // 渲染list
    listView(list){
        const dom = [];
        for(let i = 0, j = 36; i < j; i++){
            const item = list[i];
            const image = JSON.parse(item.thumbnails).image[0].url;
            this.idList.push(item.id);
            dom.push(
                <li key={ `${ item.id }_${ item.creator }_${ item.newsTime }` } className={ `${ styles.news_item_has_image } clearfix` }>
                    <a className={ styles.image_link } href={ item.url } target="_blank">
                        <img src={ image } title={ item.title } />
                    </a>
                    <div className={ styles.news_item_infor }>
                        <h2 className={ styles.news_item_title }>
                            <a href={ item.url } target="_blank">{ item.title }</a>
                        </h2>
                        <div className="clearfix">
                            {/* <b className={ `${ styles.tag } ${ styles.tag_top }` }>置顶</b> */}
                            <span className={ styles.text }>{ item.source }</span>
                            <time className={ `${ styles.ml10 } ${ styles.text }` }>{ item.newsTime }</time>
                            <a className={ styles.ly } href="#">0</a>
                        </div>
                    </div>
                </li>
            );
        }
        return dom;
    }
    render(){
        const { content } = this.props;

        return (
            <div>
                <img className={ styles.title_image } src={ require('./news-stream-title.jpg') } />
                <h4 className={ styles.news_title }>NEWS</h4>
                <ul className={ styles.news_list } id="news-stream-list">
                    { this.listView(content.newsstream.list) }
                </ul>
                {/* 点击查看更多 */}
                <div className={ styles.more_box }>
                    <a className={ styles.more } href="http://finance.ifeng.com/listpage/794/1/list.shtml" target="_blank">点击查看更多</a>
                </div>
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
