import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import NewsList from './newsList/';
import ExtraNews from './extraNews/';

class DateNews extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, extraNews } = this.props;

        return (
            <div className={styles.box}>
                <div className={styles.title}>
                    <div className={styles.date} />
                </div>
                <div className={styles.newList}>
                    <ul className={styles.list_top}>
                        <NewsList data={content.slice(0, 6)} />
                    </ul>
                    <ul className={styles.list_middle}>
                        <NewsList data={content.slice(6, 12)} />
                    </ul>
                </div>
                <Chip id="10011" type="static" title="头条新闻" groupName="正文" content={extraNews}>
                    <ExtraNews content={extraNews} />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
DateNews.propTypes = {
    content: PropTypes.array,
    extraNews: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
DateNews.defaultProps = {};

export { DateNews };
export default DateNews;
