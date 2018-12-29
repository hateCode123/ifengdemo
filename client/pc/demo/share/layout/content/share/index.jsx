import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import erWeima from './erwei.png';

class Table extends React.PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        config: PropTypes.object,
    };

    static defaultProps = {};

    state = {};

    render() {
        const { children, config } = this.props;

        return (
            <React.Fragment>
                <div className={`${styles.share} clearfix`}>
                    <div>{children}</div>

                    <div className={styles.shareCard} style={{ display: 'block' }}>
                        <div className={styles.wb}>新浪微博</div>
                        <div className={styles.wx}>
                            <span>微信扫一扫</span>
                            <img src={erWeima} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Table);
