import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../utils/rel';

/**
 * 定义 Nav 组件
 */
class Nav extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        limit: PropTypes.number,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, limit } = this.props;

        const list = content.slice(0, limit).map((item, index) => (
            <li key={index}>
                <a href={item.url} target="_blank" rel={rel}>
                    {item.title}
                </a>
            </li>
        ));

        const moreList = content.slice(limit).map(item => (
            <li key={Math.random()}>
                <a href={item.url} target="_blank" rel={rel}>
                    {item.title}
                </a>
            </li>
        ));

        const nav = (
            <ul key="nav" className={styles.list_menu}>
                {list}
            </ul>
        );
        const navMore = (
            <div key="navMore" className={styles.morehNew}>
                <ul>
                    <li>
                        <a href="//www.ifeng.com/daohang/" target="_blank" rel={rel}>
                            更多
                        </a>
                        <ul className={styles.more}>{moreList}</ul>
                    </li>
                </ul>
            </div>
        );

        return [nav, navMore];
    }
}

export { Nav };
export default Nav;
