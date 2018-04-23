import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../../utils/rel';

class NewsList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { data } = this.props;

        return data.map((item, index) => (
            <li key={index} className={styles.list}>
                <a
                    className={index === 0 ? styles.bold : ''}
                    href={item.url}
                    target="_blank"
                    rel={rel}
                    title={item.title}>
                    {item.title}
                </a>
            </li>
        ));
    }
}

/**
 * 定义组件属性类型
 * */
NewsList.propTypes = { data: PropTypes.array };

/**
 * 定义组件默认属性
 * */
NewsList.defaultProps = {};

export { NewsList };
export default NewsList;
