import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp, loadScript } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';
import QaForm from './QAForm/';

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

    getQaData = index => {
        const { qaers, alist } = this.state;
        const { tabs } = this.props;
        const currentUser = tabs[index];
        const qa = {};
        const list = {};

        if (!qaers[currentUser.name] && !alist[currentUser.name] && index !== tabs.length - 1) {
            jsonp('http://app.finance.ifeng.com/gszb/user_ol.php', {
                data: {
                    name: currentUser.name,
                    type: currentUser.type,
                    cb: `updateAnalyzerInfo${index}`,
                },
                jsonpCallback: `updateAnalyzerInfo${index}`,
            }).then(data => {
                qa[currentUser.name] = {
                    url: '',
                    img: '',
                };

                qa[currentUser.name].url = data[0].url;
                qa[currentUser.name].img = data[0].image;

                const qaobj = Object.assign({}, qaers, qa);

                loadScript('http://app.finance.ifeng.com/gszb/a_data.php', {
                    data: {
                        name: currentUser.name,
                        type: currentUser.type ? currentUser.type : '',
                    },
                }).then(data => {
                    list[currentUser.name] = a_data.a_content;

                    const listobj = Object.assign({}, alist, list);

                    this.setState({
                        qaers: qaobj,
                        alist: listobj,
                    });
                });
            });
        } else if (!qaers[currentUser.name] && !alist[currentUser.name] && index === tabs.length - 1) {
            qa[currentUser.name] = {
                url: '',
                img: '',
            };

            qa[currentUser.name].url = tabs[tabs.length - 1].url;
            qa[currentUser.name].img = tabs[tabs.length - 1].src;

            const qaobj = Object.assign({}, qaers, qa);

            loadScript('http://app.finance.ifeng.com/gszb/a_data.php', {
                data: {
                    name: currentUser.name,
                    type: currentUser.type ? currentUser.type : '',
                },
            }).then(data => {
                list[currentUser.name] = a_data.a_content;

                const listobj = Object.assign({}, alist, list);

                this.setState({
                    qaers: qaobj,
                    alist: listobj,
                });
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
        const { content, tabs } = this.props;
        const { title, url } = content;
        const currentUser = tabs[current];

        return (
            <div className={styles.qa}>
                <MidTitle title={title} url={url} />
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
    tabs: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
Qa.defaultProps = {};

export { Qa };
export default Qa;
