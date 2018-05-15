import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Recommend } from '../recommend';

class HeadlineNews extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { headlineNews1, headlineNews2, headlineNews3, headlineNews4, headlineNews5 } = this.props.content;

        return (
            <ul className={styles.news}>
                <Chip
                    id={headlineNews1.id}
                    type="static"
                    title={headlineNews1.name}
                    groupName="文章"
                    content={headlineNews1.content}>
                    <Recommend />
                </Chip>
                <Chip
                    id={headlineNews2.id}
                    type="static"
                    title={headlineNews2.name}
                    groupName="文章"
                    content={headlineNews2.content}>
                    <Recommend />
                </Chip>
                <Chip
                    id={headlineNews3.id}
                    type="static"
                    title={headlineNews3.name}
                    groupName="文章"
                    content={headlineNews3.content}>
                    <Recommend />
                </Chip>
                <Chip
                    id={headlineNews4.id}
                    type="static"
                    title={headlineNews4.name}
                    groupName="文章"
                    content={headlineNews4.content}>
                    <Recommend />
                </Chip>
                <Chip
                    id={headlineNews5.id}
                    type="static"
                    title={headlineNews5.name}
                    groupName="文章"
                    content={headlineNews5.content}>
                    <Recommend />
                </Chip>
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HeadlineNews.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
HeadlineNews.defaultProps = {};

export { HeadlineNews };
export default HeadlineNews;
