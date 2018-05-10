import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Tab } from '../../../../components/tab';
import { rel } from '../../../../../../../utils/rel';
import AnswerList from './answerList/';

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
        const { answerList } = content;
        const title = {
            id: '10051',
            type: 'static',
            title: '牛人解盘主标题',
            groupName: '正文',
            content: content.answerTab,
        };

        const subTitle = {
            id: '10117',
            type: 'static',
            title: '牛人解盘子标题',
            groupName: '正文',
            content: content.answerSubTab,
        };

        return (
            <div className={`${styles.answer} clearfix`} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <Tab title={title} subTitle={subTitle} />
                <Chip id="20019" type="recommend" title="牛人解盘列表" groupName="正文">
                    <AnswerList data={data} />
                </Chip>
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
