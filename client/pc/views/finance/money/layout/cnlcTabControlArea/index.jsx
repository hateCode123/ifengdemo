import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import CommonTitleXL from './../commonTitleXL/';
import { rel } from '../../../../../utils/rel';

class CnlcTabControlArea extends React.PureComponent {
    state = {
        current: 0,
        top: 0,
    };
    componentDidMount() {
        this.setState({
            current: this.props.config.current,
            top: this.props.config.top,
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.config && nextProps.config !== this.props.config) {
            this.setState({
                current: nextProps.config.current,
                top: nextProps.config.top,
            });
        }
    }
    handleCallback = () => {
        this.props.handle({
            current: this.state.current,
            top: this.state.top,
        });
    };
    changeCurrent = v => {
        this.setState(
            {
                current: v,
            },
            () => {
                this.handleCallback();
            },
        );
    };
    changeTop = v => {
        this.setState(
            {
                top: v,
            },
            () => {
                this.handleCallback();
            },
        );
    };
    changeToPre = () => {
        const { top } = this.state;
        if (top < 0) {
            this.changeTop(top + 80);
        }
    };
    changeToNext = () => {
        const { content } = this.props;
        const { top } = this.state;
        if (0 - top < (content.analyst.length - 1) * 80) {
            this.changeTop(top - 80);
        }
    };
    cutString = (string, length) => {
        if (string) {
            if (string.length > length) {
                return string.substring(0, length);
            } else {
                return string;
            }
        } else {
            return '';
        }
    };
    render() {
        const { content, analy } = this.props;
        const { current, top } = this.state;

        // content ={
        //     Stype: "fund",
        //     analyst: [{
        //         img: "",
        //         name: ""
        //     }, ...],
        //     qa: [{
        //         count: "",
        //         name: "",
        //         qaLIst: [{
        //             a: "你好，17号美联储是否加息会落地，预计会对市场造成一定冲击，届时可考虑操作，祝你投资愉快！",
        //             ad: "2015-12-15",
        //             au: "邓时锋",
        //             q: "您好，目前持有的基金001127想部份转换000996，什么时候转换可合适呢，001127这只基金是亏本状态。非常感谢。",
        //             qd: "2015-12-15",
        //             qu: "凤凰网友",
        //         }, ...]
        //     }, ...]
        // }
        const contentData = content || {};
        const analyst = contentData.analyst || [];
        const qa = contentData.qa || [];

        const avatarList = analyst.map((item, v) => {
            return v === 0 ? (
                <li
                    key={`analyst${v}`}
                    className={v === current ? style.current : null}
                    style={{ paddingBottom: '8px' }}
                    onClick={() => this.changeCurrent(v)}>
                    <img src={item.img || ''} width="40" height="40" />
                    <p>{item.name || ''}</p>
                </li>
            ) : (
                <li
                    key={`analyst${v}`}
                    onClick={() => this.changeCurrent(v)}
                    className={v === current ? style.current : null}>
                    <img src={item.img || ''} width="40" height="40" />
                    <p>{item.name || ''}</p>
                </li>
            );
        });

        const qaCell = data =>
            data.map((item, v) => {
                return (
                    <dl key={`qaCell${v}`}>
                        <dt>
                            {item.qu || ''}: {item.q || ''}[{item.qd || ''}]
                        </dt>
                        <dd>
                            {item.au || ''}：{item.a || ''}[{item.ad || ''}]
                        </dd>
                    </dl>
                );
            });

        const list = qa.map((item, v) => {
            return (
                <div key={`qa${v}`} className={v === current ? style.show : style.hidden}>
                    <div className={style.jied}>{qaCell(item.qaList || [])}</div>
                    <div id="count1" className={style.zongj}>
                        累积回答了
                        <a
                            href={`http://app.finance.ifeng.com/gszb/a_list.php?user=${item.name || ''}&type=${
                                contentData.Stype
                            }`}
                            target="_blank"
                            className={style.cRed}>
                            {item.count || ''}
                        </a>
                        个问题
                        <a
                            href={`http://app.finance.ifeng.com/gszb/a_list.php?user=${item.name || ''}&type=${
                                contentData.Stype
                            }`}
                            target="_blank"
                            rel={rel}
                            className={style.cGray}>
                            更多&gt;
                        </a>
                    </div>
                </div>
            );
        });

        const analyData = analy || {};
        const analystRight = analyData.analyst || [];
        const qaRight = analyData.qa || [];
        const nameList = analyData.nameList || [];
        const fenxDom = analystRight.map((item, v) => {
            return (
                <div className={style.fenx_peo} key={v}>
                    <div id="askUser">
                        <a
                            href={`http://app.finance.ifeng.com/gszb/a_list.php?user=${item.name}&type=${
                                analyData.Stype
                            }`}
                            target="_blank"
                            rel={rel}
                            title={item.name}>
                            <img src={item.img} width="75" height="75" />
                        </a>
                        <h3>{item.name}</h3>
                    </div>
                    <p>
                        <a href="${fxsGetUrl!''}" target="_blank">
                            {analyData.fxsGetJj || '分析师在线答疑'}
                        </a>
                    </p>
                </div>
            );
        });
        const qaListRightDom = data =>
            data.map((item, v) => {
                return (
                    <div id="askQuestion" key={v}>
                        <div className={style.fen_wen} style={{ paddingTop: '9px' }}>
                            <span>Q:</span>
                            {this.cutString(item.q, 40)}
                        </div>
                        <div className={style.fen_da}>
                            <span>A:</span>
                            {this.cutString(item.a, 40)}
                        </div>
                    </div>
                );
            });

        const qaRightDom = qaRight.map((item, v) => {
            const dom = qaListRightDom(item.qaList || []);

            return <div key={v}> {dom}</div>;
        });

        const selectDom = nameList.map((item, v) => {
            return v === 0 ? (
                <option key={v} value={`{item.name||''}专家`}>
                    -------全部专家-------
                </option>
            ) : (
                <option key={v} value={item.name || ''}>
                    {item.name || ''}
                </option>
            );
        });
        const topPx = `${top}px`;

        return (
            <div className="clearfix">
                <div className={style.col_left}>
                    <div className={style.title_07}>
                        <div className={style.shuax}>
                            {/* todo 手动刷新 即为重新请求接口数据 */}
                            <a rel={rel} target="_blank" title="手动刷新" style={{ cursor: 'pointer' }}>
                                手动刷新
                            </a>
                            {/* todo 自动刷新规则是什么？ */}
                            <input id="auto_a_id" type="checkbox" value="yes" style={{ marginRight: '3px' }} />自动刷新
                        </div>
                        已回答问题列表
                    </div>

                    <div className={style.dayi} id="tabControlArea">
                        <div className={style.dayi_left}>
                            <div className={style.scrollList_20}>
                                <ul id="wen03" className={style.photolist} style={{ top: topPx }}>
                                    {avatarList}
                                </ul>
                            </div>
                            <div className={style.sxjt}>
                                <a className={style.sx_s} onClick={this.changeToNext} />
                                <a className={style.sx_x} onClick={this.changeToPre} />
                            </div>
                        </div>
                        <div className={style.dayi_right} id="tabSlide3">
                            {list}
                        </div>
                    </div>
                </div>
                <div className={style.col_right}>
                    <div className={style.title_07}>
                        <div className={style.mored}>
                            <a
                                href={`http://app.finance.ifeng.com/gszb/a_list.php?user=全部&type=${
                                    analyData.Stype
                                }`}
                                target="_blank"
                                rel={rel}
                                title="今日在线分析师">
                                更多&gt;
                            </a>
                        </div>今日在线分析师
                    </div>
                    <div className={style.fenx}>
                        {fenxDom}

                        {qaRightDom}

                        {/* todo form表单重写 */}
                        <form
                            action="http://app.finance.ifeng.com/gszb/question.php"
                            method="post"
                            className={style.chaformlwl}>
                            <div className={style.shuru}>
                                提问对象：
                                <select name="name">{selectDom}</select>
                                <textarea
                                    name="question"
                                    onChange={e => {
                                        console.log(e);
                                    }}
                                    id="input01"
                                    value="请在此输入您的问题"
                                    className={style.input01}>
                                    请在此输入您的问题
                                </textarea>
                            </div>
                            <input id="answer_user_id" type="hidden" name="answer_user" value="全部专家" />
                            <input type="hidden" name="type" value="fund" />
                            <input type="hidden" name="question_user" value="凤凰网友" />
                            <div className={style.tijiao}>
                                <input type="submit" name="Submit3" value="提交" className={style.butt02} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CnlcTabControlArea.propTypes = {
    content: PropTypes.object,
    analy: PropTypes.object,
    config: PropTypes.object,
    handle: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
CnlcTabControlArea.defaultProps = {};
export { CnlcTabControlArea };
export default CnlcTabControlArea;
