import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class NgTabs extends React.PureComponent {
    render() {
        const { content, current, handleTabsChange } = this.props;

        return (
            <ul className={styles.stock}>
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={index === current ? styles.current : ''}
                        onMouseMoveCapture={() => handleTabsChange(index)}>
                        <a href={item.url} target="_blank" rel={rel}>
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
NgTabs.propTypes = { content: PropTypes.array, current: PropTypes.number, handleTabsChange: PropTypes.func };

/**
 * 定义组件默认属性
 * */
NgTabs.defaultProps = {};

export { NgTabs };
export default NgTabs;
