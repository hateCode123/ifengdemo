import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { cookie } from '@ifeng/ui_base';
import auth from '@ifeng/ui_pc_auth';

class QaForm extends React.PureComponent {
    static propTypes = {
        answerUserName: PropTypes.string,
    };

    state = {
        questionUserName: '',
    };

    componentDidMount() {
        this.unBindLogin = auth.event.on(auth.EVENTNAMES.login, () => {
            this.getQuestionUserName();
        });
        this.unBindLogout = auth.event.on(auth.EVENTNAMES.logout, () => {
            this.setState({ questionUserName: '' });
        });

        this.getQuestionUserName();
    }

    componentWillUnmount() {
        this.unBindLogin();
        this.unBindLogout();
    }

    getQuestionUserName() {
        const sid = cookie.get('sid');
        const user = sid === null ? `凤凰网友${parseInt(Math.random() * (10000 - 1)) + 1}` : sid.substring(0, 32);

        this.setState({ questionUserName: user });
    }

    /**
     * 渲染组件
     */
    render() {
        const { questionUserName } = this.state;
        const { answerUserName } = this.props;

        return (
            <form
                className={styles.form_box}
                name="askMsgForm"
                action="//app.finance.ifeng.com/gszb/question.php"
                method="post">
                <input type="hidden" name="question_user" value={questionUserName} />
                <input type="hidden" name="answer_user" value={answerUserName} />
                <div className={styles.question}>
                    <textarea name="question" placeholder="请在此输入您的问题" />
                    <p>
                        <input type="submit" value="提交" className={styles.submit_btn} />
                    </p>
                </div>
            </form>
        );
    }
}

export default QaForm;
