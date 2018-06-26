import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import errorBoundary from '../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../components/dataProcessing';

class LinkList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.linkList}>
                <ul className="clearfix">
                    {content.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank" rel={rel}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(LinkList));
