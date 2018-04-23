import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

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
            <div className={styles.g_col} cmpp-type="s">
                <div className={styles.w1000}>
                    <div className={styles.col_banner}>
                        <ul className={styles.clearfix}>{navigation}</ul>
                        <div className={styles.p_banner}>
                            <a href="http://jr.ifeng.com/" target="_blank">
                                凤凰金融
                            </a>
                            <a href="http://ds.ifeng.com/" target="_blank">
                                报名炒股大赛赢百万奖金
                            </a>
                            <a href="http://finance.ifeng.com/app/hq/" target="_blank">
                                基金行情
                            </a>
                        </div>
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
