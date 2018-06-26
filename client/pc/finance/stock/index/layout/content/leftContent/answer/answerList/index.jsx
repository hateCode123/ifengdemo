import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../../components/dataProcessing';
import { rel } from '../../../../../../../../utils/rel';

class AnswerList extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array,
    };

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

export default errorBoundary(dataProcessing(AnswerList));
