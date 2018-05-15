import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class Nav extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <ul className={`${styles.navigation} clearfix`}>
                {content.map((item, index) => (
                    <li key={index}>
                        <a target="_blank" rel={rel} title={item.title}>
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
