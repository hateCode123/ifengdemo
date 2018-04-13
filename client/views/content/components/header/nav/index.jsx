import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Nav 组件
 */
class Nav extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <ul className={styles.list_menu}>
                {content.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer">
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
Nav.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Nav.defaultProps = {};

export { Nav };
export default Nav;
