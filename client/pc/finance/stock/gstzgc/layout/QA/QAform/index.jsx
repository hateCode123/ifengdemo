import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class QaForm extends React.PureComponent {
    state = {
        questionUserName: '',
    };

    componentDidMount() {
        const sid = this.getQuestionUserName('sid');
        const user = sid === null ? `凤凰网友${parseInt(Math.random() * (10000 - 1)) + 1}` : sid.substr(32);

        this.setState({ questionUserName: user });
    }

    /**
     * 获取当前用户名
     */
    getQuestionUserName = name => {
        const arg = `${name}=`;
        const alen = arg.length;
        const clen = document.cookie.length;
        let i = 0;
        let j = 0;

        while (i < clen) {
            j = i + alen;

            if (document.cookie.substring(i, j) === arg) {
                return this.getCookieVal(j);
            }

            i = document.cookie.indexOf(' ', i) + 1;

            if (i === 0) {
                break;
            }
        }

        return null;
    };

    getCookieVal = offset => {
        let endstr = document.cookie.indexOf(';', offset);

        if (endstr === -1) {
            endstr = document.cookie.length;
        }

        return decodeURIComponent(document.cookie.substring(offset, endstr));
    };

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

/**
 * 定义组件属性类型
 * */
QaForm.propTypes = {
    answerUserName: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
QaForm.defaultProps = {};

export { QaForm };
export default QaForm;
