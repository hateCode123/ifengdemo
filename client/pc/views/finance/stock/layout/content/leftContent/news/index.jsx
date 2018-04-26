import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Tab } from '../../../../components/tab';

class News extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.news}>
                <Chip id="10050" type="static" title="公司要闻标题" groupName="正文" content={content.newsTab}>
                    <Tab />
                </Chip>
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
