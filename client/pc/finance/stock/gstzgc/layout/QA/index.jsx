import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { jsonp, loadScript } from '@ifeng/ui_base';
import QaForm from './QAform/';
import { rel } from '../../../../../utils/rel';
import TitleR from '../titleR';

class Qa extends React.PureComponent {
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
        this.getQaData(index);
        this.setState({
            current: index,
        });
    };

    getQaData = async index => {
        const { qaers, alist } = this.state;
        const { tabs } = this.props.content;
        const currentUser = tabs[index];
        const qa = {};
        const list = {};

        if (!qaers[currentUser.name] && !alist[currentUser.name] && index !== tabs.length - 1) {
            const userData = await jsonp('//app.finance.ifeng.com/gszb/user_ol.php', {
                data: {
                    name: currentUser.name,
                    type: currentUser.type,
                    cb: `updateAnalyzerInfo${index}`,
                },
                jsonpCallback: `updateAnalyzerInfo${index}`,
            });

            qa[currentUser.name] = {
                url: '',
                img: '',
            };

            qa[currentUser.name].url = userData[0].url || currentUser.url;
            qa[currentUser.name].img = userData[0].image;

            const qaobj = Object.assign({}, qaers, qa);

            const data = await jsonp('//app.finance.ifeng.com/gszb/a_data.php', {
                data: {
                    user: currentUser.name,
                    type: currentUser.type ? currentUser.type : '',
                    callback: 'getData',
                },
                jsonpCallback: 'getData',
            });

            list[currentUser.name] = data.a_content;

            const listobj = Object.assign({}, alist, list);

            this.setState({
                qaers: qaobj,
                alist: listobj,
            });
        } else if (!qaers[currentUser.name] && !alist[currentUser.name] && index === tabs.length - 1) {
            qa[currentUser.name] = {
                url: '',
                img: '',
            };

            qa[currentUser.name].url = tabs[tabs.length - 1].url;
            qa[currentUser.name].img = tabs[tabs.length - 1].src;

            const qaobj = Object.assign({}, qaers, qa);

            const data = await jsonp('//app.finance.ifeng.com/gszb/a_data.php', {
                data: {
                    name: currentUser.name,
                    type: currentUser.type ? currentUser.type : '',
                    callback: 'getData',
                },
                jsonpCallback: 'getData',
            });

            list[currentUser.name] = data.a_content;

            const listobj = Object.assign({}, alist, list);

            this.setState({
                qaers: qaobj,
                alist: listobj,
            });
        }
    };

    getQaList = user => {
        const { alist } = this.state;
        const qaList = [];

        if (alist[user]) {
            alist[user].map((item, index) => {
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

                return qaList;
            });
        }

        return qaList;
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, qaers } = this.state;
        const { content } = this.props;
        const { title, tabs, liveImg } = content;
        const currentUser = tabs[current];

        return (
            <div className={styles.qa}>
                <Chip
                    id="10060"
                    type="static"
                    title="A股分析师答疑"
                    groupName="文章"
                    translate="jsonParse"
                    content={title}>
                    <TitleR content={title} liveImg={liveImg} />
                </Chip>
                <div>
                    <ul className={`${styles.tabs} clearfix`}>
                        {tabs.map((item, index) => (
                            <li
                                key={index}
                                className={current === index ? styles.current : ''}
                                onMouseEnter={() => this.handleMouseOver(index)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.qa_box}>
                        <a
                            href={
                                qaers[currentUser.name] && current < 3 ? qaers[currentUser.name].url : tabs[current].url
                            }
                            target="_blank"
                            rel={rel}>
                            <img
                                className={styles.user}
                                src={
                                    qaers[currentUser.name] && current < 3
                                        ? qaers[currentUser.name].img
                                        : tabs[current].src
                                }
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
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Qa.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
Qa.defaultProps = {};

export { Qa };
export default Qa;
