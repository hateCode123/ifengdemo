import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../../utils/rel';

class AnswerList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { data } = this.props;

        return (
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
        );
    }
}

/**
 * 定义组件属性类型
 * */
AnswerList.propTypes = { data: PropTypes.array };

/**
 * 定义组件默认属性
 * */
AnswerList.defaultProps = {};

export { AnswerList };
export default AnswerList;