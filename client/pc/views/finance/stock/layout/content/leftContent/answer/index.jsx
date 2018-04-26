import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Tab } from '../../../../components/tab';
import { rel } from '../../../../../../../utils/rel';

class Answer extends React.PureComponent {
    state = {
        isOver: false,
        data: this.props.content.answerList,
    };

    /**
     * 鼠标移入移出操作
     */
    handleOver = () => {
        const { isOver } = this.state;

        this.setState({ isOver: !isOver });
    };

    /**
     * 切换新闻
     */
    handleChange = () => {
        const { data } = this.state;
        const result = data.slice(0, 7);
        const newData = data.concat(result).slice(7);

        this.setState({
            data: newData,
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, isOver } = this.state;
        const { content } = this.props;
        const { answerTab, answerList } = content;

        return (
            <div className={styles.answer} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <Chip id="10051" type="static" title="牛人解盘标题" groupName="正文" content={answerTab}>
                    <Tab />
                </Chip>
                <div className={styles.answer_list}>
                    <div className={styles.list}>
                        <p>
                            <a href={data[0].url} target="_blank" rel={rel}>
                                {data[0].title}
                            </a>
                        </p>
                        <ul>
                            {data.slice(1, 7).map((item, index) => (
                                <li key={index}>
                                    <a href={item.url} target="_blank" rel={rel}>
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    className={styles.hyh}
                    style={{ display: isOver && answerList.length > 7 ? 'block' : 'none' }}
                    onClick={this.handleChange}
                />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Answer.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Answer.defaultProps = {};

export { Answer };
export default Answer;
