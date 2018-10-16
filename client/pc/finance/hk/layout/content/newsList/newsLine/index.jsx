import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import rel from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';
import { formatImage, formatUrl } from '@ifeng/public_method';
import { formatTime } from '../../../../../../utils/formatTime';

class MainTop extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { thumbnail, title, newsTime, url },
        } = this.props;

        return (
            <li className={styles.newsList}>
                {thumbnail ? (
                    <span>
                        <a href={formatUrl(url)} target="_blank" rel={rel} title={title}>
                            <img src={formatImage(thumbnail, 100, 62)} />
                        </a>
                    </span>
                ) : null}
                <h4>
                    <a href={formatUrl(url)} target="_blank" rel={rel} title={title}>
                        {title}
                    </a>
                </h4>
                {newsTime ? <em>{formatTime(newsTime)}</em> : null}
            </li>
        );
    }
}

export default errorBoundary(MainTop);
