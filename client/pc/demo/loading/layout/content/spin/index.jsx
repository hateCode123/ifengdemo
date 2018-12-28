import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Table extends React.PureComponent {
    static propTypes = {
        spinning: PropTypes.bool.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        tip: PropTypes.string,
        size: PropTypes.oneOf(['default', 'small']),
    };

    static defaultProps = {
        spinning: false,
    };

    state = {};

    render() {
        const { spinning, tip, children, size } = this.props;

        return (
            <React.Fragment>
                {children ? (
                    <div className={styles.spin_wrap}>
                        <div
                            className={styles.spin_mask}
                            style={{
                                display: spinning ? 'block' : 'none',
                            }}>
                            {size === 'small' ? (
                                <div className={styles.spinner_small}>
                                    <div className={`${styles.spinner_container} ${styles.container1_small}`}>
                                        <div className={styles.circle1} />
                                        <div className={styles.circle2} />
                                        <div className={styles.circle3} />
                                        <div className={styles.circle4} />
                                    </div>
                                    <div className={`${styles.spinner_container} ${styles.container2_small}`}>
                                        <div className={styles.circle1} />
                                        <div className={styles.circle2} />
                                        <div className={styles.circle3} />
                                        <div className={styles.circle4} />
                                    </div>
                                    <div className={`${styles.spinner_container} ${styles.container3_small}`}>
                                        <div className={styles.circle1} />
                                        <div className={styles.circle2} />
                                        <div className={styles.circle3} />
                                        <div className={styles.circle4} />
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.spinner}>
                                    <div className={`${styles.spinner_container} ${styles.container1}`}>
                                        <div className={styles.circle1} />
                                        <div className={styles.circle2} />
                                        <div className={styles.circle3} />
                                        <div className={styles.circle4} />
                                    </div>
                                    <div className={`${styles.spinner_container} ${styles.container2}`}>
                                        <div className={styles.circle1} />
                                        <div className={styles.circle2} />
                                        <div className={styles.circle3} />
                                        <div className={styles.circle4} />
                                    </div>
                                    <div className={`${styles.spinner_container} ${styles.container3}`}>
                                        <div className={styles.circle1} />
                                        <div className={styles.circle2} />
                                        <div className={styles.circle3} />
                                        <div className={styles.circle4} />
                                    </div>
                                </div>
                            )}

                            {tip ? <div className={styles.tip}>{tip}</div> : null}
                        </div>
                        <div>{this.props.children}</div>
                    </div>
                ) : (
                    <div>
                        {size === 'small' ? (
                            <div
                                className={styles.spinner_simple_small}
                                style={{
                                    display: spinning ? 'block' : 'none',
                                }}>
                                <div className={`${styles.spinner_container} ${styles.container1_small}`}>
                                    <div className={styles.circle1} />
                                    <div className={styles.circle2} />
                                    <div className={styles.circle3} />
                                    <div className={styles.circle4} />
                                </div>
                                <div className={`${styles.spinner_container} ${styles.container2_small}`}>
                                    <div className={styles.circle1} />
                                    <div className={styles.circle2} />
                                    <div className={styles.circle3} />
                                    <div className={styles.circle4} />
                                </div>
                                <div className={`${styles.spinner_container} ${styles.container3_small}`}>
                                    <div className={styles.circle1} />
                                    <div className={styles.circle2} />
                                    <div className={styles.circle3} />
                                    <div className={styles.circle4} />
                                </div>
                            </div>
                        ) : (
                            <div
                                className={styles.spinner_simple}
                                style={{
                                    display: spinning ? 'block' : 'none',
                                }}>
                                <div className={`${styles.spinner_container} ${styles.container1}`}>
                                    <div className={styles.circle1} />
                                    <div className={styles.circle2} />
                                    <div className={styles.circle3} />
                                    <div className={styles.circle4} />
                                </div>
                                <div className={`${styles.spinner_container} ${styles.container2}`}>
                                    <div className={styles.circle1} />
                                    <div className={styles.circle2} />
                                    <div className={styles.circle3} />
                                    <div className={styles.circle4} />
                                </div>
                                <div className={`${styles.spinner_container} ${styles.container3}`}>
                                    <div className={styles.circle1} />
                                    <div className={styles.circle2} />
                                    <div className={styles.circle3} />
                                    <div className={styles.circle4} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default errorBoundary(Table);
