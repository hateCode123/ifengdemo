import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../../components/errorBoundary';
import dataProcessing from '../../../../../components/dataProcessing';
import { rel } from '../../../../../utils/rel';

class NewsList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        limit: PropTypes.number,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, limit } = this.props;

        return (
            <div className={styles.news_list} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <div className={styles.box}>
                    <p>
                        <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                            {content[0].title}
                        </a>
                    </p>
                    <div className={styles.list}>
                        <ul>
                            {content.slice(1, limit).map((item, index) => (
                                <li key={index}>
                                    <a href={item.url} target="_blank" rel={rel} title={item.title}>
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(NewsList));
