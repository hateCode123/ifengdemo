import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class SubNav extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.sub_nav}>
                {content.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel={rel} title={item.title}>
                        {item.title}
                    </a>
                ))}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SubNav.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
SubNav.defaultProps = {};

export { SubNav };
export default SubNav;
