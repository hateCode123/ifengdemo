import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../utils/rel';

/**
 * 定义 Nav 组件
 */
class Nav extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, limit } = this.props;
        const list = [];
        const navMoreData = [];
        const moreList = [];

        content.map((item, index) => {
            if (index < limit) {
                list.push(
                    <li key={Math.random()}>
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.title}
                        </a>
                    </li>,
                );
            } else {
                navMoreData.push(item);
            }

            return list;
        });

        navMoreData.map(item => {
            moreList.push(
                <li key={Math.random()}>
                    <a href={item.url} target="_blank" rel={rel}>
                        {item.title}
                    </a>
                </li>,
            );

            return moreList;
        });

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

/**
 * 定义组件属性类型
 * */
Nav.propTypes = {
    content: PropTypes.array,
    limit: PropTypes.number,
};

/**
 * 定义组件默认属性
 * */
Nav.defaultProps = {};

export { Nav };
export default Nav;
