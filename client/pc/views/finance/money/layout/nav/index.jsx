import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';
import '../../reset.css';

class Navigation extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        // const navList = JSON.parse( content.navigation );
        const navigation = content.map((item, index) => (
            <li key={index}>
                <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer" title={item.title}>
                    {item.title}
                </a>
            </li>
        ));

        return (
            <div className={styles.col_banner}>
                <ul class="clearfix">{navigation}</ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Navigation.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Navigation.defaultProps = {};

export { Navigation };
export default Navigation;
