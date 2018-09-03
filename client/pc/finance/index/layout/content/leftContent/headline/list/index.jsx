import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../../utils/rel';

class List extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const array = [];
        let list = [];

        content.forEach((item, index) => {
            if (index % 2 === 0) {
                list.push(
                    <h2 key={index} className={styles.title}>
                        <a href={item.url} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    </h2>,
                );
            } else {
                list.push(
                    <p key={index} className={styles.text}>
                        <a href={item.url} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    </p>,
                );
                array.push(
                    <div key={index} className={styles.hot}>
                        {list}
                    </div>,
                );
                list = [];
            }
        });

        return <div>{array}</div>;
    }
}

export default errorBoundary(List);
