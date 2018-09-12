import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';
import '../../reset.css';
import Chip from 'Chip';
import errorBoundary from '@ifeng/errorBoundary';

class NavigationInner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const navigation = content.map((item, index) => (
            <li key={index}>
                <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer" title={item.title}>
                    {item.title}
                </a>
            </li>
        ));

        return (
            <div className={styles.col_banner}>
                <ul className="clearfix">{navigation}</ul>
            </div>
        );
    }
}

class Navigation extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    render() {
        const { content } = this.props;

        return (
            <div className="g_col">
                <div className="w1000">
                    <Chip id="20080" type="struct" title="logo下导航" groupName="导航" content={content}>
                        <NavigationInner />
                    </Chip>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Navigation);
