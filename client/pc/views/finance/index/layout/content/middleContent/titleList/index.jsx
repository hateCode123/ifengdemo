import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class TitleList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <ul className={styles.titleList}>
                {content.map(item => (
                    <li key={item.id}>
                        <a href={item.url} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
TitleList.propTypes = {
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
TitleList.defaultProps = {};

export { TitleList };
export default TitleList;
