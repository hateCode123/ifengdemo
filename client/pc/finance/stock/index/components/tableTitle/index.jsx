import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../utils/rel';

class TableTitle extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const {
            content: { title, url, more },
        } = this.props;

        return (
            <div className={`${styles.title_box} clearfix`}>
                <a className={styles.title} href={url} target="_blank" rel={rel}>
                    {title}
                </a>
                <div className={styles.more}>
                    <a href={more} target="_blank" rel={rel}>
                        更多
                    </a>
                </div>
            </div>
        );
    }
}

export default errorBoundary(TableTitle);
