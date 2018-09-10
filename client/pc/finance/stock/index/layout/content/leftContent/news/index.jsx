import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Tab from '../../../../components/tabs/';
import NewsList from '../../../../components/newsList';

class News extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const title = {
            id: '20046',
            type: 'struct',
            title: '公司要闻主标题',
            groupName: '正文',
            content: content.newsTab,
        };

        return (
            <div className={styles.news}>
                <Tab title={title} />
                <NewsList content={content.news} />
            </div>
        );
    }
}

export default errorBoundary(News);
