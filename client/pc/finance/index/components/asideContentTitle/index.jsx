import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class AsideContentTitle extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
    };

    /**
     * 渲染组件
     */
    render() {
        const { title } = this.props;

        return (
            <div className={styles.title01}>
                <h2>{title}</h2>
            </div>
        );
    }
}

export default AsideContentTitle;
