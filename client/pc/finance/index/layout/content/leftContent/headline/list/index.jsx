import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class List extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, limit } = this.props;
        const array = [];
        let list = [];

        content.forEach((item, index) => {
            if (index >= limit) {
                return;
            }

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

/**
 * 定义组件属性类型
 * */
List.propTypes = {
    content: PropTypes.array,
    limit: PropTypes.number,
};

/**
 * 定义组件默认属性
 * */
List.defaultProps = {};

export { List };
export default List;
