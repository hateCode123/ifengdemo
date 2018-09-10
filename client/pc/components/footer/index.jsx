import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../utils/rel';

/**
 * 定义 Footer 组件
 */
class Footer extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const {
            content: { nav, content },
        } = this.props;

        return (
            <div className={styles.footer}>
                <div className={`${styles.foot_link} clearfix`}>
                    <div className={styles.list}>
                        {nav.map((item, index) => (
                            <a key={index} className={styles.link} href={item.url} target="_blank" rel={rel}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>{content.text0}</span>
                    <span>{content.text1}</span>
                    <span>{content.text2}</span>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Footer);
