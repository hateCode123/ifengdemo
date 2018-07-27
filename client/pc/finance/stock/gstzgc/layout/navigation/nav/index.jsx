import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../../../utils/rel';

class Nav extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        const creatList = () => (
            <ul className={styles.nav}>
                {content.map((item, index) => (
                    <li key={index} className={styles.bg}>
                        <a href={item.url} target="_blank" rel={rel}>
                            <span>{item.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
        );

        return (
            <Chip id="10028" type="static" title="导航" groupName="文章" translate="jsonParse" content={content}>
                {creatList()}
            </Chip>
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

export default Nav;
