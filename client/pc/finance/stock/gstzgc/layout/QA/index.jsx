import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { jsonp } from '@ifeng/ui_base';
import { getAnalyzerInfo, getQAData } from '../../../../../services/api';
import { rel } from '../../../../../utils/rel';
import QaTabs from './QATabs/';
import QaForm from './QAForm/';

class Qa extends React.PureComponent {
    static propTypes = {
        tabs: PropTypes.array,
    };

    state = {
        qaers: {},
        alist: {},
        current: 0,
    };

    componentDidMount() {
        const { current } = this.state;

        this.getQaData(current);
    }

    handleMouseOver = index => {
        const { qaers, alist } = this.state;
        const { tabs } = this.props;
        const currentUser = tabs[index];

        if (!qaers[currentUser.name] && !alist[currentUser.name]) {
            this.getQaData(index);
        }

        this.setState({
            current: index,
        });
    };

    getQaData = async index => {
        try {
            const { qaers, alist } = this.state;
            const { tabs } = this.props;
            const currentUser = tabs[index];
            const qa = {};
            const list = {};

            if (index !== tabs.length - 1) {
                const userData = await getAnalyzerInfo(currentUser.name, currentUser.type);

                qa[currentUser.name] = {
                    url: userData[0].url,
                    img: userData[0].image,
                };
            } else if (index === tabs.length - 1) {
                qa[currentUser.name] = {
                    url: tabs[tabs.length - 1].url,
                    img: tabs[tabs.length - 1].src,
                };
            }

            const qaobj = Object.assign({}, qaers, qa);

            const data = await getQAData(currentUser.name, currentUser.type ? currentUser.type : '');

            list[currentUser.name] = data.a_content;

            const listobj = Object.assign({}, alist, list);

            this.setState({
                qaers: qaobj,
                alist: listobj,
            });
        } catch (e) {
            console.error(e);
        }
    };

    getQaList = user => {
        const { alist } = this.state;
        const qaList = [];

        if (alist[user]) {
            alist[user].forEach((item, index) => {
                const questionKey = `question${index}`;
                const answerKey = `answer${index}`;

                const question = (
                    <dt key={questionKey} className="clearfix">
                        <span className={styles.question} />
                        {`${item.q_user}：`}
                        <p dangerouslySetInnerHTML={{ __html: item.question }} />
                    </dt>
                );

                const answer = (
                    <dd key={answerKey}>
                        <span className={styles.answer} />
                        <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </dd>
                );

                qaList.push(question);
                qaList.push(answer);
            });
        }

        return qaList;
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, qaers } = this.state;
        const { tabs } = this.props;
        const currentUser = tabs[current];

        return (
            <div>
                <Chip id="10105" type="static" title="分析师" groupName="正文" translate="jsonParse" content={tabs}>
                    <QaTabs current={current} handleMouseOver={this.handleMouseOver} />
                </Chip>
                <div className={styles.qa_box}>
                    <a href={qaers[currentUser.name] ? qaers[currentUser.name].url : ''} target="_blank" rel={rel}>
                        <img
                            className={styles.user}
                            src={qaers[currentUser.name] ? qaers[currentUser.name].img : ''}
                            target="_blank"
                            rel={rel}
                        />
                    </a>
                    <QaForm answerUserName={currentUser.name} />
                </div>
                <div className={styles.qalist}>
                    <dl>{this.getQaList(currentUser.name)}</dl>
                </div>
            </div>
        );
    }
}

export default Qa;
