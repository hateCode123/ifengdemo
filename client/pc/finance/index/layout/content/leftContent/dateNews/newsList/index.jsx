import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import { handleUrl } from '../../../../../../../utils/utils';
import dataProcessing from '../../../../../../../components/dataProcessing';

class NewsList extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { data } = this.props;

        return data.map((item, index) => (
            <li key={index} className={styles.list}>
                <a
                    className={index === 0 ? styles.bold : ''}
                    href={handleUrl(item.url)}
                    target="_blank"
                    rel={rel}
                    title={item.title}>
                    {item.title}
                </a>
            </li>
        ));
    }
}

export default dataProcessing(NewsList);
