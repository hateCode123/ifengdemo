import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class FormItem extends React.PureComponent {
    static propTypes = {
        isRequired: PropTypes.bool,
        label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        getFieldError: PropTypes.func,
        tip: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        style: PropTypes.object,
    };

    state = {
        label: this.props.label,
        children: this.props.children,
        isRequired: this.props.isRequired,
        getFieldError: this.props.getFieldError,
        tip: this.props.tip,
        style: this.props.style,
    };

    static getDerivedStateFromProps(nextProps, state) {
        const { label, children, isRequired, getFieldError, tip, style } = state;
        let resLabel = {};
        let resChildren = {};
        let resIsRequired = {};
        let resGetFieldError = {};
        let resTip = {};
        let resStyle = {};

        if (nextProps.label !== label) {
            resLabel = {
                label: nextProps.label,
            };
        }
        if (nextProps.children !== children) {
            resChildren = {
                children: nextProps.children,
            };
        }
        if (nextProps.isRequired !== isRequired) {
            resIsRequired = {
                isRequired: nextProps.isRequired,
            };
        }
        if (nextProps.getFieldError !== getFieldError) {
            resGetFieldError = {
                getFieldError: nextProps.getFieldError,
            };
        }
        if (nextProps.tip !== tip) {
            resTip = {
                tip: nextProps.tip,
            };
        }
        if (nextProps.style !== style) {
            resStyle = {
                style: nextProps.style,
            };
        }

        return {
            ...resLabel,
            ...resChildren,
            ...resIsRequired,
            ...resGetFieldError,
            ...resTip,
            ...resStyle,
        };
    }

    render() {
        const { label, isRequired, children, getFieldError, tip, style } = this.state;

        // console.dir(this.props);
        const name = children.ref.__reactBoundArguments[0];

        // console.log(name);
        const errors = getFieldError(name);

        // console.log(errors);

        return (
            <React.Fragment>
                <div className={styles.formItem} style={style}>
                    {label ? (
                        <div className={styles.label}>
                            <label htmlFor={name} className={`${styles.lable} ${isRequired ? styles.isRequired : ''}`}>
                                {label}
                            </label>
                        </div>
                    ) : null}
                    <div className={styles.from_control}>
                        <div className={errors ? styles.hasError : ''}>{this.props.children}</div>
                        {tip ? <div>{tip}</div> : null}
                        {errors ? <div className={styles.error}>{errors[0]}</div> : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default errorBoundary(FormItem);
