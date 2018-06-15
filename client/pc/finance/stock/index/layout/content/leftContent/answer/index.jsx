import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Tab } from '../../../../components/tabs/';
import AnswerList from './answerList/';

class Answer extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const title = {
            id: '10051',
            type: 'static',
            title: '牛人解盘主标题',
            groupName: '正文',
            content: content.answerTab,
        };

        return (
            <div className={`${styles.answer} clearfix`} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <Tab title={title} />
                <Chip id="10163" type="static" title="牛人解盘列表" groupName="正文">
                    <AnswerList data={content.answerList} />
                </Chip>
            </div>
        );
    }
}

export default Answer;
