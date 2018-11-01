import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import News from './news';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 NewsList 组件
 */
class NewsList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, moreNews } = this.props;

        return (
            <div className={styles.list}>
                <Chip id="20031" type="struct" title="新闻列表" groupName="leftContent" content={content}>
                    <News content={content} />
                </Chip>
                <Chip id="30086" type="struct" title="更多新闻链接" groupName="leftContent" content={moreNews}>
                    <div className={styles.more}>
                        <a href={moreNews.url} target="_blank" rel={rel}>
                            查看更多新闻
                        </a>
                    </div>
                </Chip>
            </div>
        );
    }
}

/** 定义组件属性类型**/
NewsList.propTypes = { content: PropTypes.array, moreNews: PropTypes.object };
NewsList.defaultProps = {};

export default errorBoundary(NewsList);
