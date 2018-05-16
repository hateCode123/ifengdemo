import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Tab } from '../../../../components/tabs/';
import NewsList from '../../../../components/newsList';

class News extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const title = {
            id: '10050',
            type: 'static',
            title: '公司要闻主标题',
            groupName: '正文',
            content: content.newsTab,
        };
        const subTitle = {
            id: '10117',
            type: 'static',
            title: '公司要闻子标题',
            groupName: '正文',
            content: content.newsSubTab,
        };

        return (
            <div className={styles.news}>
                <Tab title={title} subTitle={subTitle} />
                <NewsList content={content.news.list} limit={8} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
News.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
News.defaultProps = {};

export { News };
export default News;
