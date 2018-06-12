/**
 * 在线答疑模块
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import HumanTab from './human-tab';
import SendQuestion from './send-question';

class Question extends PureComponent{
    render(){
        const { content } = this.props;

        return (
            <Fragment>
                <div className={ styles.q_box }>
                    <img className={ styles.zai_xian_da_yi } src={ require('./zai-xian-da-yi.png') } />
                    <Chip id="10166" type="static" title="答疑专家" groupName="在线答疑" content={ content.experts }>
                        <HumanTab />
                    </Chip>
                </div>
                <SendQuestion />
                {/* 已回答问题 */}
                <h2 className={ styles.q_list_title }>
                    <a href="http://finance.ifeng.com/biz/special/fhhkt/" target="_blank">【点击查看已回答问题】</a>
                </h2>
                <ul className={ `${ styles.b30 } ${ styles.q_list }` }>
                    <li className={ styles.q_list_group }>
                        <div className="clearfix">
                            <i className={ styles.icon_q } />
                            <p>李飞:OPEC及非OPEC会议本周四召开，能给原油市场带来什么信号？今年国际油价会突破60美元每桶吗？</p>
                        </div>
                        <div className={ `${ styles.t7 } clearfix` }>
                            <i className={ styles.icon_a } />
                            <p>FX168财经集团特约讲师田密:您好，本周四（11月30日）OPEC将会召开会议，进一步探讨是否要继续延长于去年生效的冻产协议。</p>
                        </div>
                    </li>
                    <li className={ styles.q_list_group }>
                        <div className="clearfix">
                            <i className={ styles.icon_q } />
                            <p>李飞:OPEC及非OPEC会议本周四召开，能给原油市场带来什么信号？今年国际油价会突破60美元每桶吗？</p>
                        </div>
                        <div className={ `${ styles.t7 } clearfix` }>
                            <i className={ styles.icon_a } />
                            <p>FX168财经集团特约讲师田密:您好，本周四（11月30日）OPEC将会召开会议，进一步探讨是否要继续延长于去年生效的冻产协议。</p>
                        </div>
                    </li>
                </ul>
                {/* 未回答问题 */}
                <h2 className={ styles.q_list_title }>
                    <a href="http://finance.ifeng.com/biz/special/fhhkt/" target="_blank">【点击查看未回答问题】</a>
                </h2>
                <ul className={ `${ styles.b37 } ${ styles.q_list }` }>
                    <li className={ styles.q_list_group }>
                        <div className="clearfix">
                            <i className={ styles.icon_q } />
                            <p className={ styles.one_line }>我在广州的一家金融公司开了个外汇黄金的户平台说ATL MT4，这个平台是对冲还说对赌？出金出的来吗？</p>
                        </div>
                    </li>
                    <li className={ styles.q_list_group }>
                        <div className="clearfix">
                            <i className={ styles.icon_q } />
                            <p className={ styles.one_line }>我在广州的一家金融公司开了个外汇黄金的户平台说ATL MT4，这个平台是对冲还说对赌？出金出的来吗？</p>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Question.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Question.defaultProps = {};

export { Question };
export default Question;