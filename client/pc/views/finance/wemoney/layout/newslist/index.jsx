import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import News from './news';
import { rel } from '../../../../../utils/rel';

/**
 * 定义 NewsList 组件
 */
class NewsList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.list}>
                <News content={content} />
                <div className={styles.more}>
                    <a href="//finance.ifeng.com/listpage/821/1/list.shtml" target="_blank" rel={rel}>
                        查看更多新闻
                    </a>
                </div>
            </div>
        );
    }
}

/** 定义组件属性类型**/
NewsList.propTypes = { content: PropTypes.array };
NewsList.defaultProps = {};
export { NewsList };
export default NewsList;
