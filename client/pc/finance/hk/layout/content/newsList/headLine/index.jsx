import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import rel from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class HeadLine extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { title, url, withBG = false, more = true },
        } = this.props;

        return (
            <div className={withBG ? styles.tit_bg : styles.tit_big}>
                <h2>
                    <a href={url} target="_blank" rel={rel}>
                        {title}
                    </a>
                </h2>
                {more ? (
                    <span>
                        <a href={url} target="_blank" rel={rel}>
                            更多
                        </a>
                    </span>
                ) : null}
            </div>
        );
    }
}

export default errorBoundary(HeadLine);
