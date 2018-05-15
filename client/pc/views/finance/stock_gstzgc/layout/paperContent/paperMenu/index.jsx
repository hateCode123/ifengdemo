import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class PaperMenu extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content, current, handleTabsChange } = this.props;

        const creatList = () => (
            <ul>
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={index == current ? styles.current : ''}
                        onClick={() => handleTabsChange(index)}>
                        <a href={`#t${index + 1}`}>{item.tabName}</a>
                    </li>
                ))}
            </ul>
        );

        return <div className={styles.menuMd}>{creatList()}</div>;
    }
}

/**
 * 定义组件属性类型
 * */
PaperMenu.propTypes = { content: PropTypes.array, current: PropTypes.number, handleTabsChange: PropTypes.func };

/**
 * 定义组件默认属性
 * */
PaperMenu.defaultProps = {};

export default PaperMenu;
