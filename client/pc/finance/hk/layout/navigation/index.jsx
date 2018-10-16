import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class Navigation extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const navigation = content.map((item, index) => (
            <li key={index} className={index === 0 ? styles.pa : ''}>
                <a href={item.url} target="_blank" rel={rel} title={item.title}>
                    {item.title}
                </a>
            </li>
        ));

        return (
            <div id="navigation" className={styles.col_box}>
                <div className={styles.col_navlist}>
                    <div className={styles.col_nav}>
                        <ul className="clearfix">{navigation}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Navigation);