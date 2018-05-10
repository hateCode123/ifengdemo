import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class NewsList extends React.PureComponent {
    state = {
        isOver: false,
        data: this.props.content,
    };

    /**
     * 鼠标移入移出操作
     */
    handleOver = () => {
        const { isOver } = this.state;

        this.setState({ isOver: !isOver });
    };

    /**
     * 切换头条新闻
     */
    handleChange = () => {
        const { data } = this.state;
        const { limit } = this.props;
        const result = data.slice(0, limit);
        const newData = data.concat(result).slice(limit);

        this.setState({
            data: newData,
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, isOver } = this.state;
        const { content, limit } = this.props;

        return (
            <div className={styles.news_list} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <div className={styles.box}>
                    <p>
                        <a href={data[0].url} target="_blank" rel={rel} title={data[0].title}>
                            {data[0].title}
                        </a>
                    </p>
                    <div className={styles.list}>
                        <ul>
                            {data.slice(1, limit).map((item, index) => (
                                <li key={index}>
                                    <a href={item.url} target="_blank" rel={rel} title={item.title}>
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    className={styles.hyh}
                    style={{ display: isOver && content.length > limit ? 'block' : 'none' }}
                    onClick={this.handleChange}
                />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsList.propTypes = {
    content: PropTypes.array,
    limit: PropTypes.number,
};

/**
 * 定义组件默认属性
 * */
NewsList.defaultProps = {};

export { NewsList };
export default NewsList;
