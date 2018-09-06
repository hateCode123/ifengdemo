import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './style.css';

class SubNavigation extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    render() {
        const { content } = this.props;
        const navigation = content.map((item, index) => (
            <a key={index} href={item.url} target="_blank" rel="nofollow me noopener noreferrer" title={item.title}>
                {item.title}
            </a>
        ));

        return (
            <div className="w1000">
                <div className={styles.p_banner}>{navigation}</div>
            </div>
        );
    }
}

export default errorBoundary(SubNavigation);
