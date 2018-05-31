import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

class SubNavigation extends React.PureComponent {
    render() {
        const { content } = this.props;
        const navigation = content.map((item, index) => (
            <a key={index} href={item.url} target="_blank" rel="nofollow me noopener noreferrer" title={item.title}>
                {item.title}
            </a>
        ));

        return (
            <div className="w1000"> 
                <div className={styles.p_banner}>{navigation}</div>
            </div>
        );
    }
}
/**
 * 定义组件属性类型
 * */
SubNavigation.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
SubNavigation.defaultProps = {};

export { SubNavigation };
export default SubNavigation;
