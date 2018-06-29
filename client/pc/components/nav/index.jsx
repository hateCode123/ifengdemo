import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../utils/rel';

/**
 * 定义 Nav 组件
 */
class Nav extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const limit = content.limit ? content.limit : 18;

        return (
            <React.Fragment>
                <ul key="nav" className={styles.list_menu}>
                    {content.nav.slice(0, limit).map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank" rel={rel}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
                {content.nav.length > limit ? (
                    <div key="navMore" className={styles.morehNew}>
                        <div>
                            <a href={content.moreLink} target="_blank" rel={rel}>
                                更多
                            </a>
                            <ul className={styles.more}>
                                {content.nav.slice(limit).map((item, index) => (
                                    <li key={index}>
                                        <a href={item.url} target="_blank" rel={rel}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </React.Fragment>
        );
    }
}

export { Nav };
export default Nav;
