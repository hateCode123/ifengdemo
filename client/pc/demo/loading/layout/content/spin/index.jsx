import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Spin extends React.PureComponent {
    static propTypes = {
        spinning: PropTypes.bool.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        tip: PropTypes.string,
        size: PropTypes.oneOf(['default', 'small']),
        simple: PropTypes.bool,
    };

    static defaultProps = {
        spinning: false,
    };

    state = {};

    render() {
        const { spinning, tip, children, size, simple } = this.props;

        return (
            <React.Fragment>
                {simple ? (
                    <i
                        className={styles.spinner_simple_style}
                        style={{
                            display: spinning ? 'block' : 'none',
                        }}>
                        <svg
                            viewBox="0 0 1024 1024"
                            className={styles.anticon_spin}
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true">
                            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                        </svg>
                    </i>
                ) : (
                    <div>
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
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default errorBoundary(Spin);
