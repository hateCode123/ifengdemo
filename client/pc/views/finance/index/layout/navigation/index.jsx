import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class Navigation extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const navigation = content.map((item, index) => (
            <li key={index} className={index === 0 ? styles.pa : ''}>
                <a target="_blank" rel={rel} title={item.title}>
                    {item.title}
                </a>
            </li>
        ));

        return (
            <div className={styles.col_box}>
                <div className={styles.col_navlist}>
                    <div className={styles.col_nav}>
                        <ul className="clearfix">{navigation}</ul>
                    </div>
                </div>
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